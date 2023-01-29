import PropTypes from 'prop-types';
// @mui
import React, { useEffect, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Snackbar, Alert } from '@mui/material';
import DialogDescription from '../../../components/DialogDescription/DialogDescription';
import { useEditTask } from '../../../hooks/api/tasks.api';
// utils
import { fDate } from '../../../utils/formatTime';
import FormDialog from '../../../components/formDialog/FormDialog';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const Styledname = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ post, index }) {
  const [openToast, setOpenToast] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { cover, name, view, comment, share, author, createdAt, status, id } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const editTaskQuery = useEditTask();

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  const editFormInputList = [
    {
      key: 'name1',
      title: 'name',
      label: 'Name',
      type: 'text',
      value: name,
    },
    {
      key: 'description1',
      title: 'description',
      label: 'Description',
      type: 'text',
      value: post?.description,
    },
    {
      key: 'due_date1',
      title: 'due_date',
      label: 'Due date',
      type: 'datetime-local',
      value: post?.due_date,
    },
    {
      key: 'status1',
      title: 'status',
      label: 'Status',
      type: 'select',
      value: status,
      list: ['Select', 'completed', 'pending'],
    },
  ];

  const [form, setForm] = useState({
    task_id: id,
    name: '',
    description: '',
    due_date: '',
    status: 'Select',
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
      editTaskQuery.mutateAsync(form);
      setOpenToast(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setForm({
      task_id: id,
      name: post?.name,
      description: post?.description,
      due_date: post?.due_date,
      status: post?.status,
    });
  }, [post]);

  return (
    <Grid item xs={12} sm={latestPostLarge ? 3 : 3} md={latestPostLarge ? 3 : 3}>
      <Snackbar open={openToast} autoHideDuration={6000} onClose={() => setOpenToast(false)}>
        <Alert onClose={() => setOpenToast(false)} severity="success" sx={{ width: '100%' }}>
          Success
        </Alert>
      </Snackbar>
      <DialogDescription open={open} setOpen={setOpen} data={post} />

      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia
          onClick={() => setOpen(true)}
          sx={{
            cursor: 'pointer',
            // ...((latestPostLarge || latestPost) && {
            //   pt: 'calc(100% * 4 / 3)',
            //   '&:after': {
            //     top: 0,
            //     content: "''",
            //     width: '100%',
            //     height: '100%',
            //     position: 'absolute',
            //     // bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            //   },
            // }),
            // ...(latestPostLarge && {
            //   pt: {
            //     xs: 'calc(100% * 4 / 3)',
            //     sm: 'calc(100% * 3 / 4.66)',
            //   },
            // }),
          }}
        >
          <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
              // ...((latestPostLarge || latestPost) && { display: 'none' }),
            }}
          />
          {/* <StyledAvatar
            alt={author.name}
            src={author.avatarUrl}
            sx={
              {
                // ...((latestPostLarge || latestPost) && {
                //   zIndex: 9,
                //   top: 24,
                //   left: 24,
                //   width: 40,
                //   height: 40,
                // }),
              }
            }
          /> */}

          <StyledCover alt={name} src={cover ?? 'https://cdn-icons-png.flaticon.com/512/9409/9409753.png'} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            // ...((latestPostLarge || latestPost) && {
            //   bottom: 0,
            //   width: '100%',
            //   position: 'absolute',
            // }),
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(post?.due_date)}
          </Typography>

          <Styledname
            color="inherit"
            variant="subname2"
            underline="hover"
            sx={
              {
                // ...(latestPostLarge && { typography: 'h5', height: 60 }),
                // ...((latestPostLarge || latestPost) && {
                //   color: 'common.white',
                // }),
              }
            }
          >
            {name}
          </Styledname>

          <StyledInfo
            style={{
              justifyContent: 'space-between',
            }}
          >
            {/* {POST_INFO.map((info, index) => ( */}
            <FormDialog
              action={'edit'}
              title={'Edit'}
              formInputList={editFormInputList}
              handleChange={handleFormChange}
              handleSubmit={handleSubmit}
              form={form}
            />
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                // ml: index === 0 ? 0 : 1.5,
                ml: 1.5,
                // ...((latestPostLarge || latestPost) && {
                //   color: 'grey.500',
                // }),
              }}
            >
              <Iconify icon={'eva:eye-fill'} sx={{ width: 16, height: 16, mr: 0.5 }} />
              {/* <Typography variant="caption">{fShortenNumber(50000)}</Typography> */}

              <Typography variant="caption">{status}</Typography>
            </Box>
            {/* ))} */}
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}
