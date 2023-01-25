import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axiosClient from '../../axiosClient';

const fetchTaskLists = async () => {
  const parsed = await axiosClient.get('task-lists');
  return parsed.data;
};

const fetchTasksByList = async (id) => {
  const parsed = await axiosClient.get(`task-lists/${id}/tasks`);
  return parsed.data;
};

const fetchDeleteTasksList = async (id) => {
  const parsed = await axiosClient.delete(`task-lists/${id}`);
  return parsed.data;
};

const createTaskList = async (values) => {
  const parsed = await axiosClient.post(`task-lists`, values);
  return parsed.data;
};

const useCreateTaskList = () => useMutation(['create-task-list'], (values) => createTaskList(values));

const useTaskLists = () => useQuery(['task-lists'], () => fetchTaskLists());

const useTasksByList = (id) => useQuery(['create-task-list', id], () => fetchTasksByList(id));

const useDeleteTasksList = (id) => useMutation(['create-task-list'], (id) => fetchDeleteTasksList(id));

export { useCreateTaskList, useTaskLists, useTasksByList, useDeleteTasksList };
