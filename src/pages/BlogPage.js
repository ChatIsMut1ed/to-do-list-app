import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, Snackbar, Alert } from '@mui/material';
// components
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DialogDescription from '../components/DialogDescription/DialogDescription';
import { useCreateTask } from '../hooks/api/tasks.api';
import { useDeleteTasksList, useTasksByList } from '../hooks/api/task.lists.api';
import FormDialog from '../components/formDialog/FormDialog';
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  // { value: 'latest', label: 'Latest' },
  // { value: 'popular', label: 'Popular' },
  // { value: 'oldest', label: 'Oldest' },
  { value: 'complete', label: 'Complete' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Pending', label: 'Pending' },
];

const tasksList1 = [
  {
    id: 'qsdqd1321',
    cover: `/assets/images/covers/cover_1.jpg`,
    title: 'task1',
    createdAt: '02/02/2023',
    view: '200',
    comment: '213',
    share: '500',
    favorite: '500',
    author: {
      name: 'user1',
      avatarUrl: `/assets/images/avatars/avatar_1.jpg`,
    },
  },
  {
    id: 'qsdqd132',
    cover: `/assets/images/covers/cover_1.jpg`,
    title: 'task2',
    createdAt: '02/02/2023',
    view: '200',
    comment: '213',
    share: '500',
    favorite: '500',
    author: {
      name: 'user1',
      avatarUrl: `/assets/images/avatars/avatar_1.jpg`,
    },
  },
  {
    id: 'qsdqd1323',
    cover: `/assets/images/covers/cover_1.jpg`,
    title: 'task3',
    createdAt: '02/02/2023',
    view: '200',
    comment: '213',
    share: '500',
    favorite: '500',
    author: {
      name: 'user1',
      avatarUrl: `/assets/images/avatars/avatar_1.jpg`,
    },
  },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const [openToast, setOpenToast] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const tasksByListQuery = useTasksByList(id);
  const deleteTasksListQuery = useDeleteTasksList();
  const tasksByListDetails = tasksByListQuery?.data?.result;

  const createTask = useCreateTask();

  const addFormInputList = [
    {
      key: 'name1',
      title: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      key: 'description1',
      title: 'description',
      label: 'Description',
      type: 'text',
    },
    {
      key: 'due_date1',
      title: 'due_date',
      label: 'Due date',
      type: 'datetime-local',
    },
    {
      key: 'status1',
      title: 'status',
      label: 'Status',
      type: 'select',
      list: ['Select', 'completed', 'pending'],
    },

    // { title: 'user_id', label:'user_id',type: 'select', node:'users'},
  ];

  const [form, setForm] = useState({
    name: '',
    description: '',
    due_date: '',
    status: 'Select',
    task_list_id: id,
  });

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      createTask.mutateAsync(form);
      setOpenToast(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      deleteTasksListQuery.mutateAsync(id);
      setOpenToast(true);
      navigate('/dashboard/task-list');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Snackbar open={openToast} autoHideDuration={6000} onClose={() => setOpenToast(false)}>
        <Alert onClose={() => setOpenToast(false)} severity="success" sx={{ width: '100%' }}>
          Success
        </Alert>
      </Snackbar>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            List {id}
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button> */}
          <FormDialog
            action={'add'}
            title={'Add Task'}
            formInputList={addFormInputList}
            handleChange={handleFormChange}
            handleSubmit={handleSubmit}
            form={form}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: 'red',
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {tasksByListDetails &&
            tasksByListDetails.map((post, index) => <BlogPostCard key={post.id} post={post} index={index} />)}
        </Grid>
      </Container>
    </>
  );
}
