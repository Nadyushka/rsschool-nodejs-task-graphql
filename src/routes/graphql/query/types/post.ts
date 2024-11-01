import {  GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import { Post } from '@prisma/client';
import { userType } from "./user.js";
import { Context } from "../../types/context.js";

export const postType = new GraphQLObjectType({
    name: 'Post',
    description: "This represent a Post",
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        authorId: { type: new GraphQLNonNull(UUIDType) },
        author: {
            type: userType,
            resolve: async (obj: Post, _args, context: Context) => {
                return await context.prisma.user.findUnique({ where: { id: obj.authorId } })
            }
        },
    })
});



