import { Card as MuiCard, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import FormHeader from './components/FormHeader'
import FormInput from './components/FormInput'
import FormSubmitBtn from './components/FormSubmitBtn'
import FormBoxNavigating from './components/FormBoxNavigating'
import { useNavigate, useSearchParams } from 'react-router-dom'
import FormAlertVerified from './components/FormAlertVerified'
import FormAlertVerifying from './components/FormAlertVerifying'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { loginUserAPI } from '~/redux/user/userSlice'
import { useEffect } from 'react'
function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()


  let [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { verifyEmail, verifiedEmail } = Object.fromEntries([...searchParams])
  const handleSubmitLogin = data => {
    toast
      .promise(dispatch(loginUserAPI(data)), {
        pending: 'Logging in...'
      })
      .then(res => {
        if (!res.error) {
          toast.success('Login successfully')
          navigate('/')
        }
      })
  }
  return (
    <form onSubmit={handleSubmit(handleSubmitLogin)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
          <FormHeader title={'Login'} />
          {verifyEmail && <FormAlertVerifying email={verifyEmail} />}
          {verifiedEmail && <FormAlertVerified email={verifiedEmail} />}
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <FormInput
              errors={errors}
              fieldName={'email'}
              placeholder={'Enter email...'}
              autofocus
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
          </Box>
          <FormSubmitBtn title={'Login'} />
          <FormBoxNavigating title="New to Trello MERN Stack Advanced?" path="/register" directText="Create account!" />
          <Typography sx={{margin: '2em 1em' }} bgcolor={'#F5F5F5'} variant="body2" color="text.secondary">
            This is a demo account for testing purposes.
            <br />
            Email: tdmuapp2@gmail.com
            <br />
            Password: tdmuapp2@gmail.com
          </Typography>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm
