const typeDefs = `
  type Choice {
    text: String
    next_story_id: ID
  }

  type Story {
    story_id: ID
    story: String
    user: User
    has_choice: Boolean
    is_dead: Boolean
    disable_go_back: Boolean
    choices: [Choice]
  }


  type User {
    username: String
    email: String
    current_story: Story
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    goNextStory(nextStoryId: ID!): Story
    signup(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
  }
`

module.exports = typeDefs;