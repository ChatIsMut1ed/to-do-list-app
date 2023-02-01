import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox, Snackbar, Alert, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useLoginUser, useResetPassword, useSendRecoverPassword } from '../../../hooks/api/auth.api';
import Iconify from '../../../components/iconify';
import { useAuthDispatch } from '../../../stores/auth.store';

// ----------------------------------------------------------------------

export default function RecoverPasswordForm() {
  const recoverPassword = useSendRecoverPassword();
  const resetPassword = useResetPassword();
  const navigate = useNavigate();

  const [openToast, setOpenToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    email: '',
    key: '',
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
    const requestResponse = await recoverPassword.mutateAsync(form);
    if (requestResponse?.status === 'failed') {
      setErrorMessage(requestResponse?.result);
    } else {
      setSuccessMessage(requestResponse?.result);
      setStep(2);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const requestResponse = await resetPassword.mutateAsync(form);
    if (requestResponse?.status === 'failed') {
      setErrorMessage(requestResponse?.result);
    } else {
      setSuccessMessage(requestResponse?.result);
      setStep(3);
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

      {successMessage && (
        <Typography
          variant="h6"
          gutterBottom
          style={{
            color: 'green',
            textAlign: 'center',
            marginBottom: '25px',
          }}
        >
          {successMessage}
        </Typography>
      )}
      {step === 1 && (
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              required
              name="email"
              label="Email address"
              type="email"
              value={form.email}
              onChange={handleFormChange}
            />
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
              {/* <Checkbox name="remember" label="Remember me" /> */}
              {/* <Link to="/recover-password" variant="subtitle2" underline="hover">
              Forgot password?
            </Link> */}
            </Stack>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={recoverPassword?.isLoading}
            >
              Send request
            </LoadingButton>
          </Stack>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword}>
          <Stack spacing={3}>
            <TextField
              required
              name="key"
              label="Verification Code"
              type="text"
              value={form.key}
              onChange={handleFormChange}
            />
            <TextField
              required
              name="password"
              label="Password"
              type="password"
              value={form.password}
              onChange={handleFormChange}
            />
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={resetPassword?.isLoading}>
              Reset
            </LoadingButton>
          </Stack>
        </form>
      )}

      {step === 3 && (
        <LoadingButton fullWidth size="large" variant="contained" onClick={() => navigate('/login')}>
          Go Login
        </LoadingButton>
      )}
    </>
  );
}
