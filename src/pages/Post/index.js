// datos del usuario que publico
// datos de la publicacion: imagenes/texto
// personas que se "sumaron"
// posibilidad para el usuario que publica que pueda agradecer a los que elija de los que se sumaron
// reportar publicacion
// compartir en facebook?
import React from 'react';
import {useFirestore, useFirestoreDocDataOnce} from 'reactfire';

import useQuery from '../../hooks/useQuery';
import {FILTERS} from '../../utils/filters';

const Post = () => {
  const query = useQuery();
  const postRef = useFirestore().collection('posts').doc(query.get(FILTERS.ID));
  const post = useFirestoreDocDataOnce(postRef);

  return (
    <>
      {post ? (
        <h1>{post.title}</h1>
      ) : (
        <h1>Ninguna publicacion encontrada con ese id.</h1>
      )}
    </>
  );
};

export default Post;
