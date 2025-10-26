import { Container, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Calc from "./Calc";

const App = () => {
  const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" component="main">
        <Typography
          variant="h1"
          sx={{
            fontSize: "2rem",
            mt: 2,
          }}
        >
          Increment/decrement floating-point number
        </Typography>
        <Calc />
      </Container>
    </ThemeProvider>
  );
};

export default App;
