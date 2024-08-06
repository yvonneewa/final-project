// const { Model, DataTypes } = require("sequelize");

const { Schema, model } = require('mongoose');
// const sequelize = require("../config/connection");

const choiceSchema = new Schema({
  text: {
    type: String,
  },
  next_story: {
      type: Schema.Types.ObjectId,
      ref: "Story" // story model name
  }
})


// class Story extends Model {}
const storySchema = new Schema({
  story: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User" // user model
  },
  has_choice: {
    type: Boolean
  },
  is_dead: {
    type: Boolean
  },
  disable_go_back: {
    type: Boolean
  },
  choices: [choiceSchema]
})

const Story = model("Story", storySchema)

module.exports = Story;
