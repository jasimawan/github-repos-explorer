export type User = {
  id: number;
  login: string;
  avatar_url: string;
};

export type Repo = {
  id: number;
  name: string;
  description?: string;
  stargazers_count: number;
  html_url: string;
};
