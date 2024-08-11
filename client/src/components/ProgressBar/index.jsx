function ProgressBar({ storyId }) {
  const progress = (parseInt(storyId) / 22) * 100 || 0;

  return (
    <>
      <progress className="progress is-medium" value={progress} max="100">
        {progress}%
      </progress>
    </>
  );
}

export default ProgressBar;
