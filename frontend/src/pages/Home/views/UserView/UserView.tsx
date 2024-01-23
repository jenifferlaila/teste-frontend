import { useEffect, useMemo, useState } from "react";
import { PhysicalPerson, getPeople } from "../../../../util";
import PeopleList from "../../../../components/PeopleList";
import { Button } from "@mui/material";
import { useContent } from "../../../../content";
import { Add, ArrowLeftSharp } from "@mui/icons-material";
import { PhysicalPersonFields } from "../../../../components";

function UserView() {
  const { t } = useContent();

  const [personId, setPersonId] = useState<number>();
  const [people, setPeople] = useState<PhysicalPerson[]>([]);

  useEffect(() => {
    const action = async () => {
      getPeople((people, ok) => {
        if (!ok) return;

        setPeople([...people]);
      });
    };

    action();
  }, []);

  const content = useMemo(() => {
    if (personId == null)
      return <PeopleList people={people} onClick={(id) => setPersonId(id)} />;
    if (personId < 0) return <PhysicalPersonFields onChange={() => {}} />;

    return <>editar</>;
  }, [personId]);

  return (
    <>
      <Button
        type="button"
        variant="outlined"
        sx={{ margin: "5% auto 0 10%" }}
        startIcon={personId == null ? <Add /> : <ArrowLeftSharp />}
        onClick={() => setPersonId(personId == null ? -1 : undefined)}
      >
        {personId == null ? t("home.create") : t("home.back")}
      </Button>

      {content}
    </>
  );
}

export default UserView;
