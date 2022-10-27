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

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { totalScoreSelector } from "./rewardSelectors";

const SCORES = {
  BRONZ: 1,
  SILVER: 10,
  GOLD: 20,
};
const theme = createTheme();

function RewardTree() {
  const totalScore = useSelector(totalScoreSelector);

  const { step, incrementStep } = useStepper(0, 3);

  useEffect(() => {
    // There is an issue with the stepper library,
    // goToStep does not work therefore incrementStep must be invoked
    // multiple times.
    if (totalScore >= SCORES.GOLD) {
      incrementStep();
      incrementStep();
      incrementStep();
    } else if (totalScore >= SCORES.SILVER) {
      incrementStep();
      incrementStep();
    } else if (totalScore >= SCORES.BRONZ) {
      incrementStep();
    }
  }, []);

  console.log(totalScore);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            height: 600,
          }}
        >
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
              {totalScore < SCORES.BRONZ ? (
                <StepDescription>
                  Need {SCORES.BRONZ - Number(totalScore || 0)} points more to unlock
                </StepDescription>
              ): <></>}
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
              {totalScore < SCORES.SILVER ? (
                <StepDescription>
                  Need {SCORES.SILVER - Number(totalScore || 0)} points more to unlock
                </StepDescription>
              ) : <></>}
            </Step>
            <Step>
              <StepTitle>
                <Typography variant="h4" component="h4">
                  Gold
                </Typography>
                <Typography variant="h1" component="h1">
                  🥇
                </Typography>
              </StepTitle>
              <StepStatus />
              {totalScore < SCORES.GOLD ?  (
                <StepDescription>
                  Need {SCORES.GOLD - Number(totalScore || 0)} points more to unlock
                </StepDescription>
              ): <></>}
            </Step>
          </Stepper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RewardTree;
