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
import { useLoginUser } from '../../../hooks/api/auth.api';
import Iconify from '../../../components/iconify';
import { useAuthDispatch } from '../../../stores/auth.store';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const loginUserQuery = useLoginUser();
  const navigate = useNavigate();

  const [openToast, setOpenToast] = useState(false);
  const [requestResponse, setRequestResponse] = useState({});
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
    setErrorMessage('');
    const requestResponse = await loginUserQuery.mutateAsync(form);
    console.log(requestResponse);
    if (requestResponse?.status === 'failed') {
      setErrorMessage(requestResponse?.result);
    } else {
      setOpenToast(true);
      navigate('/dashboard/app', { replace: true });
    }
  };
  const handleClick = () => {
    navigate('/dashboard', { replace: true });
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

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Login
      </LoadingButton>
    </>
  );
}
