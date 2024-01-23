import { Box, styled } from "@mui/material";

export const Container = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "1rem",
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "center",
});

export const Content = styled(Box)({
  gap: "4rem",
  padding: "2rem",
  display: "flex",
  flexWrap: "wrap",
  overflow: "hidden",
  width: "fit-content",
  alignItems: "center",
  borderRadius: "0.5rem",
  margin: "0 auto 0 auto",
  justifyContent: "space-between",
});

export const Form = styled("form")({
  gap: "2rem",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

export const Image = styled("img")({});
