export const FILTERS = {
  CATEGORY: 'categoria',
  ID: 'id',
};

export const createSearch = (filters) =>
  '?'.concat(
    ...Object.entries(filters).map(
      ([filterKey, filterValue]) => `${filterKey}=${filterValue}`,
    ),
  );

export const categories = {
  Health: {
    name: 'Salud',
    path: 'salud',
    icon: 'briefcase-medical',
  },
  Donations: {
    name: 'Donaciones',
    path: 'donaciones',
    icon: 'hand-holding-heart',
  },
  Missing: {
    name: 'Desaparecidos',
    path: 'desaparecidos',
    icon: 'question-circle',
  },
  Pets: {
    name: 'Mascotas',
    path: 'mascotas',
    icon: 'paw',
  },
};
