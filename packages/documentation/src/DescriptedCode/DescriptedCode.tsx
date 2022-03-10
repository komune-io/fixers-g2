import { Box } from '@mui/material'
import { BasicProps } from '@smartb/g2-themes'
import { cx } from '@emotion/css'
import React from 'react'

export interface DescriptedCodeProps extends BasicProps {
  /**
   * The description placed in the right container
   */
  rightElement?: React.ReactNode
  /**
   * The code placed in the right sticky container
   */
  leftElement?: React.ReactNode
}

export const DescriptedCode = (props: DescriptedCodeProps) => {
  const { leftElement, rightElement, className, style, id } = props
  return (
    <Box
      className={cx('AruiDescriptedCode-root', className)}
      style={style}
      id={id}
      display='flex'
      flexDirection='row'
      padding='20px 0px'
    >
      <Box
        className={'AruiDescriptedCode-leftContainer'}
        width='60%'
        paddingRight='10px'
        boxSizing='border-box'
      >
        {leftElement}
      </Box>
      <Box
        className={'AruiDescriptedCode-rightContainer'}
        width='40%'
        padding='0px 10px'
        position='sticky'
        boxSizing='border-box'
        paddingTop='30px'
        top='0'
        alignSelf='flex-start'
      >
        {rightElement}
      </Box>
    </Box>
  )
}