import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import StorySection from "../components/StorySection.jsx";
import { GO_NEXT_STORY } from "../utils/mutations.js";
import {GET_CURRENT_STORY}from "../utils/queries.js";
import { useMutation, useQuery } from "@apollo/client";

function Game() {
  const navigate = useNavigate();
  const [storyData, setStoryData] = useState({});
  const { loading: storyLoading, error, data } = useQuery(GET_CURRENT_STORY, {
    variables: { storyId: storyData.story_id || 1 },
    onCompleted: (data) => {
      if (data.me.current_story.is_dead) {
        navigate('/dead');
      } else {
        setStoryData(data.me.current_story);
      }
    },
  });
  const [goNextStory, { loading: mutationLoading  }] = useMutation(GO_NEXT_STORY);
  useEffect( () => {
    async function  fetchNextStory() {
    const response = await goNextStory({
      variables: {
        nextStoryId: 1,
      },
    });
    const fetchedStory = response.data.goNextStory;
    setStoryData(fetchedStory);
}
fetchNextStory();
  }, [goNextStory, navigate]);
  if (storyLoading || mutationLoading) {
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
