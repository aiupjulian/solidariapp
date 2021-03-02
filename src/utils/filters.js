import {BloodDonation, Charity, PetHouse, Solidarity} from '../assets/icons';

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
