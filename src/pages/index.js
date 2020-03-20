import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Request from "./Request";
import RequestAuditList from "./RequestAuditList";
import RequestCreate from "./RequestCreate";
import RequestEdit from "./RequestEdit";
import RequestList from "./RequestList";

export default {
  Home: {
    name: "Inicio",
    url: "/",
    Component: Home,
    exact: true
  },
  Login: {
    name: "Login",
    url: "/login",
    Component: Login
  },
  Profile: {
    name: "Perfil",
    url: "/perfil",
    Component: Profile
  },
  Request: {
    name: "Pedido",
    url: "/pedido",
    Component: Request
  },
  RequestAuditList: {
    name: "Auditar pedidos",
    url: "/listado-pedidos-auditar",
    Component: RequestAuditList
  },
  RequestCreate: {
    name: "Crear pedido",
    url: "/crear-pedido",
    Component: RequestCreate
  },
  RequestEdit: {
    name: "Editar pedido",
    url: "/editar-pedido",
    Component: RequestEdit
  },
  RequestList: {
    name: "Listado de pedidos",
    url: "/listado-pedidos",
    Component: RequestList
  }
};
