import { useState } from "react";
import StorySection from "../components/StorySection.jsx";
import { GO_NEXT_STORY } from "../utils/mutations.js";
import { GET_ME } from "../utils/queries.js";
import { useMutation, useQuery } from "@apollo/client";

function Game() {
  const [storyData, setStoryData] = useState({});
 const [storyId, setStoryId] = useState(1);// Initialize storyId with a default value
  const [goNextStory, { loading: mutationLoading }] =
    useMutation(GO_NEXT_STORY, {
      refetchQueries: GET_ME
    });

  const { loading } = useQuery(GET_ME, {
    onCompleted: async (data) => {
      const response = await goNextStory({
        variables: {
          nextStoryId: data.me.current_story || 1, // Use current_story from the user data
        },
      });
      setStoryData(response.data.goNextStory);
      setStoryId(response.data.goNextStory.story_id); // Update storyId based on the new story
    },
    });

  if (loading || mutationLoading) {
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
  async function handleGoToGameOver() {
    // Call goNextStory with nextStoryId set to 1
    const response = await goNextStory({
      variables: {
        nextStoryId: 1,
      },
    });
    setStoryData(response.data.goNextStory);
    setStoryId(1); // Set storyId to 1

    // Redirect to /gameover after updating story data
    window.location.href = "/gameover";
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
              
              onChoiceSelect={async (nextStoryId) => {
                const response = await goNextStory({
                  variables: {
                    nextStoryId: nextStoryId,
                  },
                });
                setStoryData(response.data.goNextStory);
              }}
            />

            {storyData.is_dead ? (
              <>
                <button
                onClick={handleGoToGameOver}
                >
                  Next
                </button>
              </>
            ) : (
              <>
                {storyData?.choices?.length == 0 ? (
                  <button onClick={clickNext}>Next</button>
                ) : null}
                {storyData?.choices?.length == 0 &&
                !storyData?.disable_go_back ? (
                  <button onClick={clickBack}>Back</button>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
