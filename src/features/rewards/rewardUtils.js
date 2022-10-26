export function hasStar(length, previousScore, currenScore) {
  if (currenScore - previousScore >= Math.floor(Number(length / 3))) {
    return true;
  }
  return false;
}

export function getStars(length, correctCount) {
  const questionsPerStar = Math.floor(Number(length / 3));
  return Math.floor(Number(correctCount / questionsPerStar));
}
