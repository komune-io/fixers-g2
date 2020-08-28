import React from 'react'
import { BasicProps } from '../Types'
import { Box, makeStyles } from '@material-ui/core'
import { FilePreview } from '../FilePreview'
import { Folder } from './Folder'

const useStyles = makeStyles(() => ({
  container: {
    width: '100%'
  },
  file: {
    width: '150px',
    height: '150px',
    margin: '10px'
  },
  folder: {
    width: '150px',
    height: '150px',
    margin: '10px'
  }
}))

export type FolderItemType = 'file' | 'folder'

interface FolderClasses {
  folder?: string
  file?: string
}

interface FolderStyles {
  folder?: React.CSSProperties
  file?: React.CSSProperties
}

export interface FolderItem {
  type: FolderItemType
  label: string
  key: string
  onClick?: () => void
  src?: string
  items?: FolderItem[]
  hoverComponent?: React.ReactNode
  isLoading?: boolean
  validated?: boolean
}

interface FilesPanelProps extends BasicProps {
  folder: FolderItem
  classes?: FolderClasses
  styles?: FolderStyles
}

export const FilesPanel = (props: FilesPanelProps) => {
  const { folder, className, id, style, classes, styles } = props
  const defaultClasses = useStyles()
  return (
    <Box
      display='flex'
      flexWrap='wrap'
      className={`${className} ${defaultClasses.container}`}
      id={id}
      style={style}
    >
      {folder.items?.map((item) => {
        if (item.type === 'file')
          return (
            <FilePreview
              title={item.label}
              url={item.src}
              className={`${classes?.file} ${defaultClasses.file}`}
              style={styles?.file}
              onClick={item.onClick}
              key={item.key}
              hoverComponent={item.hoverComponent}
              isLoading={item.isLoading}
              readonly
              validated={item.validated}
            />
          )
        return (
          <Folder
            title={item.label}
            className={`${classes?.folder} ${defaultClasses.folder}`}
            style={styles?.folder}
            onClick={item.onClick}
            key={item.key}
          />
        )
      })}
    </Box>
  )
}
