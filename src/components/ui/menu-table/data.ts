export type Row = {
  key: number;
  name: string;
};

export type Column = {
  key: string;
  label: string;
};

export const rows: Row[] = [
  { key: 1, name: 'Test Menu' },
  { key: 2, name: 'Test Menu 2' },
  { key: 3, name: 'Test Menu 3' },
];

export const columns: Column[] = [
  { key: 'name', label: 'Name' },
  { key: 'actions', label: 'Actions' },
];