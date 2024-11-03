import {MemberType, MemberTypeIdEnum } from "./types/member.js";
import {GraphQLNonNull, GraphQLList } from "graphql";
import { Context } from '../types/context.js'

export const memberQueryType = {
    memberTypes: {
        type: new GraphQLList(MemberType),
        resolve: async (_parent, _args, context: Context) => {
            return await context.prisma.memberType.findMany()
        }
    },
    memberType: {
        type: MemberType,
        args: {
            id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
        },
        resolve: async (_parent, args: { id: string }, context: Context) => {
            return await context.prisma.memberType.findUnique({ where: { id: args.id } })
        }
    }
}
