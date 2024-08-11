import { useEffect } from "react";
import StorySection from "../components/StorySection.jsx";
import { GO_NEXT_STORY } from "../utils/mutations.js";
import { useMutation } from "@apollo/client";

import { useState } from "react";

function Game() {
  const [storyData, setStoryData] = useState({});
  const [goNextStory, { loading, error }] = useMutation(GO_NEXT_STORY);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await goNextStory({
          variables: {
            nextStoryId: 1,
          },
        });
        setStoryData(response.data.goNextStory);
      } catch (err) {
        console.error("Error fetching story data:", err);
      }
    };

    fetchData();
  }, [goNextStory]); 

  if (loading) {
    return <h1>Please wait. Still loading...</h1>;
  }

  if (error) {
    return <h1>Error loading story data. Please try again later.</h1>;
  }

  const clickNext = async () => {
    try {
      const response = await goNextStory({
        variables: {
          nextStoryId: parseInt(storyData.story_id) + 1,
        },
      });
      setStoryData(response.data.goNextStory);
    } catch (err) {
      console.error("Error on clickNext:", err);
    }
  };

  const clickBack = async () => {
    try {
      const response = await goNextStory({
        variables: {
          nextStoryId: parseInt(storyData.story_id) - 1,
        },
      });
      setStoryData(response.data.goNextStory);
    } catch (err) {
      console.error("Error on clickBack:", err);
    }
  };

  return (
    <div className="game-page">
      <div className="story-container">
        <div className="choice-buttons-container">
          <StorySection
            initialStory={storyData?.story}
            initialIsDead={false}
            initialEscaped={false}
            choices={storyData?.choices}
            onChoiceSelect={() => {}}
          />

          <div className="button-container">
            {storyData?.choices?.length === 0 && (
              <button className="button next-button" onClick={clickNext}>
                Next
              </button>
            )}
            {storyData?.choices?.length === 0 &&
              !storyData?.disable_go_back && (
                <button className="button back-button" onClick={clickBack}>
                  Back
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
