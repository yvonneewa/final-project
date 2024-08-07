import React, { useState } from "react";
import Choices from "../Choices";
// import "./StorySection.css"; 

const StorySection = ({
  initialStory,
  initialIsDead,
  initialEscaped,
  choices,
  onChoiceSelect,
}) => {
  const [story, setStory] = useState({
    story: initialStory,
    is_dead: initialIsDead,
    escaped: initialEscaped,
    disable_go_back: false,
    choices: choices || [],
  });

  const handleChoiceSelect = (choice) => {
    onChoiceSelect(choice);

  };

  
  return (
    <div className="story-container">
      <div>
        <h1>{story.story}</h1>
        {story.escaped && (
          <div className="fade-in-title">
            <h1 className="creepster">YOU HAVE ESCAPED!</h1>
          </div>
        )}
        {story.is_dead && (
          <div className="fade-in-title">
            <h1 className="creepster">YOU ARE DEAD!</h1>
          </div>
        )}
      </div>
      {!story.is_dead && !story.escaped && (
        <div>
          {/* {!story.disable_go_back && (
            <button id="back-button" onClick={() => handleChoiceSelect("back")}>
              Back
            </button>
          )} */}
          <Choices
            choices={story.choices}
            onChoiceSelect={handleChoiceSelect}
          />
        </div>
      )}
    </div>
  );
};

export default StorySection;
