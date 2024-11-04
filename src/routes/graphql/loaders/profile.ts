import {PrismaClient} from "@prisma/client";
import DataLoader from "dataloader";

export const profileLoader = (prisma: PrismaClient, identifier: string) => {
    return new DataLoader(async (profileIds: readonly string[]) => {
        const profiles = await prisma.profile.findMany({ where: { [identifier]: { in: [...profileIds] } } });

        const profilesMap = new Map(profiles.map(profile => [profile[identifier], profile]));
        return profileIds.map(id => profilesMap.get(id));
    });
};
