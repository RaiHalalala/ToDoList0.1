export enum Base {
  action = 'action',
  sorting = 'sorting',
}

export type Data = {
  name: string;
  id: number;
  data: { title: string; id: number; base: Base }[];
};

export const ID_MANE_LIST = 1;

export const actions = {
  name: 'Actions width list',
  id: 1,
  data: [
    { title: 'Rename column', id: 0, base: Base.action },
    { title: 'Add new card...', id: 1, base: Base.action },
    { title: 'Sort by...', id: 2, base: Base.action },
    { title: 'Clear the column', id: 3, base: Base.action },
    { title: 'Delete column', id: 4, base: Base.action },
  ],
};

export const sorting = {
  name: 'Sort of column',
  id: 2,
  data: [
    {
      title: 'Date of create \n(firstly new tasks)',
      id: 1,
      base: Base.sorting,
    },
    { title: 'Date of create \n(olds new tasks)', id: 2, base: Base.sorting },
    { title: 'Name card \n(for vocabulary)', id: 3, base: Base.sorting },
  ],
};
