import { Button, Grid, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useContent } from "../../content";
import { Form } from "./PhysicalPersonFields.style";
import { AddressFields } from "../AddressFields";
import { Add, ArrowLeftSharp } from "@mui/icons-material";

export type PhysicalPersonFieldsProps = {
  disable?: boolean;
  disablePassword?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function PhysicalPersonFields({
  disable,
  disablePassword,
  onChange,
}: PhysicalPersonFieldsProps) {
  const { t } = useContent();

  // mock used to see how multiple addresses would look like
  const [addresses, setAddress] = useState<number[]>([1]);

  return (
    <Form>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={4}>
          <TextField
            sx={{ width: "100%" }}
            onChange={onChange}
            label={t("home.name")}
            name="name"
            variant="outlined"
            disabled={disable}
            required
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            name="lastname"
            sx={{ width: "100%" }}
            onChange={onChange}
            label={t("home.lastname")}
            variant="outlined"
            disabled={disable}
            required
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            sx={{ width: "100%" }}
            onChange={onChange}
            label={t("home.birthday")}
            name="phone"
            variant="outlined"
            disabled={disable}
            required
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            name="email"
            type="email"
            sx={{ width: "100%" }}
            onChange={onChange}
            label={t("login.email")}
            variant="outlined"
            disabled={disable}
            required
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            sx={{ width: "100%" }}
            onChange={onChange}
            label={t("home.cpf")}
            name="cpf"
            variant="outlined"
            disabled={disable}
            required
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            sx={{ width: "100%" }}
            onChange={onChange}
            label={t("home.rg")}
            name="rg"
            variant="outlined"
            disabled={disable || disablePassword}
            required
          />
        </Grid>
      </Grid>

      {addresses.map(() => (
        <AddressFields />
      ))}

      <Button
        type="button"
        variant="outlined"
        sx={{ margin: "0 auto 0 5%" }}
        startIcon={<Add />}
        onClick={() => setAddress((curr) => [...curr, 1])}
      >
        {t("home.create")}
      </Button>
    </Form>
  );
}

export default PhysicalPersonFields;
