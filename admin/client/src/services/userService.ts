import { gql } from "@apollo/client";
import { client } from "./apollo-client";
import{User} from "@/types/type"


const GET_USERS = gql`
  query {
    users {
      id
      firstName
      lastName
      email
      role
      isBlocked
    }
  }
`;



const BLOCK_USER = gql`
  mutation BlockUser($userId: Int!) {
    blockUser(userId: $userId)
  }
`;

const UNBLOCK_USER = gql`
  mutation UnblockUser($userId: Int!) {
    unblockUser(userId: $userId)
  }
`;


export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const { data } = await client.query({ query: GET_USERS, fetchPolicy: "no-cache" });
    console.log("users", data.users);
    return data.users;
  },
  blockUser: async (userId: number) => {
    await client.mutate({ mutation: BLOCK_USER, variables: { userId } });
  },
  unblockUser: async (userId: number) => {
    await client.mutate({ mutation: UNBLOCK_USER, variables: { userId } });
  },
};
