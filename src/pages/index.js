import HomeComponent from './Home';
import SignInComponent from './SignIn';
import ProfileComponent from './Profile';
import PostComponent from './Post';
import PostAuditListComponent from './PostAuditList';
import PostCreateComponent from './PostCreate';
import PostEditComponent from './PostEdit';
import PostListComponent from './PostList';
import TopUsersComponent from './TopUsers';

import {adminClaim} from '../constants/authorization';

const Home = {
  name: 'Inicio',
  path: '/',
  Component: HomeComponent,
  exact: true,
};
const SignIn = {
  name: 'Ingresar',
  path: '/ingresar',
  Component: SignInComponent,
};
const Profile = {
  name: 'Perfil',
  path: '/perfil',
  Component: ProfileComponent,
  redirect: SignIn.path,
};
const Post = {
  name: 'Publicacion',
  path: '/publicacion',
  Component: PostComponent,
};
const PostAuditList = {
  name: 'Auditar publicaciones',
  path: '/listado-publicaciones-auditar',
  Component: PostAuditListComponent,
  redirect: Home.path,
  requiredClaims: adminClaim,
};
const PostCreate = {
  name: 'Crear publicacion',
  path: '/crear-publicacion',
  Component: PostCreateComponent,
  redirect: SignIn.path,
};
const PostEdit = {
  name: 'Editar publicacion',
  path: '/editar-publicacion',
  Component: PostEditComponent,
  redirect: SignIn.path,
};
const PostList = {
  name: 'Listado de publicaciones',
  path: '/listado-publicaciones',
  Component: PostListComponent,
};
const TopUsers = {
  name: 'Top usuarios',
  path: '/top-usuarios',
  Component: TopUsersComponent,
};

const routes = {
  Home,
  SignIn,
  Profile,
  Post,
  PostAuditList,
  PostCreate,
  PostEdit,
  PostList,
  TopUsers,
};

export default routes;
