import { Card as MuiCard } from '@mui/material'
import Box from '@mui/material/Box'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import FormHeader from './components/FormHeader'
import FormInput from './components/FormInput'
import FormSubmitBtn from './components/FormSubmitBtn'
import { toast } from 'react-toastify'
import { registerAPI } from '~/api/user'
import { useNavigate } from 'react-router-dom'
import FormBoxNavigating from './components/FormBoxNavigating'
function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm()

  const navigate = useNavigate()

  const handleRegister = data => {
    const { email, password } = data
    toast
      .promise(registerAPI({ email, password }), {
        pending: 'Doing register your account!',
        success: 'Your account created successfully!',
        error: 'Create account failedly! Please do again!'
      })
      .then(data => {
        navigate(`/login?verifyEmail=${data.email}`)
      })
  }
  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
          <FormHeader title={'Register'} />
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <FormInput
              errors={errors}
              fieldName={'email'}
              autofocus
              placeholder={'Enter email...'}
              register={register}
              required={{ value: true, message: FIELD_REQUIRED_MESSAGE }}
              pattern={{ value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }}
            />
            <FormInput
              errors={errors}
              fieldName={'password'}
              placeholder={'Enter password...'}
              type="password"
              register={register}
              required={{ value: true, message: FIELD_REQUIRED_MESSAGE }}
              pattern={{ value: PASSWORD_RULE, message: PASSWORD_RULE_MESSAGE }}
            />
            <FormInput
              errors={errors}
              fieldName={'confirm_password'}
              placeholder={'Confirm password...'}
              type="password"
              register={register}
              validate={function (value) {
                if (value === watch('password')) {
                  return true
                } else {
                  return PASSWORD_CONFIRMATION_MESSAGE
                }
              }}
            />
          </Box>
          <FormSubmitBtn title={'Register'} />
          <FormBoxNavigating title="Already have an account?" path="/login" directText="Log in!" />
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm
