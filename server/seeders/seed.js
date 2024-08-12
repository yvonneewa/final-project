const db = require('../config/connection');

const { User, Story } = require('../models');
const userSeeds = require('./userSeeds.json');
const storyData = require('./storyData.json');
//const cleanDB = require('./cleanDB');

const seedDatabase = async () => {
  try {
    await db;
    await User.deleteMany({});
    await Story.deleteMany({});

    const users = await User.create(userSeeds);

    for (const story of storyData) {
      const newStory = await Story.create({
        ...story,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });

      if (storyData.has_choice && storyData.choices) {
        // Link choices to stories
        story.choices = storyData.choices.map(choice => ({
          text: choice.text,
          next_story: choice.next_story_id, // Ensure these IDs are handled correctly
        }));
        await newStory.save();
      }
    }

    console.log('Stories seeded');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
};
seedDatabase();