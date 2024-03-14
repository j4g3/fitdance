import { Link } from "react-router-dom";
import { MainContainer } from "../../components/style";
import { PathType, pages } from "../../pages/routes";

export const Container = ({
  active,
  children,
}: {
  active?: PathType;
  children?: React.ReactNode;
}) => {
  return (
    <MainContainer>
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#CECECE",
          padding: "1%",
          marginBottom: "2%",
          width: "60%",
        }}
      >
        <span style={{ fontSize: "32px", fontWeight: "lighter" }}>
          Usuários
        </span>
      </header>
      <main
        style={{
          width: "100%",
        }}
      >
        <section
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              background: "#C3C3C3",
              paddingLeft: "3%",
              paddingTop: "2.2%",
              minWidth: "20%",
              maxWidth: "50%",
              marginLeft: "3%",
            }}
          >
            {pages.map((item) => (
              <>
                {!item.hidden && (
                  <>
                    {item.clickable ? (
                      <>
                        <Link
                          to={"/" + item.path}
                          style={{
                            fontSize: 20,
                            background:
                              item.path === active ? "#DEDEDE" : "#9F9F9F",
                            padding: "10px 10px 0px 10px",
                            textDecoration: "none",
                            color: "black",
                            userSelect: "none",
                          }}
                        >
                          {item.name}
                        </Link>
                      </>
                    ) : (
                      <>
                        <span
                          style={{
                            fontSize: 20,
                            background:
                              item.path === active ? "#DEDEDE" : "#9F9F9F",
                            padding: "10px 10px 0px 10px",
                            textDecoration: "none",
                            color: "black",
                            cursor: "pointer",
                            userSelect: "none",
                          }}
                        >
                          {item.name}
                        </span>
                      </>
                    )}
                  </>
                )}

                {item.hidden && item.path === active && (
                  <span
                    style={{
                      fontSize: 20,
                      background: "#DEDEDE",
                      padding: "10px 10px 0px 10px",
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </>
            ))}
          </div>
          <div
            style={{
              background: "#C3C3C3",
              paddingLeft: "3%",
              paddingTop: "2.2%",
              minWidth: "20%",
              maxWidth: "50%",
              marginLeft: "3%",
            }}
          >
            <Link
              to={"/new-user"}
              style={{
                fontSize: 20,
                padding: "10px 10px 0px 10px",
                textDecoration: "none",
                background: "#6D9F60",
                color: "white",
                userSelect: "none",
              }}
            >
              Novo Usuário
            </Link>
          </div>
        </section>

        <div
          style={{
            background: "#E9E9E9",
            padding: "3%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      </main>
    </MainContainer>
  );
};
