import { gql } from '@apollo/client';

// Define your queries
// export const GET_USER_PROFILE = gql`
//   query GetUserProfile($id: ID!) {
//     user(id: $id) {
//       id
//       email
//       name
//       bio
//     }
//   }
// `;

// export const GET_ALL_USERS = gql`
//   query GetAllUsers {
//     users (id: $id) {
//       id
//       email
//       name
//     }
//   }
// `;

// export const GET_CURRENT_STORY = gql`
//   query GetCurrentStory($storyId: ID!) {
//     currentStory(id: $storyId) {
//       id
//       title
//       content
//     }
//   }
// `;
export const GET_ME = gql`
query me {
  me {
    username
    current_story
    email
  }
}
`


export const GET_CURRENT_STORY = gql`
query currentStory($storyId: ID!) {
  currentStory(storyId: $storyId) {
    story_id
    story
    is_dead
    has_choice
    disable_go_back
    choices {
      text
      next_story_id
    }
  }
}`;
