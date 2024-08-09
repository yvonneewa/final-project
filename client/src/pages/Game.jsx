import { useEffect } from "react";
import StorySection from "../components/StorySection.jsx";
import { GO_NEXT_STORY } from "../utils/mutations.js";
import { useMutation } from "@apollo/client";

import { useState } from "react";

function Game() {
  const [storyData, setStoryData] = useState({});
  const [goNextStory, { loading }] = useMutation(GO_NEXT_STORY);

  useEffect(async () => {
    const response = await goNextStory({
      variables: {
        nextStoryId: 1,
      },
    });

    setStoryData(response.data.goNextStory);
  }, []);

  if (loading) {
    return (
      <>
        <h1>Please wait. Still loading...</h1>
      </>
    );
  }

  async function clickNext() {
    const response = await goNextStory({
      variables: {
        nextStoryId: parseInt(storyData.story_id) + 1,
      },
    });

    setStoryData(response.data.goNextStory);
  }

  async function clickBack() {
    const response = await goNextStory({
      variables: {
        nextStoryId: parseInt(storyData.story_id) - 1,
      },
    });

    setStoryData(response.data.goNextStory);
  }
  return (
    <>
      <div className="game-page">
        <div className="story-container">
          <div className="choice-buttons-container">
            {/* <h1>This is the game page!</h1> */}
            <StorySection
              initialStory={storyData?.story}
              initialIsDead={false}
              initialEscaped={false}
              choices={storyData?.choices}
              onChoiceSelect={() => {}}
            />

            {storyData?.choices?.length == 0 ? (
              <button onClick={clickNext}>Next</button>
            ) : null}
            {storyData?.choices?.length == 0  && !storyData?.disable_go_back ?(
              <button onClick={clickBack}>Back</button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;