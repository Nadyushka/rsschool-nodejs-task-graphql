import {UserType} from "./types/user.js";
import {GraphQLNonNull, GraphQLList } from "graphql";
import {UUIDType} from "../types/uuid.js";
import { Context } from "../types/context.js"

export const userQueryType = {
    users: {
        type: new GraphQLList(UserType),
        resolve: async (_parent, _args, context: Context) => {
            return await context.prisma.user.findMany()
        }
    },
    user: {
        type: UserType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, args: { id: string }, context: Context) => {
            return await context.prisma.user.findUnique({ where: { id: args.id } })
        }
    },

}
