import {GraphQLString, GraphQLNonNull} from "graphql/index.js";
import {UUIDType} from "../types/uuid.js";
import {Context} from "../types/context.js";
import {PostType} from "../query/types/post.js";
import {ChangePostInputType, ChangePostType, CreatePostInputType, CreatePostType, DeletePostType} from "./types/post.js";

export const postMutationType = {
    createPost: {
        type: new GraphQLNonNull(PostType),
        args: {
            dto: { type: new GraphQLNonNull(CreatePostInputType) }
        },
        resolve: async (_parent: unknown, args: CreatePostType, context: Context)=> {
            console.log('createPost1')
            try {
                return  await context.prisma.post.create({ data: args.dto})
            } catch (e) {
                throw new Error('Post was not created')
            }

        }
    },
    changePost: {
        type: new GraphQLNonNull(PostType),
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
            dto: { type: new GraphQLNonNull(ChangePostInputType)}
        },
        resolve: async (_parent: unknown, args: ChangePostType, context: Context)=> {
            try {
                return await context.prisma.post.update({ where: { id: args.id }, data: args.dto });
            } catch (e) {
                throw new Error('Post was not updated')
            }

        }
    },
    deletePost: {
        type: new GraphQLNonNull(GraphQLString),
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent: unknown, args: DeletePostType, context: Context) => {
            try {
                await context.prisma.post.delete({ where: { id: args.id } })
                return "Post successfully deleted"
            } catch (e) {
                throw new Error('Post was not deleted')
            }

        }
    },
}
