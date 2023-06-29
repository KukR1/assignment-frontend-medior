import { Fruit } from 'types/Fruit';

export const fruitExample: Fruit = {
  id: '',
  name: '',
  description: '',
  tags: [],
  isArchived: false,
};

export const headerMap: { [key: string]: string } = {
  id: 'ID',
  name: 'Name',
  description: 'Description',
  tags: 'Tags',
  isArchived: 'Archived',
};

export const headers = Object.keys(fruitExample)
  .filter((key) => key !== 'id')
  .map((key) => headerMap[key]);
