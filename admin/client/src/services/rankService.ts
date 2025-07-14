import { gql } from "@apollo/client";
import { client } from "./apollo-client";
import { TutorApplication } from "@/types/type"; // Make sure this type exists

const GET_ALL_RANKED_APPLICATIONS = gql`
  query {
    getAllApplicantsRanking {
      applicationID
      firstName
      lastName
      email
      courseCode
      course
    }
  }
`;

const GET_ALL__APPLICATIONS = gql`
  query {
    getAllApplicantions {
      applicationID
      firstName
      lastName
      email
      courseCode
      course
    }
  }
`;

export const applicationService = {
  getAllRankedApplications: async (): Promise<TutorApplication[]> => {
    const { data } = await client.query({
      query: GET_ALL_RANKED_APPLICATIONS,
      fetchPolicy: "no-cache",
    });
    console.log("ranked applications", data.getAllApplicantsRanking);
    return data.getAllApplicantsRanking;
  },

  getAllApplications: async (): Promise<TutorApplication[]> => {
    const { data } = await client.query({
      query: GET_ALL__APPLICATIONS,
      fetchPolicy: "no-cache",
    });
    console.log("all applications", data.getAllApplicantions);
    return data.getAllApplicantions;
  },
};
