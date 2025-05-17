export type Task = {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  projectId: string;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  projectId: string;
};