import { gql } from "@apollo/client";

export const GO_NEXT_STORY = gql`
  mutation goNextStory($nextStoryId: ID!) {
    goNextStory(nextStoryId: $nextStoryId) {
      story
      is_dead
      has_choice
      disable_go_back
      choices {
        text
        next_story_id
      }
      story_id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

// Define your mutations
export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($id: ID!, $name: String!, $bio: String!) {
    updateUserProfile(id: $id, name: $name, bio: $bio) {
      id
      name
      bio
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      email
    }
  }
`;
