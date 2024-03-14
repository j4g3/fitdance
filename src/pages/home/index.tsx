import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CancelIconSvg } from "../../assets/CancelIconSvg";
import { CheckIcon } from "../../assets/CheckIconSvg";
import { EditIcon } from "../../assets/EditIconSvg";
import { Container } from "../../components/Container";
import { Table, TableRow } from "../../components/style";
import { UserInfo, api } from "../../utils/api";

export const Home = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);

  const loadUsers = async () => {
    const data = await api.getAllUsers();
    setUsers(data);
  };

  const activeAndDeactiveUser = async (userId: number, isActive: boolean) => {
    if (isActive) {
      const { value, isConfirmed } = await Swal.fire({
        title: "Deseja realmente inativar este usuário?",
        icon: "warning",
        confirmButtonText: "Desejo inativar",
        focusCancel: true,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        inputLabel: "Motivo",
        input: "text",
      });

      if (value || isConfirmed) {
        await api.inactivateUser({ userId, reason: value });
      }
    } else {
      await api.activateUser({ userId });
    }
    await loadUsers();
  };

  const deleteUser = async (userId: number) => {
    const { value, isConfirmed } = await Swal.fire({
      title: "Deseja realmente deletar este usuário?",
      icon: "warning",
      confirmButtonText: "Desejo deletar",
      focusCancel: true,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      await api.deleteUser({ userId });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Container active="">
      <Table>
        <TableRow>
          <td style={{ width: "4%" }}>ID</td>
          <td>Nome</td>
          <td>E-mail</td>
          <td style={{ width: "300px" }}>Ações</td>
        </TableRow>

        {users.map((item) => (
          <>
            <TableRow>
              <td style={{ width: "4%" }}>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td style={{ width: "300px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <CheckIcon
                    fill={
                      item.isActive && !item.deletedAt ? "#6D9F60" : "#727272"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (!item.deletedAt) {
                        activeAndDeactiveUser(item.id, item.isActive);
                      }
                    }}
                  />
                  <CancelIconSvg
                    fill="#F10000"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (!item.deletedAt) {
                        deleteUser(item.id);
                      }
                    }}
                  />
                  <EditIcon fill="#000" style={{ cursor: "pointer" }} />
                </div>
              </td>
            </TableRow>
          </>
        ))}
      </Table>
    </Container>
  );
};
