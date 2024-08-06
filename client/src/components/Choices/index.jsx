import React from 'react';


const Choices = ({ choices, onChoiceSelect }) => {
  return (
    <div className="choices-container">
      {choices.map((choice) => (
        <button
          key={choice.id}
          className="choice-button"
          onClick={() => onChoiceSelect(choice.action)}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default Choices;
