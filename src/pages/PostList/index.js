// filtros: categoria, ciudad
// order by: fecha, cantidad sumados
// listado: ciudad, imagen, cantidad sumados, sumarse, creador, denunciar
import React from "react";

import { useQuery } from "../../hooks/useQuery";
import { useFirebase } from "../../hooks/useFirebase";

const PostList = () => {
  const query = useQuery();
  const posts = useFirebase("posts");
  return (
    <>
      <h1>PostList: {query.get("categoria")}</h1>
    </>
  );
};

export default PostList;
