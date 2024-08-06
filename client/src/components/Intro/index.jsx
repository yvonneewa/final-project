import React, { useState } from 'react';
import './Intro.css'; 
const Intro = ({ stories }) => {
  const [currentSection, setCurrentSection] = useState('first');
  const [userName, setUserName] = useState('');

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleNextButtonClick = () => {
    if (currentSection === 'first') {
      setCurrentSection('second');
    } else if (currentSection === 'second') {
      setCurrentSection('other');
    }
  };

  const handleBackButtonClick = () => {
    if (currentSection === 'second') {
      setCurrentSection('first');
    } else if (currentSection === 'other') {
      setCurrentSection('second');
    }
  };

  return (
    <div className="story-container">
      {/* First Section */}
      {currentSection === 'first' && (
        <div id="first-section">
          <h1>{stories[0].story}</h1>
          <input
            type="text"
            className="transparent-input"
            placeholder="Type name and press enter"
            id="user-name"
            value={userName}
            onChange={handleNameChange}
            autoComplete="off"
          />
          <button id="name-button" hidden />
          <button id="next-button" onClick={handleNextButtonClick}>Next</button>
        </div>
      )}

      {/* Second Section */}
      {currentSection === 'second' && (
        <div id="second-section">
          <h1 id="name-section">{stories[1].story}</h1>
          <div className="button-container">
            <button id="next-button1" onClick={handleNextButtonClick}>Next</button>
          </div>
        </div>
      )}

      {/* Other Section */}
      {currentSection === 'other' && (
        <div id="other-section">
          {stories.slice(2).map((story) => (
            <h1
              key={story.id}
              id={story.id}
              className="choice"
              data-choice={story.has_choice}
            >
              {story.story}
            </h1>
          ))}
          <div className="button-container">
            <button id="back-button" onClick={handleBackButtonClick}>Back</button>
            <button id="next-button">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Intro;
