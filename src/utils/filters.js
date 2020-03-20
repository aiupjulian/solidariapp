export const createFilter = ({ category }) => `?categoria=${category}`;

export const categories = {
  Health: {
    name: "Salud",
    url: "salud"
  },
  Donations: {
    name: "Donaciones",
    url: "donaciones"
  },
  Missing: {
    name: "Desaparecidos",
    url: "desaparecidos"
  },
  Pets: {
    name: "Mascotas",
    url: "mascotas"
  }
};
