import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "../../components/Container";
import { Form } from "../../components/Form";
import { UserInfo, api } from "../../utils/api";

export const Details = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState<UserInfo | null>(null);

  const fetchUserById = async (id: string) => {
    const user = await api.getUserById({ id: Number(id) });
    setUser(user);
  };

  useEffect(() => {
    fetchUserById(searchParams.get("id") ?? "");
  }, []);

  return (
    <Container active="details">
      {!user && <>Loading</>}
      {!!user && <Form isNewUser={false} userData={user} />}
    </Container>
  );
};
