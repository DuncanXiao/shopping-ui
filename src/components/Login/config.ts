import { FormListType } from "@/components/FormList"
import { isEmail } from '@/utils/validate'
import { useTranslation } from 'next-i18next'
import { type } from "os"

export const getLoginFormList = (t: any) => {
  const formList: FormListType[] = [{
    name: "email",
    label: t('login.formList_emailLabel'),
    type: "text",
    rules: {
      required: { value: true, message: t('login.formList_emailError')},
      validate: (value) => {
        return isEmail(value) || t('login.formList_emailValidateError')
      }
    },
    typeProps: {
      inputProps: {
        type: 'email'
      }
    }
  }, {
    name: "password",
    label: t('login.formList_passwordLabel'),
    type: "text",
    rules: {
      required: { value: true, message: t('login.formList_passwordError')}
    },
    typeProps: {
      inputProps: {
        type: 'password'
      }
    }
  }]
  return formList
}

export const getRegisterFormList = (t: any) => {
  const formList: FormListType[] = [{
    name: "userName",
    label: t('login.registry_formList_usernameLabel'),
    type: "text",
    rules: {
      required: { value: true, message: t('login.registry_formList_usernameError')}
    }
  }, {
    name: "email",
    label: t('login.formList_emailLabel'),
    type: "text",
    rules: {
      required: { value: true, message: t('login.formList_emailError')},
      validate: (value) => {
        return isEmail(value) || t('login.formList_emailValidateError')
      }
    },
    typeProps: {
      inputProps: {
        type: 'email'
      }
    }
  }, {
    name: "password",
    label: t('login.formList_passwordLabel'),
    type: "text",
    rules: {
      validate: (value) => {
        return value && value.length >= 6 || t('login.registry_formList_PasswordError')
      }
    },
    typeProps: {
      inputProps: {
        type: 'password'
      }
    }
  }, {
    name: "prePassword",
    label: t('login.registry_formList_prePasswordLabel'),
    type: "text",
    rules: {
      validate: (value, formValues) => {
        return value === formValues.password || t('login.registry_formList_prePasswordError')
      }
    },
    typeProps: {
      inputProps: {
        type: 'password'
      }
    }
  }]
  return formList
}
