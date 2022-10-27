import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authenticationStatusSelector } from "../../store/authentication/authenticationSelectors";
import { USER_AUTH_TYPE } from "../../store/authentication/authenticationSlice";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const theme = createTheme();

// Home page
function HomePage() {

  const authState = useSelector(authenticationStatusSelector);
  const navigate = useNavigate()

  function handleNavigation(destination){
    navigate(destination)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 8,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Card sx={{ maxWidth: 345, height: 300 }}>
            <CardActionArea onClick={()=>handleNavigation('/games/list')}>
              <CardMedia
                component="img"
                height="200"
                image="/logo192.png"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Games
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Play Games made available to you by your teacher
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345, height: 300 }}>
            <CardActionArea onClick={()=>handleNavigation('/rewards/tree')}>
              <CardMedia
                component="img"
                height="200"
                image="/logo192.png"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Rewards
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Check your stars and your current Reward level.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default HomePage;
