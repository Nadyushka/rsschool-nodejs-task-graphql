import {UserType} from "../query/types/user.js";
import {GraphQLString, GraphQLNonNull} from "graphql/index.js";
import {UUIDType} from "../types/uuid.js";
import {User} from "@prisma/client";
import {Context} from "../types/context.js";
import {ChangeUserInputType, ChangeUserType, CreateUserInputType, CreateUserType, DeleteUserType} from "./types/user.js";

export const userMutationType = {
    createUser: {
        type: new GraphQLNonNull(UserType),
        args: {
            dto: { type: new GraphQLNonNull(CreateUserInputType) }
        },
        resolve: async (_parent: unknown, args: CreateUserType, context: Context)=> {
            try {
                return await context.prisma.user.create({ data: args.dto})
            } catch (e) {
                throw new Error("User was nor created")
            }
        }
    },
    changeUser: {
        type: new GraphQLNonNull(UserType),
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
            dto: { type: new GraphQLNonNull(ChangeUserInputType)}
        },
        resolve: async (_parent: unknown, args: ChangeUserType, context: Context)=> {
            try {
                  return await context.prisma.user.update({
                    where: { id: args.id },
                    data: args.dto
                })
            } catch (e) {
                throw new Error( "User was not updated")
            }
        }
    },
    deleteUser: {
        type: new GraphQLNonNull(GraphQLString),
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent: unknown,  args: DeleteUserType, context: Context) => {
            try {
                await context.prisma.user.delete({ where: { id: args.id } })
                return "User successfully deleted"
            } catch (e) {
                throw new Error("User was not deleted")
            }

        }
    },
}
