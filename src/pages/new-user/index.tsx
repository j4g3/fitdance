import { Container } from "../../components/Container";
import { Form } from "../../components/Form";

export const NewUser = () => {
  return (
    <Container active="new-user">
      <Form isNewUser={true}/>
    </Container>
  );
};
