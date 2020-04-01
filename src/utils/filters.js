export const createFilter = ({ category }) => `?categoria=${category}`;

export const categories = {
  Health: {
    name: "Salud",
    path: "salud"
  },
  Donations: {
    name: "Donaciones",
    path: "donaciones"
  },
  Missing: {
    name: "Desaparecidos",
    path: "desaparecidos"
  },
  Pets: {
    name: "Mascotas",
    path: "mascotas"
  }
};
