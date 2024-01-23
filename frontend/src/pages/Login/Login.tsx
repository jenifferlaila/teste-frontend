import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useContent } from "../../content";
import { Container, Content, Form } from "../styles";
import useLogin from "./Login.hook";
import PageWithAuth from "../../components/PageWithAuth";

function Login() {
  const { palette } = useTheme();
  const { t } = useContent();

  const {
    disable,
    password,
    email,
    navigate,
    setPassword,
    setEmail,
    handleSubmit,
  } = useLogin();

  return (
    <PageWithAuth onSuccessfulAuth={() => navigate("/")} skipRedirect>
      <Container>
        <Content
          sx={{
            border: `1px solid ${palette.primary.main}`,
            flexDirection: "row-reverse",
          }}
        >
          <img src="/login.svg" alt="login" style={{ height: "200px" }} />

          <Form onSubmit={handleSubmit}>
            <Typography variant="h5" component="h5">
              {t("login.title")}
            </Typography>

            <TextField
              label={t("login.email")}
              name="email"
              variant="outlined"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
              disabled={disable}
              required
            />
            <TextField
              label={t("login.password")}
              name="password"
              variant="outlined"
              type="password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              disabled={disable}
              required
            />
            <Button
              variant="outlined"
              type="submit"
              disabled={disable}
              startIcon={disable && <CircularProgress color="secondary" />}
            >
              {t("login.submit")}
            </Button>
          </Form>
        </Content>
      </Container>
    </PageWithAuth>
  );
}

export default Login;
