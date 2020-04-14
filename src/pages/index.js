import HomeComponent from "./Home";
import SignInComponent from "./SignIn";
import ProfileComponent from "./Profile";
import PostComponent from "./Post";
import PostAuditListComponent from "./PostAuditList";
import PostCreateComponent from "./PostCreate";
import PostEditComponent from "./PostEdit";
import PostListComponent from "./PostList";

import ROLES from "../utils/roles";

const Home = {
  name: "Inicio",
  path: "/",
  Component: HomeComponent,
  exact: true
};
const SignIn = {
  name: "Ingresar",
  path: "/ingresar",
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
const Post = {
  name: "Publicacion",
  path: "/publicacion",
  Component: PostComponent
};
const PostAuditList = {
  name: "Auditar publicaciones",
  path: "/listado-publicaciones-auditar",
  Component: PostAuditListComponent,
  protected: true,
  authorization: {
    roles: [ROLES.ADMIN],
    redirect: Home.path
  }
};
const PostCreate = {
  name: "Crear publicacion",
  path: "/crear-publicacion",
  Component: PostCreateComponent,
  protected: true,
  authorization: {
    roles: [ROLES.ADMIN, ROLES.USER],
    redirect: SignIn.path
  }
};
const PostEdit = {
  name: "Editar publicacion",
  path: "/editar-publicacion",
  Component: PostEditComponent,
  protected: true,
  authorization: {
    roles: [ROLES.ADMIN, ROLES.USER],
    redirect: SignIn.path
  }
};
const PostList = {
  name: "Listado de publicaciones",
  path: "/listado-publicaciones",
  Component: PostListComponent
};

export default {
  Home,
  SignIn,
  Profile,
  Post,
  PostAuditList,
  PostCreate,
  PostEdit,
  PostList
};
