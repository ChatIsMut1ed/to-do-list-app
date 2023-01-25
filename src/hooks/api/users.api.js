import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axiosClient from '../../axiosClient';

const fetchUsers = async () => {
  const parsed = await axiosClient.get('users');
  return parsed.data;
};

const createUser = async (values) => {
  const parsed = await axiosClient.post(`users`, values);
  return parsed.data;
};

const updateUser = async (values) => {
  const parsed = await axiosClient.put(`users/${values.user_id}`, values);
  return parsed.data;
};

const useCreateUser = () => useMutation(['create-user'], (values) => createUser(values));

const useUpdateUser = () => useMutation(['update-user'], (values) => updateUser(values));

const useUsers = () => useQuery(['users'], () => fetchUsers());

export { useCreateUser, useUsers, useUpdateUser };
