const { ProvidedRequiredArgumentsRule } = require("graphql");
const { User, Story } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, args, context) => {
      if (!context?.user) {
        throw AuthenticationError;
      } else {
        const foundUser = await User.findOne({
          _id: context.user._id,
        }).populate("current_story");
        if (!foundUser) {
          // return res.status(400).json({ message: 'Cannot find a user with this id!' });
          throw AuthenticationError;
        }

        // res.json(foundUser);
        return foundUser;
      }
    },
  },

  Mutation: {
    goNextStory: async (_, args, context) => {
      if (!context?.user) {
        throw AuthenticationError;
      } else {
        // find story based of received nextStoryId
        const foundStory = await Story.findOne({
          story_id: args.nextStoryId,
        });

        if (!foundStory) {
          throw AuthenticationError;
        }

        // update user to next story id
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { current_story: foundStory._id }
        );

        return {
          is_dead: foundStory.is_dead,
          has_choice: foundStory.has_choice,
          disable_go_back: foundStory.disable_go_back,
          choices: foundStory.choices,
          story_id: foundStory.story_id,
          story:
            args.nextStoryId == 2
              ? foundStory.story + " " + context.user.email
              : foundStory.story,
        };
      }
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    // for creating user
    signup: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
