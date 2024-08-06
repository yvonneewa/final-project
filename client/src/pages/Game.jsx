import StorySection from "../components/StorySection.jsx";

function Game() {

  // implement query for getting the current story data of the user
  
  
  return (
    <>
      <div className="game-page">                
        <div className="story-container">
        <div className="choice-buttons-container">
      {/* <h1>This is the game page!</h1> */}
      <StorySection
        initialStory={"This is a sample story"}
        initialIsDead={false}
        initialEscaped={false}
        choices={[
          {
            id: 1,
            action: () => {},
            text: "Choice 1",
          },
          {
            id: 2,
            action: () => {},
            text: "Choice 2",
          },
        ]}
        onChoiceSelect={() => {}}
      />
        </div>
        </div>
        </div>  
    </>
  );
}

export default Game;
