// datos del usuario que publico
// datos de la publicacion: imagenes/texto
// personas que se "sumaron"
// posibilidad para el usuario que publica que pueda agradecer a los que elija de los que se sumaron
// reportar publicacion
// compartir en facebook?
import React from 'react';
import {useFirestore, useFirestoreDocDataOnce, StorageImage} from 'reactfire';

import useQuery from '../../hooks/useQuery';
import {FILTERS} from '../../utils/filters';

// TODO: implement
// - si es de otro: sumarse o reportar
// - si es mia: agradecer sobre lista de usuarios sumados
const Post = () => {
  const query = useQuery();
  const postRef = useFirestore().collection('posts').doc(query.get(FILTERS.ID));
  const {post, user, storageUri, timestamp} = useFirestoreDocDataOnce(postRef);

  return (
    <>
      {post ? (
        <>
          <h1>{post.title}</h1>
          {storageUri && <StorageImage storagePath={storageUri} />}
        </>
      ) : (
        <h1>Ninguna publicacion encontrada con ese id.</h1>
      )}
    </>
  );
};

export default Post;