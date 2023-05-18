import { useEffect } from "react";
import FormList, { FormListType } from "@/components/FormList"
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs'

type FormList = {
  name: string,
  label?: string,
  type: "text" | "select" | "checkbox" | "radio" | "switch" | "custom",
  defaultValue?: string | number,
  component?: React.ComponentType
}
const formList: FormListType[] = [{
  name: "username",
  label: "Username",
  type: "text",
  rules: {
    required: { value: true, message: "Username must be"}
  }
}, {
  name: "sex",
  label: "性别",
  type: "checkbox",
  selectList: [{
    label: '男',
    value: 'boy'
  }, {
    label: '女',
    value: 'girl'
  }],
  rules: {
    required: { value: true, message: "sex must be"}
  }
}, {
  name: "fruits",
  label: "性别",
  type: "radio",
  selectList: [{
    label: '榴莲',
    value: 'durian'
  }, {
    label: '香蕉',
    value: 'bananer'
  }],
  rules: {
    required: { value: true, message: "sex must be"}
  }
}, {
  name: "datePick",
  label: "我的时间",
  type: "datePick",
  rules: {
    required: { value: true, message: "sex must be"}
  }
}]


export default function Login() {
  const { handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      username: 'lala',
      sex: ['girl'],
      fruits: 'durian',
      datePick: dayjs('1993-10-13')
    }
  });

  useEffect(() => {

  }, [])

  const onSubmit = (data: any) => {
    console.log('---', data, errors)
  }

  return <div>
    <FormList formList={formList} control={control as any} />
    <Button variant="contained" onClick={handleSubmit(onSubmit)}> AAA</Button>
  </div>
}