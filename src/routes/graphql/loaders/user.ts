import {PrismaClient} from "@prisma/client";
import DataLoader from "dataloader";

export const userLoader = (prisma: PrismaClient) => {
    return new DataLoader(async (usersIds: readonly string[]) => {
        const users = await prisma.user.findMany({
            where: { id: { in: [...usersIds] } },
            include: {
                subscribedToUser: true,
                userSubscribedTo: true,
            },
        });

        const usersMap = new Map(users.map(user => [user.id, user]));
        return usersIds.map(id => usersMap.get(id));
    });
};
