import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useAuthDispatch } from '../../../stores/auth.store';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const authDispatch = useAuthDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
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
      // createTaskListQuery.mutateAsync(form);
      // setOpenToast(true);
      console.log('success');
      authDispatch({
        type: 'ADD_LOGGED_IN_USER',
        loggedInUser: {
          isLoggedIn: true,
          // user: requestResponse.response,
        },
      });
      localStorage.setItem(
        'auth_details',
        JSON.stringify({
          isLoggedIn: true,
          // user: requestResponse.response,
        })
      );
      navigate('/dashboard/app', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={form.email} onChange={handleFormChange} />

        <TextField
          onChange={handleFormChange}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={form.password}
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
