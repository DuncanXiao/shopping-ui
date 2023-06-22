import { FormListType } from "@/components/FormList"
import { isEmail } from '@/utils/validate'

export const getLoginFormList = (i18nObj: common.LocalType) => {
  const formList: FormListType[] = [{
    name: "email",
    label: i18nObj.loginFormList_email_label_i18n,
    type: "text",
    rules: {
      required: { value: true, message: i18nObj.loginFormList_email_error_i18n},
      validate: (value) => {
        return isEmail(value) || i18nObj.loginFormList_email_validate_error_i18n
      }
    },
    typeProps: {
      inputProps: {
        type: 'email'
      }
    }
  }, {
    name: "password",
    label: i18nObj.loginFormList_password_label_i18n,
    type: "text",
    rules: {
      required: { value: true, message: i18nObj.loginFormList_email_error_i18n}
    },
    typeProps: {
      inputProps: {
        type: 'password'
      }
    }
  }]
  return formList
}