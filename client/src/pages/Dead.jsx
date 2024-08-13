import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { GO_NEXT_STORY } from "../utils/mutations";

const Dead = () => {
  const [goNextStory] = useMutation(
    GO_NEXT_STORY
  );

  useEffect(() => {
    async function restartStory () {
      await goNextStory({
        variables: {
          nextStoryId: 1,
        },
      });
    }

    restartStory();
  }, [])

  const handleStartClick = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <div className="home-page">
    <div className="row mb-4">
      <div className="col-md-10">
        <div className="title-container"></div>
        <div className="fade-in-title">
          <h1 className="creepster2">You Are Dead</h1>
        </div>
        <div align="center">
          <a
            href="/"
            id="start-link"
            className="play-button"
            onClick={handleStartClick}
          >
            Start Over?
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};


export default Dead;