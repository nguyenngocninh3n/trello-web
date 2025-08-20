import { Grid, Typography } from '@mui/material'

const ValueSection = () => {
  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Organize Your Tasks
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Create boards, lists, and cards to organize your tasks and projects. Easily move tasks between lists to reflect their
          current status.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Collaborate with Teams
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Invite team members to collaborate on boards, assign tasks, and share updates in real-time. Keep everyone on the same
          page with comments and notifications.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Stay Productive
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Use labels, due dates, and checklists to prioritize tasks and stay on track. Integrate with other tools to enhance your
          productivity.
        </Typography>
      </Grid>
    </Grid>
  )
}

export default ValueSection
