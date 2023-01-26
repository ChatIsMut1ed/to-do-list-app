import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
  ListItemText,
  Avatar,
  ListItemAvatar,
  IconButton,
  ListItem,
  List,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// utils
import React from 'react';
import { fCurrency } from '../../../utils/formatNumber';
import Iconify from '../../../components/iconify';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product, open, handleClickOpen, handleClose }) {
  // const { name, cover, price, colors, status, priceSale } = product;
  const [dense, setDense] = React.useState(false);
  const { name, cover, tasks, status, id } = product;
  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <Link href={`/task-list/${id}/tasks`}>
          <StyledProductImg
            alt={name}
            src={cover ?? 'https://cdn-icons-png.flaticon.com/512/2387/2387679.png'}
            // onClick={handleClickOpen}
            style={{
              cursor: 'pointer',
            }}
          />
        </Link>
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          color="inherit"
          underline="hover"
          href={`/task-list/${id}/tasks`}
          // onClick={handleClickOpen}
          style={{
            cursor: 'pointer',
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={tasks} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {/* {priceSale && fCurrency(priceSale)} */}
            </Typography>
            &nbsp;
            {/* {fCurrency(price)} */}
          </Typography>
        </Stack>
      </Stack>
      .
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no
            apps are running.
          </DialogContentText>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Avatar with text and icon
            </Typography>

            <List dense={dense}>
              {generate(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <Iconify icon="delete " />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>{/* <Delete /> */}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Single-line item" />
                </ListItem>
              )}
            </List>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
