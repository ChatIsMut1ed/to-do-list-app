import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, Avatar, Chip, Box, Divider } from '@mui/material';
// components
import { useState } from 'react';
import FormDialog from '../components/formDialog/FormDialog';
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import ProfileForm from '../sections/auth/login/ProfileForm';

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

export default function Profile() {
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
      list: ['Select', 'In Progress', 'Completed', 'Pending'],
    },
    {
      key: 'task_list_id1',
      title: 'task_list_id',
      label: 'Task list',
      type: 'node',
      node: 'task_list',
    },
    // { title: 'user_id', label:'user_id',type: 'select', node:'users'},
  ];

  const [form, setForm] = useState({
    name: '',
    description: '',
    due_date: '',
    status: 'Select',
    task_list_id: '',
    user_id: 1,
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
      console.log(form);
      console.log('success');
    } catch (error) {
      console.log(error);
    }
  };

  const authStore = JSON.parse(localStorage.getItem('auth'));
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button> */}
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            {/* <Avatar alt="" src="/assets/images/avatars/avatar_default.jpg" /> */}
            <ProfileForm />
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  alt=""
                  src="/assets/images/avatars/avatar_default.jpg"
                  style={{
                    height: '150px',
                    width: '150px',
                  }}
                />
              </div>
              <Box sx={{ my: 3, mx: 2 }}>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography gutterBottom variant="h4" component="div">
                      {authStore?.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant="h6" component="div">
                      {authStore?.role}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography color="text.secondary" variant="body2">
                  {authStore?.email}
                </Typography>
              </Box>
              {/* <Divider variant="middle" /> */}
              {/* <Box sx={{ mt: 3, ml: 1, mb: 1 }}></Box> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
