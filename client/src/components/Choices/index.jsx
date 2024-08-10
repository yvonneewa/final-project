import React from 'react';


const Choices = ({ choices, onChoiceSelect }) => {
  return (
    <div className="choices-container">
      {choices.map((choice,index) => (
        <button
          key={choice.id || choice.next_story_id || index} 
          className="choice-button"
          onClick={() => onChoiceSelect(choice.next_story_id)}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default Choices;
