import {PrismaClient} from "@prisma/client";
import DataLoader from "dataloader";

export const memberTypeLoader = (prisma: PrismaClient) => {
    return new DataLoader(async (memberTypeIds: readonly string[]) => {
        const memberTypes = await prisma.memberType.findMany({ where: { id: { in: [...memberTypeIds] } } });

        const memberTypeMap = new Map(memberTypes.map(memberType => [memberType.id, memberType]));
        return memberTypeIds.map(id => memberTypeMap.get(id));
    });
};
