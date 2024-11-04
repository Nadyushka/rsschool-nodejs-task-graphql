import {PrismaClient} from "@prisma/client";
import DataLoader from "dataloader";

export const postLoader = (prisma: PrismaClient) => {
    return new DataLoader(async (postsIds: readonly string[]) => {
        const posts = await prisma.post.findMany({ where: { id: { in: [...postsIds] } } });

        const postsMap = new Map(posts.map(post => [post.id, post]));
        return postsIds.map(id => postsMap.get(id));
    });
};

export const postsByAuthorLoader = (prisma: PrismaClient) => {
    return new DataLoader(async (authorIds: readonly string[]) => {
        const posts = await prisma.post.findMany({ where: { authorId: { in: [...authorIds] } } });

        const authoredPosts = posts.reduce(
            (acc, post) => {
                const authorId = post.authorId;
                acc[authorId] = acc[authorId] ? [...acc[authorId], post] : [post];
                return acc;
            },
            {},
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return authorIds.map((id) => authoredPosts[id] || []);
    });
};
