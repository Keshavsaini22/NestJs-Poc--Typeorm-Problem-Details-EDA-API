type UserPayload = {
  name: string;
  email: string;
  address: string;
  role: string;
  password: string;
};

type UserResponseType = {
  id: number;
  name: string;
  email: string;
  address: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

type ListUserPayload = {
  limit: number;
  page: number;
};

type ListUserResponse = {
  data: UserResponseType[];
  total: number;
  current_page: number;
  per_page: number;
};
