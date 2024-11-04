import {  GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from "graphql";
import { User } from '@prisma/client';
import { Context } from "../../types/context.js";
import {PostType} from "./post.js";
import {ProfileType} from "./profile.js";
import {UUIDType} from "../../types/uuid.js";

export const UserType = new GraphQLObjectType({
    name: 'User',
    description: "This represent a User",
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
        posts: {
            type: new GraphQLList(PostType),
            resolve: async (obj: User, _args, context: Context) => {
                return context.postsByAuthorLoader.load(obj.id);
            }
        },
        profile: {
            type: ProfileType,
            resolve: async (obj: User, _args, context: Context) => {
                return context.profileByUserIdLoader.load(obj.id);
            }
        },
        subscribedToUser: {
            type: new GraphQLList(UserType),
            resolve: async (obj: any, _args, context: Context) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return obj.subscribedToUser.map((subscribtion) => context.userLoader.load(subscribtion.subscriberId));
            }
        },
        userSubscribedTo: {
            type: new GraphQLList(UserType),
            resolve: async (obj: any, _args, context: Context) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return obj.userSubscribedTo.map((subscribtion) => context.userLoader.load(subscribtion.authorId));
            }
        }

    })
});
