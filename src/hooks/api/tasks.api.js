import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axiosClient from '../../axiosClient';

const fetchTasks = async () => {
  const parsed = await axiosClient.get('tasks');
  return parsed.data;
};

const fetchDeleteTask = async (id) => {
  const parsed = await axiosClient.delete(`tasks/${id}`);
  return parsed.data;
};

const createTask = async (values) => {
  const parsed = await axiosClient.post(`tasks`, values);
  return parsed.data;
};

const editTask = async (values) => {
  const parsed = await axiosClient.put(`tasks/${values.task_id}`, values);
  return parsed.data;
};

const useEditTask = () => useMutation(['edit-task'], (values) => editTask(values));

const useCreateTask = () => useMutation(['create-task'], (values) => createTask(values));

const useTasks = () => useQuery(['tasks'], () => fetchTasks());

const useDeleteTask = (id) => useMutation(['tasks'], (id) => fetchDeleteTask(id));

export { useCreateTask, useTasks, useEditTask, useDeleteTask };
