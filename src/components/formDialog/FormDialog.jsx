import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, MenuItem, Select } from '@mui/material';
import Iconify from '../iconify';

export default function FormDialog({ small, action, title, formInputList, handleChange, handleSubmit, form }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      {small ? (
        <>
          <Iconify icon={'eva:edit-fill'} onClick={handleClickOpen} sx={{ mr: 2 }} />
          {title}
        </>
      ) : (
        <>
          <Button
            variant="contained"
            startIcon={action === 'add' ? <Iconify icon="eva:plus-fill" /> : <Iconify icon="eva:plus-fill" />}
            onClick={handleClickOpen}
          >
            {title}
          </Button>
        </>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>To add a Task, please enter your details here.</DialogContentText>
          {formInputList?.map((input) =>
            input.type === 'select' ? (
              <>
                <InputLabel id="demo-simple-select-label">{input.label}</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={form?.status}
                  label={input.label}
                  name={input?.title}
                  onChange={(e) => handleChange(e)}
                >
                  {input.list.map((list) => (
                    <MenuItem key={list} value={list}>
                      {list}
                    </MenuItem>
                  ))}
                </Select>
              </>
            ) : input.type === 'text' || input.type === 'datetime-local' ? (
              <TextField
                key={input?.key}
                autoFocus
                margin="dense"
                defaultValue={input.type === 'datetime-local' ? '2023-01-01T10:30' : ''}
                id={input?.title}
                label={input?.label}
                type={input?.type}
                name={input?.title}
                fullWidth
                onChange={(e) => handleChange(e)}
                variant="standard"
              />
            ) : (
              ''
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
