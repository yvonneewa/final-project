import { gql } from '@apollo/client';

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
