import { PrismaClient } from '@prisma/client';
import {postLoader, postsByAuthorLoader} from "./post.js";
import {profileLoader} from "./profile.js";
import {userLoader} from "./user.js";
import {memberTypeLoader} from "./member.js";

export const useLoaders = (prisma: PrismaClient) => {
    return {
        prisma,
        postLoader: postLoader(prisma),
        postsByAuthorLoader: postsByAuthorLoader(prisma),
        memberTypeLoader: memberTypeLoader(prisma),
        userLoader: userLoader(prisma),
        profileByIdLoader: profileLoader(prisma,"id"),
        profileByUserIdLoader: profileLoader(prisma,"userId"),
    };
};
