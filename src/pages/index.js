import Home from "./Home";
import SignIn from "./SignIn";
import Profile from "./Profile";
import Request from "./Request";
import RequestAuditList from "./RequestAuditList";
import RequestCreate from "./RequestCreate";
import RequestEdit from "./RequestEdit";
import RequestList from "./RequestList";

export default {
  Home: {
    name: "Inicio",
    path: "/",
    Component: Home,
    exact: true
  },
  SignIn: {
    name: "Sign In",
    path: "/sign-in",
    Component: SignIn
  },
  Profile: {
    name: "Perfil",
    path: "/perfil",
    Component: Profile,
    protected: true
  },
  Request: {
    name: "Pedido",
    path: "/pedido",
    Component: Request
  },
  RequestAuditList: {
    name: "Auditar pedidos",
    path: "/listado-pedidos-auditar",
    Component: RequestAuditList,
    protected: true
  },
  RequestCreate: {
    name: "Crear pedido",
    path: "/crear-pedido",
    Component: RequestCreate,
    protected: true
  },
  RequestEdit: {
    name: "Editar pedido",
    path: "/editar-pedido",
    Component: RequestEdit,
    protected: true
  },
  RequestList: {
    name: "Listado de pedidos",
    path: "/listado-pedidos",
    Component: RequestList
  }
};
