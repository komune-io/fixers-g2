import {
  SmoothAnchor as AruiSmoothAnchor,
  SmoothAnchorBasicProps
} from './SmoothAnchor'
import { StoryObj, Meta } from '@storybook/react'
import { Box, Typography } from '@mui/material'
import { Link } from '../Link'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Components/SmoothAnchor',
  component: AruiSmoothAnchor
} as Meta<typeof AruiSmoothAnchor>

export const SmoothAnchor: StoryObj<SmoothAnchorBasicProps> = {
  render: () => {
    return (
      <Box display='flex' width='100%' height='1500px'>
        <Link href='#myAnchor'>Go To the anchor</Link>
        <BrowserRouter>
          <Box
            sx={{
              alignSelf: 'flex-end'
            }}
          >
            <Typography>The anchor scrolled you to me</Typography>
            <AruiSmoothAnchor id='myAnchor' />
          </Box>
        </BrowserRouter>
      </Box>
    )
  },

  name: 'SmoothAnchor'
}
