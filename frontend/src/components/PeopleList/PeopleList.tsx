import { Chip, Typography } from "@mui/material";
import { Container, Item } from "./PeopleList.style";
import { PhysicalPerson } from "../../util/physicalPerson";

export type PeopleListProps = {
  people: PhysicalPerson[];
  onClick: (id: number) => void;
};

function PeopleList({ people, onClick }: PeopleListProps) {
  return (
    <Container>
      {people.map(({ id, lastname, name, email }) => (
        <Item onClick={() => onClick(+id)}>
          <Chip label={id} />
          <Typography variant="h6" component={"h6"}>
            {`${name} ${lastname}`}
          </Typography>

          <Typography variant="h6" component={"h6"}>
            {email}
          </Typography>
        </Item>
      ))}
    </Container>
  );
}

export default PeopleList;
