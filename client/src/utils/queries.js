import { gql } from '@apollo/client';

// Define your queries
export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID!) {
    user(id: $id) {
      id
      email
      name
      bio
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users (id: $id) {
      id
      email
      name
    }
  }
`;

export const GET_STORY_SECTION = gql`
  query GetStorySection($sectionId: ID!) {
    storySection(id: $sectionId) {
      id
      title
      content
    }
  }
`;
