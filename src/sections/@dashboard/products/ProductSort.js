import { useState } from 'react';
// @mui
import { Menu, Button, MenuItem, Typography, TextField } from '@mui/material';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  // { value: 'featured', label: 'Featured' },
  // { value: 'newest', label: 'Newest' },
  // { value: 'priceDesc', label: 'Price: High-Low' },
  // { value: 'priceAsc', label: 'Price: Low-High' },
    { value: 'complete', label: 'Complete' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Pending', label: 'Pending' }
];

export default function ShopProductSort() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      {/* <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Newest
        </Typography>
      </Button> */}
      {/* <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      > */}
    <TextField select size="small" value="complete">
        {SORT_BY_OPTIONS.map((option) => (
         <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
        ))}
            </TextField>
      {/* </Menu> */}
    </>
  );
}
