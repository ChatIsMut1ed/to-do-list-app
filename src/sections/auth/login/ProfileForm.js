import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useLoginUser, useUpdateProfile } from '../../../hooks/api/auth.api';
import Iconify from '../../../components/iconify';
import { useAuthDispatch } from '../../../stores/auth.store';

// ----------------------------------------------------------------------

export default function ProfileForm() {
  const authStore = JSON.parse(localStorage.getItem('auth'));
  const updateProfileQuery = useUpdateProfile();
  const authDispatch = useAuthDispatch();

  const [openToast, setOpenToast] = useState(false);
  const [requestResponse, setRequestResponse] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [form, setForm] = useState({
    userId: authStore?.id,
    email: authStore?.email ?? null,
    name: authStore?.name ?? null,
    confirm_password: null,
  });

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const requestResponse = await updateProfileQuery
      .mutateAsync(form)
      .catch((data) => setErrorMessage(data.response.data.message));
    if (requestResponse?.status === 'failed') {
      setErrorMessage(requestResponse?.message);
    } else {
      authDispatch({
        type: 'ADD_LOGGED_IN_USER',
        user: requestResponse.result,
      });
      setOpenToast(true);
      window.location.reload();
      // navigate('/dashboard', { replace: true });
    }
  };

  return (
    <>
      <Snackbar open={openToast} autoHideDuration={6000} onClose={() => setOpenToast(false)}>
        <Alert onClose={() => setOpenToast(false)} severity="success" sx={{ width: '100%' }}>
          Success
        </Alert>
      </Snackbar>
      {errorMessage && (
        <Typography
          variant="h6"
          gutterBottom
          style={{
            color: 'red',
            textAlign: 'center',
            marginBottom: '25px',
          }}
        >
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            name="name"
            required
            label="Full name"
            value={form.name ?? authStore?.name}
            onChange={handleFormChange}
          />
          <TextField
            name="email"
            label="Email address"
            value={form.email ?? authStore?.email}
            onChange={handleFormChange}
            required
          />
          <TextField
            onChange={handleFormChange}
            name="confirm_password"
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            value={form.confirm_password}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}
        <br />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={updateProfileQuery?.isLoading}>
          Update Profile
        </LoadingButton>
      </form>
    </>
  );
}
