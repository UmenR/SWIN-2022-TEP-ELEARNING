import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography } from "antd";
import {
  Stepper,
  Step,
  useStepper,
  StepTitle,
  StepStatus,
  StepDescription,
} from "react-progress-stepper";

import { totalScoreSelector } from "./rewardSelectors";

const SCORES = {
  BRONZ: 1,
  SILVER: 10,
  GOLD: 20,
};
function RewardTree() {
  const totalScore = useSelector(totalScoreSelector);

  const { step, goToStep } = useStepper(0, 3);

  useEffect(() => {
    if (totalScore >= SCORES.GOLD) {
      goToStep(3);
    } else if (totalScore >= SCORES.SILVER) {
      goToStep(2);
    } else if (totalScore >= SCORES.BRONZ) {
      goToStep(1);
    }
  });

  console.log(totalScore);
  return (
    <>
      <Stepper step={step}>
        <Step>
          <StepTitle>
            <Typography variant="h4" component="h4">
              Bronze
            </Typography>
            <Typography variant="h1" component="h1">
              🥉
            </Typography>
          </StepTitle>
          <StepStatus />
          {totalScore < SCORES.BRONZ && (
            <StepDescription>
              Need {SCORES.BRONZ - totalScore} points more to unlock
            </StepDescription>
          )}
        </Step>
        <Step>
          <StepTitle>
            <Typography variant="h4" component="h4">
              Silver
            </Typography>
            <Typography variant="h1" component="h1">
              🥈
            </Typography>
          </StepTitle>
          <StepStatus />
          {totalScore < SCORES.SILVER && (
            <StepDescription>
              Need {SCORES.SILVER - totalScore} points more to unlock
            </StepDescription>
          )}
        </Step>
        <Step>
          <StepTitle>
            <Typography variant="h4" component="h4">
              GOLD
            </Typography>
            <Typography variant="h1" component="h1">
              🥇
            </Typography>
          </StepTitle>
          <StepStatus />
          {totalScore < SCORES.GOLD && (
            <StepDescription>
              Need {SCORES.GOLD - totalScore} points more to unlock
            </StepDescription>
          )}
        </Step>
      </Stepper>
    </>
  );
}

export default RewardTree;
