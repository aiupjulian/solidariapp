// filtros: categoria, ciudad
// order by: fecha, cantidad sumados
// listado: ciudad, imagen, cantidad sumados, sumarse, creador, denunciar
import React from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RequestList = () => {
  let query = useQuery();
  return <h1>RequestList: {query.get("categoria")}</h1>;
};

export default RequestList;
