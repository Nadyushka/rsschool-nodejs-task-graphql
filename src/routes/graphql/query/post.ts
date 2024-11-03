import {  GraphQLNonNull, GraphQLList } from "graphql";
import {PostType} from "./types/post.js";
import {UUIDType} from "../types/uuid.js";
import { Context } from "../types/context.js";

export const postQueryType = {
    posts: {
        type: new GraphQLList(PostType),
        resolve: async (_parent: unknown, _args: unknown, context: Context) => {
            return await context.prisma.post.findMany()
        }
    },
    post: {
        type: PostType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent: unknown, args: { id: string }, context: Context) => {
            return await context.prisma.post.findUnique({ where: { id: args.id } })
        }
    }
}
