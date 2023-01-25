import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
// @mui
import { Alert, Button, Container, Snackbar, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateTaskList, useTaskLists } from '../hooks/api/task.lists.api';
import FormDialog from '../components/formDialog/FormDialog';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const navigate = useNavigate();

  // Calling Data From Backend
  const taskListsQuery = useTaskLists();
  const taskListsDetails = taskListsQuery?.data?.result;

  const createTaskListQuery = useCreateTaskList();

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const tasksList = [
    {
      tasks: [
        { name: 'Ayo1', description: 'desAyo1', due_date: '01/01/2023', status: 'In Progress' },
        { name: 'Ayo2', description: 'desAyo2', due_date: '01/02/2023', status: 'Completed' },
        { name: 'Ayo3', description: 'desAyo3', due_date: '01/03/2023', status: 'Pending' },
      ],
      cover: '/assets/images/products/product_1.jpg',
      id: 'ea4801ff-d832-459e-a249-00c6e0f20fda',
      name: 'List 1',
      // due_date: 42.21,
      // priceSale: 55,
      status: 'Pending',
    },
    {
      tasks: [
        { name: 'Ayo1', description: 'desAyo1', due_date: '01/01/2023', status: 'In Progress' },
        { name: 'Ayo2', description: 'desAyo2', due_date: '01/02/2023', status: 'Completed' },
        { name: 'Ayo3', description: 'desAyo3', due_date: '01/03/2023', status: 'Pending' },
      ],
      cover: '/assets/images/products/product_11.jpg',
      id: 'ea4801ff-d832-459e-a249-00c6e0f20f55',
      name: 'List 2',
      // price: 42.21,
      // priceSale: 10,
      status: 'Complete',
    },
  ];
  const addFormInputList = [
    {
      key: 'name1',
      title: 'name',
      label: 'Name',
      type: 'text',
    },
    // {
    //   key: 'description1',
    //   title: 'description',
    //   label: 'Description',
    //   type: 'text',
    // },
    // {
    //   key: 'due_date1',
    //   title: 'due_date',
    //   label: 'Due date',
    //   type: 'datetime-local',
    // },
    {
      key: 'status1',
      title: 'status',
      label: 'Status',
      type: 'select',
      list: ['Select', 'completed', 'pending'],
    },
    // {
    //   key: 'task_list_id1',
    //   title: 'task_list_id',
    //   label: 'Task list',
    //   type: 'node',
    //   node: 'task_list',
    // },
    // { title: 'user_id', label:'user_id',type: 'select', node:'users'},
  ];

  const [form, setForm] = useState({
    name: '',
    status: 'Select',
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
      createTaskListQuery.mutateAsync(form);
      setOpenToast(true);
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const [openToast, setOpenToast] = React.useState(false);

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={openToast} autoHideDuration={6000} onClose={() => setOpenToast(false)}>
        <Alert onClose={() => setOpenToast(false)} severity="success" sx={{ width: '100%' }}>
          Success
        </Alert>
      </Snackbar>
      <Container>
        <Typography
          variant="h4"
          sx={{
            mb: 5,
          }}
        >
          Task List
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mb: 5,
          }}
        >
          <FormDialog
            action={'add'}
            title={'Add Task List'}
            formInputList={addFormInputList}
            handleChange={handleFormChange}
            handleSubmit={handleSubmit}
            form={form}
          />
          <Stack
            direction="row"
            spacing={1}
            flexShrink={0}
            sx={{
              my: 1,
            }}
          >
            {/* <ProductFilterSidebar
                    openFilter={openFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                  /> */}
            <ProductSort />
          </Stack>
        </Stack>
        {taskListsDetails && (
          <ProductList
            products={taskListsDetails}
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
        )}
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
