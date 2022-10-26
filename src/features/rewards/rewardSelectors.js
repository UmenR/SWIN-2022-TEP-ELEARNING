export const totalScoreSelector = (state) => {
  let totalScore = 0;
  for (const [_, quizScore] of Object.entries(state.rewards.scores)) {
    totalScore = totalScore + quizScore.score;
  }
  return totalScore;
};
