// filtros: categoria, ciudad
// order by: fecha, cantidad sumados
// listado: ciudad, imagen, cantidad sumados, sumarse, creador, denunciar
import React from "react";

import { useQuery } from "../../hooks/useQuery";
import { useFirebase } from "../../hooks/useFirebase";
import { FILTERS } from "../../utils/filters";

const PostList = () => {
  const query = useQuery();
  const posts = useFirebase("posts");
  return (
    <>
      <h1>PostList: {query.get(FILTERS.CATEGORY)}</h1>
    </>
  );
};

export default PostList;
