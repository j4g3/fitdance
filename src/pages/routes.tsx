import { createBrowserRouter } from "react-router-dom";
import { Details } from "./details";
import { Home } from "./home";
import { NewUser } from "./new-user";

export const pages = [
  {
    path: "",
    name: "Lista",
    hidden: false,
    clickable: true,
    element: <Home />,
  },
  {
    path: "details",
    name: 'Informações',
    hidden: false,
    clickable: false,
    element: <Details/>,
  },
  {
    path: "new-user",
    name: 'Novo usuário',
    hidden: true,
    clickable: false,
    element: <NewUser/>,
  },
] as const

export type PathType = ((typeof pages)[number]["path"] | (string&{})) 


export const routes = createBrowserRouter([...pages]);


