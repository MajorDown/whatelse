export type Project = {
    id: string;
    title: string;
    description?: string;
    status: 'pending' | 'completed';
    creatorId: string;
    statusList: string[]; // liste des statuts autorisés
}

export type CreateProjectInput = {
  title: string;
  description?: string;
  creatorId: string;
  statusList?: string[]; // facultatif, liste des statuts autorisés
};
