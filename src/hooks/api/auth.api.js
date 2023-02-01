import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthDispatch } from '../../stores/auth.store';
import axiosClient from '../../axiosClient';

const loginUser = async (values) => {
  const parsed = await axiosClient.post(`login`, values);
  return parsed.data;
};

const signUpUser = async (values) => {
  const parsed = await axiosClient.post(`sign-up`, values);
  return parsed.data;
};

const sendEmail = async (values) => {
  const parsed = await axiosClient.post(`send-email`, values);
  return parsed.data;
};

const resetPassword = async (values) => {
  const parsed = await axiosClient.post(`rest-password`, values);
  return parsed.data;
};

const useLoginUser = (values) => {
  const authDispatch = useAuthDispatch();
  return useMutation(['login-user'], (values) => loginUser(values), {
    onSuccess: (data) => {
      authDispatch({
        type: 'ADD_LOGGED_IN_USER',
        user: data.result,
      });
    },
  });
};

const useSignUp = (values) => {
  const authDispatch = useAuthDispatch();
  return useMutation(['sign-up-user'], (values) => signUpUser(values), {
    onSuccess: (data) => {
      authDispatch({
        type: 'ADD_LOGGED_IN_USER',
        user: data.result,
      });
    },
  });
};

const useSendRecoverPassword = (values) => useMutation(['recover-password'], (values) => sendEmail(values));

const useResetPassword = (values) => useMutation(['reset-password'], (values) => resetPassword(values));

const updateProfile = async (values) => {
  const parsed = await axiosClient.put(`update-profile/${values.userId}`, values);
  return parsed.data;
};

const useUpdateProfile = (values) => useMutation(['update-profile'], (values) => updateProfile(values));

export { useLoginUser, useUpdateProfile, useSignUp, useSendRecoverPassword, useResetPassword };
