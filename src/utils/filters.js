import {BloodDonation, Charity, PetHouse, Solidarity} from '../assets/icons';

export const FILTERS = {
  CATEGORY: 'categoria',
  ID: 'id',
  ORDER_BY: 'ordenar_por',
  CITY: 'ciudad',
  KEYWORDS: 'palabras',
};

export const createSearch = (filters) =>
  '?'.concat(
    ...Object.entries(filters).map(
      ([filterKey, filterValue]) => `${filterKey}=${filterValue}`,
    ),
  );

export const orderBy = [
  {by: 'timestamp', order: 'desc', label: 'Mas nuevos'},
  {by: 'timestamp', order: 'asc', label: 'Mas viejos'},
  {by: 'likes.count', order: 'desc', label: 'Mas sumados'},
  {by: 'likes.count', order: 'asc', label: 'Menos sumados'},
];

export const categories = {
  Health: {
    name: 'Salud',
    path: 'salud',
    Icon: BloodDonation,
  },
  Donations: {
    name: 'Donaciones',
    path: 'donaciones',
    Icon: Charity,
  },
  Missing: {
    name: 'Desaparecidos',
    path: 'desaparecidos',
    Icon: Solidarity,
  },
  Pets: {
    name: 'Mascotas',
    path: 'mascotas',
    Icon: PetHouse,
  },
};

export const getCategoryByPath = (categoryPath) =>
  Object.values(categories).find(
    (filterValue) => categoryPath === filterValue.path,
  );
