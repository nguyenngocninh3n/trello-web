import { Divider, Grid, Stack, Typography } from '@mui/material'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'
import SidebarItem from '~/pages/Board/components/SideBarItem'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
const RightSide = ({ card, onUploadCardCover }) => {
  return (
    <Grid item xs={12} sm={3}>
      <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Add To Card</Typography>
      <Stack direction="column" spacing={1}>
        {/* Feature 05: Xử lý hành động bản thân user tự join vào card */}
        <SidebarItem className="active">
          <PersonOutlineOutlinedIcon fontSize="small" />
          Join
        </SidebarItem>
        <SidebarItem className="active" component="label">
          <ImageOutlinedIcon fontSize="small" />
          Cover
          <VisuallyHiddenInput type="file" onChange={onUploadCardCover} />
        </SidebarItem>

        <SidebarItem>
          <AttachFileOutlinedIcon fontSize="small" />
          Attachment
        </SidebarItem>
        <SidebarItem>
          <LocalOfferOutlinedIcon fontSize="small" />
          Labels
        </SidebarItem>
        <SidebarItem>
          <TaskAltOutlinedIcon fontSize="small" />
          Checklist
        </SidebarItem>
        <SidebarItem>
          <WatchLaterOutlinedIcon fontSize="small" />
          Dates
        </SidebarItem>
        <SidebarItem>
          <AutoFixHighOutlinedIcon fontSize="small" />
          Custom Fields
        </SidebarItem>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Power-Ups</Typography>
      <Stack direction="column" spacing={1}>
        <SidebarItem>
          <AspectRatioOutlinedIcon fontSize="small" />
          Card Size
        </SidebarItem>
        <SidebarItem>
          <AddToDriveOutlinedIcon fontSize="small" />
          Google Drive
        </SidebarItem>
        <SidebarItem>
          <AddOutlinedIcon fontSize="small" />
          Add Power-Ups
        </SidebarItem>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Actions</Typography>
      <Stack direction="column" spacing={1}>
        <SidebarItem>
          <ArrowForwardOutlinedIcon fontSize="small" />
          Move
        </SidebarItem>
        <SidebarItem>
          <ContentCopyOutlinedIcon fontSize="small" />
          Copy
        </SidebarItem>
        <SidebarItem>
          <AutoAwesomeOutlinedIcon fontSize="small" />
          Make Template
        </SidebarItem>
        <SidebarItem>
          <ArchiveOutlinedIcon fontSize="small" />
          Archive
        </SidebarItem>
        <SidebarItem>
          <ShareOutlinedIcon fontSize="small" />
          Share
        </SidebarItem>
      </Stack>
    </Grid>
  )
}

export default RightSide
