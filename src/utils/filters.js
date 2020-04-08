export const createFilter = ({ category }) => `?categoria=${category}`;

export const categories = {
  Health: {
    name: "Salud",
    path: "salud",
    icon: "briefcase-medical",
  },
  Donations: {
    name: "Donaciones",
    path: "donaciones",
    icon: "hand-holding-heart",
  },
  Missing: {
    name: "Desaparecidos",
    path: "desaparecidos",
    icon: "question-circle",
  },
  Pets: {
    name: "Mascotas",
    path: "mascotas",
    icon: "paw",
  },
};
