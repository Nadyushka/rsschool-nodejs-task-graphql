import DataLoader from "dataloader";
import { PrismaClient, MemberType, Post, Profile, User } from '@prisma/client';

export type Context = {
    prisma: PrismaClient;
    memberTypeLoader: MemberTypeLoader;
    postsByAuthorLoader: PostsByAuthorLoader;
    postLoader: PostLoader;
    profileByIdLoader: ProfileLoader;
    profileByUserIdLoader: ProfileLoader;
    userLoader: UserLoader;
}

type MemberTypeLoader = DataLoader<string, MemberType | null>;
type PostLoader = DataLoader<string, Post | null>;
type PostsByAuthorLoader = DataLoader<string, Post[]>;
type ProfileLoader = DataLoader<string, Profile | null>;
type UserLoader = DataLoader<string, User | null>;
