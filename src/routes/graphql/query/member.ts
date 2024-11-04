import {MemberType, MemberTypeIdEnum } from "./types/member.js";
import {GraphQLNonNull, GraphQLList } from "graphql";
import {Context} from "../types/context.js";

export const memberQueryType = {
    memberTypes: {
        type: new GraphQLList(MemberType),
        resolve: async (_parent, _args, context: Context) => {
            const memberTypes = await context.prisma.memberType.findMany();
            memberTypes.forEach((memberType) =>
                context.memberTypeLoader.prime(memberType.id, memberType),
            );

            return memberTypes;
        }
    },
    memberType: {
        type: MemberType,
        args: {
            id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
        },
        resolve: async (_parent, args: { id: string }, context: Context) => {
            return context.memberTypeLoader.load(args.id);
        }
    }
}
