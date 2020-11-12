// filtros: categoria, ciudad
// order by: fecha, cantidad sumados
// listado: ciudad, imagen, cantidad sumados, sumarse, creador, denunciar
import React from 'react';

import {FILTERS} from '../../utils/filters';
import useQuery from '../../hooks/useQuery';

const PostList = () => {
  const query = useQuery();
  // const posts = useFirebase("posts");

  return (
    <>
      <h1>Postlist</h1>
      <p>Category: {query.get(FILTERS.CATEGORY)}</p>
    </>
  );
};

export default PostList;
