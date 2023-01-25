import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Snackbar } from '@mui/material';
import { useDeleteTask } from '../../hooks/api/tasks.api';

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

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
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
      >
        <DialogTitle id="alert-dialog-title">{data?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{data?.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
