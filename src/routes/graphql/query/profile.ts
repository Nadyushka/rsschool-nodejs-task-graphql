import {  GraphQLNonNull, GraphQLList } from "graphql";
import {UUIDType} from "../types/uuid.js";
import { Context } from "../types/context.js";
import { ProfileType } from "./types/profile.js";

export const profileQueryType = {
    profiles: {
        type: new GraphQLList(ProfileType),
        resolve: async (_parent, _args, context: Context) => {
            const profiles = await context.prisma.profile.findMany();
            profiles.forEach((profile) => {
                context.profileByIdLoader.prime(profile.id, profile);
            });

            return profiles;
        }
    },
    profile: {
        type: ProfileType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, args: { id: string }, context: Context) => {
            return context.profileByIdLoader.load(args.id);
        }
    }
}
