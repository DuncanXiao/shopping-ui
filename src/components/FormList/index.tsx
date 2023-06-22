import React, { useState, useEffect, FC, memo } from 'react'
import FormControlLabel, {FormControlLabelProps} from '@mui/material/FormControlLabel';
import FormControl, {FormControlProps} from '@mui/material/FormControl';
import FormGroup, { FormGroupProps } from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import cloneDeep from 'lodash/cloneDeep';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export type FormListType = {
  name: string,
  label?: string,
  type: "text" | "select" | "checkbox" | "radio" | "custom" | "datePick",
  component?: FC,
  formControlLabelProps?: Omit<FormControlLabelProps, 'label' | 'control'>
  typeProps?: TextFieldProps | DatePickerProps<any>,
  formControlProps?: FormControlProps,
  selectList?: {
    label: any,
    value: any
  }[],
  rules?: RegisterOptions;
  radioGroupProps?: Omit<RadioGroupProps, 'value' | 'onChange'>;
  formGroupProps?: FormGroupProps
}

interface FormListProps {
  formList: FormListType[];
  control: Control
}

const FormList: FC<FormListProps> = (prop) => {
  const [list, setList] = useState(prop.formList)

  useEffect(() => {
    if (prop.formList.length > 0) {
      setList(prop.formList)
    }
  }, [prop.formList])

  return <>
    {
      list.map((item) => {
        if (item.type === "checkbox" && !!item.selectList && item.selectList.length > 0) {
          return (
            <Controller
              key={item.name}
              control={prop.control}
              name={item.name}
              rules={item.rules}
              render={({
                field: { onChange, value},
                fieldState: { error, invalid }
              }) => (
                <FormControl component="fieldset" error={invalid}>
                  <FormLabel component="legend" >{item.label}</FormLabel>
                  <FormGroup aria-label="position" row {...item.formGroupProps}>
                    {
                      item.selectList && item.selectList.map((c) => {
                        let isChecked = false
                        if (Array.isArray(value)) {
                          isChecked = value.includes(c.value)
                        }
                        return (
                          <FormControlLabel
                            key={c.value + item.name}
                            onChange={(_e, checked) => {
                              let tempFieldValue = cloneDeep(value)
                              if (Array.isArray(tempFieldValue)) {
                                if (checked) {
                                  tempFieldValue.push(c.value)
                                } else {
                                  tempFieldValue = tempFieldValue.filter((i) => i !== c.value)
                                }
                              } else {
                                tempFieldValue = [c.value]
                              }
                              onChange(tempFieldValue)
                            }}
                            control={<Checkbox checked={isChecked} />}
                            label={c.label}
                            {...item.formControlLabelProps}
                          />
                        )
                      })
                    }
                  </FormGroup>
                  { invalid && <FormHelperText error={invalid}>{error?.message}</FormHelperText> }
                </FormControl>
              )}
            />
          )
        } else if (item.type === "radio" && !!item.selectList && item.selectList.length > 0) {
          return (
            <Controller
              key={item.name}
              control={prop.control}
              name={item.name}
              rules={item.rules}
              render={({
                field: { onChange, value},
                fieldState: { error, invalid }
              }) => (
                <FormControl component="fieldset" error={invalid}>
                  <FormLabel component="legend" >{item.label}</FormLabel>
                  <RadioGroup onChange={onChange} value={value} row {...item.radioGroupProps}>
                    {
                      item.selectList && item.selectList.map((c) => (
                        <FormControlLabel
                          key={c.value + item.name}
                          value={c.value}
                          name={item.name}
                          control={<Radio />}
                          label={c.label}
                          {...item.formControlLabelProps}
                        />
                      ))
                    }
                  </RadioGroup>
                  { invalid && <FormHelperText error={invalid}>{error?.message}</FormHelperText> }
                </FormControl>
              )}
            />
          )
        } else if (item.type === "text") {
          return (
            <Controller
              key={item.name}
              control={prop.control}
              name={item.name}
              rules={item.rules}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error, invalid }
              }) => (
                <FormControl component="fieldset">
                  <FormLabel component="legend" >{item.label}</FormLabel>
                  <TextField
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value || ''}
                    ref={ref}
                    size="small"
                    error={invalid}
                    helperText={error?.message}
                    {...item.typeProps as TextFieldProps} />
                </FormControl>
              )}
            />
          )
        } else if (item.type === 'datePick') {
          return(
            <Controller
              key={item.name}
              control={prop.control}
              name={item.name}
              rules={item.rules}
              render={({
                field: { onChange, value },
                fieldState: { error, invalid }
              }) => (
                <FormControl component="fieldset" error={invalid}>
                  <FormLabel component="legend" >{item.label}</FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(dateValue) => {
                        onChange(dateValue)
                      }}
                      defaultValue={value}
                      {...item.typeProps as DatePickerProps<any>}
                    />
                  </LocalizationProvider>
                  { invalid && <FormHelperText error={invalid}>{error?.message}</FormHelperText> }
                </FormControl>
              )}
            />
          )
        } else if (item.type === "custom" && !!item.component) {
          return <item.component />
        }
      })
    }
  </>
}

export default memo(FormList)

// type FormList = {
//   name: string,
//   label?: string,
//   type: "text" | "select" | "checkbox" | "radio" | "switch" | "custom",
//   component?: React.ComponentType
// }
// const formList: FormListType[] = [{
//   name: "username",
//   label: "Username",
//   type: "text",
//   rules: {
//     required: { value: true, message: "Username must be"}
//   },
//   typeProps: {
//     InputLabelProps: {
//       shrink: true
//     }
//   } as TextFieldProps
// }, {
//   name: "sex",
//   label: "性别",
//   type: "checkbox",
//   selectList: [{
//     label: '男',
//     value: 'boy'
//   }, {
//     label: '女',
//     value: 'girl'
//   }],
//   rules: {
//     required: { value: true, message: "sex must be"}
//   }
// }, {
//   name: "fruits",
//   label: "性别",
//   type: "radio",
//   selectList: [{
//     label: '榴莲',
//     value: 'durian'
//   }, {
//     label: '香蕉',
//     value: 'bananer'
//   }],
//   rules: {
//     required: { value: true, message: "sex must be"}
//   }
// }, {
//   name: "datePick",
//   label: "我的时间",
//   type: "datePick",
//   rules: {
//     required: { value: true, message: "sex must be"}
//   }
// }]