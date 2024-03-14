import { useState } from "react";
import Swal from "sweetalert2";
import { UserInfo, api } from "../../utils/api";

export const Form = ({
  userData,
  isNewUser,
}: {
  userData?: UserInfo;
  isNewUser?: boolean;
}) => {
  const [isActive, setIsActive] = useState(userData?.isActive ?? false)
  const [data, setData] = useState<{
    name: string;
    cpf: string;
    email: string;
    birthDay: string;
    password: string;
  }>(
    userData
      ? {
          cpf: userData.cpf,
          email: userData.email,
          name: userData.name,
          birthDay: userData.birthDate.toISOString().split("T")[0],
          password: userData.password,
        }
      : {
          cpf: "",
          email: "",
          name: "",
          birthDay: "",
          password: "",
        }
  );

  const updateField = (field: keyof typeof data, value: any) => {
    const newData = { ...data };
    newData[field] = value;
    setData(newData);
  };

  const handleSubmit = async () => {
    if(!data.cpf||!data.birthDay||!data.email||!data.name||!data.password){
      Swal.fire({
        title: "Preencha todos os campos!",
        icon: "warning"
      })
      return;
    }


    if (isNewUser && !!userData) {
      await api.updateUser({
        id: userData.id,
        user: { ...data, birthDate: data.birthDay as unknown as Date },
      });
    } else {
      await api.createUser({
        user: { ...data, birthDate: data.birthDay as unknown as Date },
      });
    }

    await Swal.fire({
      title: "Usuário criado com sucesso",
      icon: "success",
    });

    window.location.href = ("/")
  };

  const activeAndDeactiveUser = async (userId: number) => {
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
        if(!!userData){
          setIsActive(false)
        }
      }
    } else {
      await api.activateUser({ userId });
      if(!!userData){
        setIsActive(true)
      }
    }
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
      await Swal.fire({
        title: "Usuário deletado com sucesso",
        icon: "success",
      });
  
      window.location.href = ("/")
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div style={{ width: "100%", flexDirection: "column" }}>
          <label htmlFor="">Nome</label>
          <br />
          <input
            style={{ width: "70%" }}
            value={data.name}
            onChange={(e) => {
              updateField("name", e.target.value);
            }}
          />
        </div>
        {!isNewUser && !!userData && (
          <div style={{ width: "100%", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 20,
                background: isActive ?"#6D9F60":"#A63838",
                padding: "10px 20px 10px 20px",
                textDecoration: "none",
                color: "white",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={()=>{
                activeAndDeactiveUser(userData.id)
              }}
            >
              {isActive?"Ativo":"Inativo"}
            </span>
          </div>
        )}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div style={{ width: "100%", flexDirection: "column" }}>
          <label htmlFor="">E-mail</label>
          <br />
          <input
            style={{ width: "70%" }}
            value={data.email}
            onChange={(e) => {
              updateField("email", e.target.value);
            }}
          />
        </div>
        <div style={{ width: "100%", flexDirection: "column" }}></div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div style={{ width: "100%", flexDirection: "column" }}>
          <label htmlFor="">CPF</label>
          <br />
          <input
            style={{ width: "70%" }}
            value={data.cpf}
            onChange={(e) => {
              updateField("cpf", e.target.value);
            }}
          />
        </div>
        <div style={{ width: "100%", flexDirection: "column" }}>
          <label htmlFor="">Data de Nascimento</label>
          <br />
          
          <input
            type="date"
            style={{ width: "30%" }}
            value={data.birthDay}
            onChange={(e) => {
              updateField("birthDay", e.target.value);
            }}
          />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div style={{ width: "100%", flexDirection: "column" }}>
          <label htmlFor="">Nova Senha</label>
          <br />
          <input
            style={{ width: "70%" }}
            value={data.password}
            type="password"
            onChange={(e) => {
              updateField("password", e.target.value);
            }}
          />
        </div>
        <div style={{ width: "100%", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 20,
              background: "#6D9F60",
              padding: "10px 20px 10px 20px",
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
              userSelect: "none",
              marginRight: "20px",
            }}
            onClick={(e)=>{
              handleSubmit()
            }}
          >
            Salvar
          </span>
          {!isNewUser && !!userData && (
            <span
              style={{
                fontSize: 20,
                background: "#A63838",
                padding: "10px 20px 10px 20px",
                textDecoration: "none",
                color: "white",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={()=>{
                deleteUser(userData.id)
              }}
            >
              Excluir
            </span>
          )}
        </div>
      </div>
    </>
  );
};
