import {UserType} from "./types/user.js";
import {GraphQLNonNull, GraphQLList } from "graphql";
import {UUIDType} from "../types/uuid.js";
import { parse, ResolveTree, simplify } from 'graphql-parse-resolve-info';
import {Context} from "../types/context.js";

export const userQueryType = {
    users: {
        type: new GraphQLList(UserType),
        resolve: async (_parent, _args, context: Context, resolveInfo) => {
            const parsedInfo = parse(resolveInfo);
            const { fields } = simplify(parsedInfo as ResolveTree, new GraphQLList(UserType));

            const users = await context.prisma.user.findMany({
                include: {
                    subscribedToUser: 'subscribedToUser' in fields,
                    userSubscribedTo: 'userSubscribedTo' in fields,
                },
            });

            users.forEach((user) => {
                context.userLoader.prime(user.id, user);
            });

            return users;
        }
    },
    user: {
        type: UserType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, args: { id: string }, context: Context) => {
            return context.userLoader.load(args.id);
        }
    },

}
