import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Snackbar, styled } from '@mui/material';
import { useDeleteTask } from '../../hooks/api/tasks.api';
import SvgColor from '../svg-color';

export default function DialogDescription({ open, setOpen, data }) {
  const [openToast, setOpenToast] = React.useState(false);
  const deleteTaskQuery = useDeleteTask();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      deleteTaskQuery.mutateAsync(data?.id);
      setOpenToast(true);
    } catch (error) {
      console.log(error);
    }
  };

  const StyledCardMedia = styled('div')({
    position: 'relative',
    paddingTop: 'calc(100% * 3 / 4)',
  });

  const StyledCover = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
  });

  return (
    <div>
      <Snackbar open={openToast} autoHideDuration={6000} onClose={() => setOpenToast(false)}>
        <Alert onClose={() => setOpenToast(false)} severity="success" sx={{ width: '100%' }}>
          Success
        </Alert>
      </Snackbar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <StyledCardMedia
          onClick={() => setOpen(true)}
          sx={{
            cursor: 'pointer',
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
            }}
          />

          <StyledCover alt={'pic'} src={'https://cdn-icons-png.flaticon.com/512/9409/9409753.png'} />
        </StyledCardMedia>

        <DialogTitle id="alert-dialog-title">{data?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{data?.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDelete}>
            Delete Task
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
