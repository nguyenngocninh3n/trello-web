import { Box, TextField } from '@mui/material'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'

const FormInput = ({ errors, register, fieldName, placeholder, type, autofocus, required, pattern, validate }) => {
  return (
    <Box>
      <Box sx={{ marginTop: '1em' }}>
        <TextField
          autoFocus={autofocus}
          fullWidth
          label={placeholder}
          type={type ?? 'text'}
          variant="outlined"
          error={!!errors[fieldName]}
          {...register(fieldName, {
            required,
            pattern,
            validate
          })}
        />
      </Box>
      <FieldErrorAlert errors={errors} fieldName={fieldName} />
    </Box>
  )
}

export default FormInput
