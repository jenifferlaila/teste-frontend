import { Grid, TextField } from "@mui/material";
import { useContent } from "../../content";

function AddressFields() {
  const { t } = useContent();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={4}>
        <TextField
          sx={{ width: "100%" }}
          label={t("home.street")}
          name="street"
          variant="outlined"
          required
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          name="number"
          sx={{ width: "100%" }}
          label={t("home.number")}
          variant="outlined"
          required
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          sx={{ width: "100%" }}
          label={t("home.zipcode")}
          name="zipcode"
          variant="outlined"
          required
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          name="complement"
          sx={{ width: "100%" }}
          label={t("home.complement")}
          variant="outlined"
          required
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          sx={{ width: "100%" }}
          label={t("home.city")}
          name="city"
          variant="outlined"
          required
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          sx={{ width: "100%" }}
          label={t("home.state")}
          name="state"
          variant="outlined"
          required
        />
      </Grid>
    </Grid>
  );
}

export default AddressFields;
