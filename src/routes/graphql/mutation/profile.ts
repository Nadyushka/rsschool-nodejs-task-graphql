import {GraphQLString, GraphQLNonNull} from "graphql/index.js";
import {UUIDType} from "../types/uuid.js";
import { Profile} from "@prisma/client";
import {Context} from "../types/context.js";
import {ProfileType} from "../query/types/profile.js";
import {
    ChangeProfileInputType,
    ChangeProfileType,
    CreateProfileInputType,
    CreateProfileType,
    DeleteProfileType
} from "./types/profile.js";

export const profileMutationType = {
    createProfile: {
        type: new GraphQLNonNull(ProfileType),
        args: {
            dto: { type: new GraphQLNonNull(CreateProfileInputType) }
        },
        resolve: async (_parent: unknown, args: CreateProfileType, context: Context )=> {
            try {
                return await context.prisma.profile.create({ data: args.dto})
            } catch (error) {
                console.error('Profile was not created')
            }

        }
    },
    changeProfile: {
        type:  new GraphQLNonNull(ProfileType),
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
            dto: { type: new GraphQLNonNull(ChangeProfileInputType)}
        },
        resolve: async (_parent: unknown, args: ChangeProfileType, context: Context,)=> {
             try {
                return await context.prisma.profile.update({
                    where: { id: args.id },
                    data: args.dto
                })
            } catch (error) {
                console.error('Profile was not updated')
            }
        }
    },
    deleteProfile: {
        type:  new GraphQLNonNull(GraphQLString),
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent: unknown, args: DeleteProfileType, context: Context) => {
            try {
                await context.prisma.profile.delete({ where: { id: args.id } })
                return "Profile successfully deleted"
            }catch (error) {
                console.error('Profile was not deleted')
            }
        }
    },
}
