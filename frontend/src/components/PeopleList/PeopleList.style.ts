import { Box, styled } from "@mui/material";

export const Container = styled(Box)({
  gap: "1rem",
  width: "90%",
  display: "flex",
  padding: "4rem",
  alignItems: "center",
  flexDirection: "column",
});

export const Item = styled("button")({
  gap: "2rem",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
});
