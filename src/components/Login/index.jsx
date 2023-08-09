import { useMemo, useContext, useState } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormList from '@/components/FormList';
import Button from '@mui/material/Button';
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import classnames from 'classnames';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getLoginFormList, getRegisterFormList} from './config'
import styles from './styles/index.module.scss'
export default function Login() {
  const [openRegistry, setOpenRegistry] = useState(false)
  const { handleSubmit, control } = useForm({});
  const reistryForm = useForm({});
  const { t } = useTranslation('common')

  const loginFormList = useMemo(() => {
    return getLoginFormList(t)
  }, [t])

  const registryFormList = useMemo(() => {
    return getRegisterFormList(t)
  }, [t])

  const onSubmit = () => {
  }

  const handleForgetPassword = () => {
    
  }

  const handleRegistry = () => {
    setOpenRegistry(!openRegistry);
  }

  const registrySubmit = () => {}

  return (
    openRegistry ?
    <Box>
      <ArrowBackIcon className={styles['back-btn']} onClick={handleRegistry} />
      <Stack spacing={{ xs: 1, sm: 2 }} direction="column"  flexWrap="wrap">
        <FormList formList={registryFormList} control={reistryForm.control} />
        <Button className={styles['login-btn']} variant="contained" onClick={reistryForm.handleSubmit(registrySubmit)}>Reistry</Button>
      </Stack>
    </Box>
    :
    <Box>
      <Stack spacing={{ xs: 1, sm: 2 }} direction="column"  flexWrap="wrap">
        <FormList formList={loginFormList} control={control} />
      </Stack>
      <Button onClick={handleForgetPassword} variant="text" className={styles['forget-password']}>{t('login.forgetPassword')}</Button>
      <div className={styles['btn-container']}>
        <Button className={styles['login-btn']} variant="contained" onClick={handleSubmit(onSubmit)}>Login</Button>
        <Button className={styles['create-btn']} variant="outlined" onClick={handleRegistry}>{t('login.createAccount')}</Button>
      </div>
    </Box>
  )
}