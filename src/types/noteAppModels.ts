export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};


export type Note = {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};
