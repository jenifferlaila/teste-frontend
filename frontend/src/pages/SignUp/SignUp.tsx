import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Container, Content, Form, Image } from "../styles";
import { useContent } from "../../content";
import useSignUp from "./SignUp.hook";

function SignUp() {
  const { t } = useContent();
  const { breakpoints, palette } = useTheme();
  const isLarge = useMediaQuery(breakpoints.up("lg"));

  const { disable, handleChanges, handleSubmit } = useSignUp();

  return (
    <Container>
      <Content
        sx={{
          gap: "1rem",
          justifyContent: "center",
          border: `1px solid ${palette.primary.main}`,
        }}
      >
        <Form
          onSubmit={handleSubmit}
          sx={{ width: isLarge ? "40%" : undefined }}
        >
          <Typography variant="h5" component="h5">
            {t("signup.title")}
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={12} lg={6}>
              <TextField
                sx={{ width: "100%" }}
                onChange={handleChanges}
                label={t("signup.username")}
                name="username"
                variant="outlined"
                disabled={disable}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="email"
                type="email"
                sx={{ width: "100%" }}
                onChange={handleChanges}
                label={t("login.email")}
                variant="outlined"
                disabled={disable}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                sx={{ width: "100%" }}
                onChange={handleChanges}
                label={t("signup.phone")}
                name="phone"
                variant="outlined"
                disabled={disable}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                sx={{ width: "100%" }}
                onChange={handleChanges}
                label={t("login.password")}
                name="password"
                type="password"
                variant="outlined"
                disabled={disable}
                required
              />
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            type="submit"
            disabled={disable}
            startIcon={disable && <CircularProgress color="secondary" />}
          >
            {t("signup.submit")}
          </Button>
        </Form>

        <Image src="/login.svg" alt="login" style={{ height: "200px" }} />
      </Content>
    </Container>
  );
}

export default SignUp;
