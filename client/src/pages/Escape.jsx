import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { GO_NEXT_STORY } from "../utils/mutations";
const Escape = () => {
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

  return (
    <div className="escape-page">
      <div className="credits-container">
        <div className="credits">
          <div className="fade-in-title">
            <h1 className="creepster3">You&apos;ve Escaped!</h1>
            <p>Game Design: Yvonne, Shelly</p>
            <p>Story: TJ (we miss you!)   </p>
            <p>Development: Yvonne, Shelly</p>
            <p>Special Thanks: Joem Casusi</p>
            </div>
        </div>
        <div className="thank-you creepster">
              <h1>Thank you for playing DEAD END!</h1>
            </div>
      </div>
    </div>
  );
};

export default Escape;