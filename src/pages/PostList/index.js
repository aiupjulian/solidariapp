// filtros: categoria, ciudad
// order by: fecha, cantidad sumados
// listado: ciudad, imagen, cantidad sumados, sumarse, creador, denunciar
import React from "react";

import { useQuery } from "../../hooks/useQuery";

const PostList = () => {
  const query = useQuery();
  return (
    <>
      <h1>PostList: {query.get("categoria")}</h1>
    </>
  );
};

export default PostList;
