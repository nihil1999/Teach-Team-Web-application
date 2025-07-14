// services/userService.ts

// Define the shape of a User object as returned by the GraphQL API
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// GraphQL query to fetch all users with their basic fields
import { gql } from "@apollo/client";
import { client } from "./apollo-client";

const USERS_QUERY = gql`
  query {
    users {
      id
      email
      password
      firstName
      lastName
    }
  }
`;

// Service object encapsulating user-related API calls
export const userService = {
  // Fetch all users from the GraphQL endpoint
  getAllUsers: async (): Promise<User[]> => {
    // Execute the USERS_QUERY against the Apollo client
    const { data } = await client.query({ query: USERS_QUERY });
    // Log fetched data for debugging purposes
    console.log("Fetched Users:", data);
    // Return the array of users from the response payload
    return data.users;
  },
};
