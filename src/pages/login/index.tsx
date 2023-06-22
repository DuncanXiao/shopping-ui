import { useMemo, useContext } from "react";
import FormList from "@/components/FormList"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import useLocale from '@/utils/hooks/useLocale';
import CommonContext from '@/contexts/common';
import styles from './styles.module.css';
import { getLoginFormList } from './config'
import localContext from './i18n'

export default function Login() {
  const { handleSubmit, control } = useForm({});
  const { loginPage_i18n } = useLocale(localContext)
  const common = useContext(CommonContext)

  const formList = useMemo(() => {
    return getLoginFormList(loginPage_i18n)
  }, [loginPage_i18n])

  const onSubmit = (data: any) => {
  }

  return <div>
    <Paper elevation={4} className={styles['login-card']}>
      <Grid container spacing={2} columns={12} direction={'row'}>
        <Grid item xs={12} sm={5}>
          <Stack spacing={{ xs: 1, sm: 2 }} direction="column"  flexWrap="wrap">
            <FormList formList={formList} control={control} />
          </Stack>
          <p className={styles['forget-password']}>{loginPage_i18n.forgetPassword_i18n}</p>
          <div className={styles['btn-container']}>
            <Button className={styles['login-btn']} variant="contained" onClick={handleSubmit(onSubmit)}>Login</Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Image
            src="/profile.png"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </Grid>
      </Grid>
    </Paper>
      {common && common.isMobile ? 'true' : 'false'}
  </div>
}