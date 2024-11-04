import {   GraphQLObjectType, GraphQLBoolean, GraphQLInt } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import {MemberType} from "./member.js";
import { Profile } from '@prisma/client';
import { Context } from "../../types/context.js";

export const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    description: "This represent a Profile",
    fields: () => ({
        id: { type: UUIDType },
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        memberType: {
            type: MemberType,
            resolve: async (obj: Profile, _args, context: Context) => {
                return context.memberTypeLoader.load(obj.memberTypeId);
            }
        }
    })
});
