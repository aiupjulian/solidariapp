// datos del usuario que publico
// datos de la publicacion: imagenes/texto
// personas que se "sumaron"
// posibilidad para el usuario que publica que pueda agradecer a los que elija de los que se sumaron
// reportar publicacion
// compartir en facebook?
import React from "react";

import { useQuery } from "../../hooks/useQuery";
import { useFirebase } from "../../hooks/useFirebase";
import { useLoadingState } from "../../contexts/LoadingContext";

const Post = () => {
  const query = useQuery();
  const post = useFirebase("posts", query.get("id"));
  const isLoading = useLoadingState();
  if (isLoading) return null;
  return (
    <>{post ? <h1>{post.title}</h1> : <h1>No post encontrado con ese id</h1>}</>
  );
};

export default Post;
