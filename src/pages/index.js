import HomeComponent from "./Home";
import SignInComponent from "./SignIn";
import ProfileComponent from "./Profile";
import RequestComponent from "./Request";
import RequestAuditListComponent from "./RequestAuditList";
import RequestCreateComponent from "./RequestCreate";
import RequestEditComponent from "./RequestEdit";
import RequestListComponent from "./RequestList";

import ROLES from "../utils/roles";

const Home = {
  name: "Inicio",
  path: "/",
  Component: HomeComponent,
  exact: true
};
const SignIn = {
  name: "Sign In",
  path: "/sign-in",
  Component: SignInComponent,
  authorization: {
    roles: [ROLES.GUEST],
    redirect: Home.path
  }
};
const Profile = {
  name: "Perfil",
  path: "/perfil",
  Component: ProfileComponent,
  authorization: {
    roles: [ROLES.ADMIN, ROLES.USER],
    redirect: SignIn.path
  }
};
const Request = {
  name: "Pedido",
  path: "/pedido",
  Component: RequestComponent
};
const RequestAuditList = {
  name: "Auditar pedidos",
  path: "/listado-pedidos-auditar",
  Component: RequestAuditListComponent,
  protected: true,
  authorization: {
    roles: [ROLES.ADMIN],
    redirect: Home.path
  }
};
const RequestCreate = {
  name: "Crear pedido",
  path: "/crear-pedido",
  Component: RequestCreateComponent,
  protected: true,
  authorization: {
    roles: [ROLES.ADMIN, ROLES.USER],
    redirect: SignIn.path
  }
};
const RequestEdit = {
  name: "Editar pedido",
  path: "/editar-pedido",
  Component: RequestEditComponent,
  protected: true,
  authorization: {
    roles: [ROLES.ADMIN, ROLES.USER],
    redirect: SignIn.path
  }
};
const RequestList = {
  name: "Listado de pedidos",
  path: "/listado-pedidos",
  Component: RequestListComponent
};

export default {
  Home,
  SignIn,
  Profile,
  Request,
  RequestAuditList,
  RequestCreate,
  RequestEdit,
  RequestList
};
