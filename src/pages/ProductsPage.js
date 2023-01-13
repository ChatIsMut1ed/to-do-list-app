import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
import FormDialog from '../components/formDialog/FormDialog';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

export default function ProductsPage() {
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
      name: 'Nike Air Force 1 NDESTRUKT',
      // due_date: 42.21,
      // priceSale: 55,
      status: 'new',
    },
    {
      tasks: [
        { name: 'Ayo1', description: 'desAyo1', due_date: '01/01/2023', status: 'In Progress' },
        { name: 'Ayo2', description: 'desAyo2', due_date: '01/02/2023', status: 'Completed' },
        { name: 'Ayo3', description: 'desAyo3', due_date: '01/03/2023', status: 'Pending' },
      ],
      cover: '/assets/images/products/product_11.jpg',
      id: 'ea4801ff-d832-459e-a249-00c6e0f20f55',
      name: 'Nike Air Force 1 NDESTRUKT',
      // price: 42.21,
      // priceSale: 10,
      status: 'sale',
    },
  ];
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container>
        <Typography
          variant="h4"
          sx={{
            mb: 5,
          }}
        >
          Tasks
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
            title={'Add Task'}
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
        <ProductList products={tasksList} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />{' '}
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
