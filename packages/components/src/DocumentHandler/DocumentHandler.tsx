import {
  BasicProps,
  MergeMuiElementProps,
  useTheme
} from '@komune-io/g2-themes'
import {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { Dropzone, DropzoneProps, MIME_TYPES } from '@mantine/dropzone'
import { FileRejection } from 'react-dropzone'
import { cx } from '@emotion/css'
import {
  CircularProgress,
  Divider,
  InputLabel,
  Stack,
  Typography,
  StackProps,
  Box
} from '@mui/material'
import {
  CloudDoneRounded,
  CloudUploadRounded,
  DeleteRounded,
  DownloadRounded,
  ErrorRounded,
  UploadRounded,
  VisibilityRounded
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import '@mantine/dropzone/styles.css'

export type DropError =
  | 'file-too-large'
  | 'too-many-files'
  | 'file-invalid-type'

export interface DocumentHandlerBasicProps extends BasicProps {
  /**
   * The name of the file displayed has a label. You can provide it even if the file is not uploaded yet.
   * you may provide the name with the file type at the end which will be cut and displayed a part.
   */
  fileLabel?: string
  /**
   * The label displayed on top of the document handler if wanted
   */
  label?: ReactNode
  /**
   * provide it if the file is already uploaded
   */
  getFileUrl?: () => string | Promise<string | undefined> | void | undefined
  /**
   * Define if the file is uploaded or not
   */
  uploaded: boolean
  /**
   * Indicates if the file is mandatory or not
   *
   * @default false
   */
  isRequired?: boolean
  /**
   * Determine the type of file accepted. By default all the types are allowed
   */
  fileTypesAllowed?: (keyof typeof MIME_TYPES)[]
  /**
   * The custom error message
   */
  customErrorMessage?: string
  /**
   * Detemine if the user can upload multiple file or not. Not compatible with required prop
   * @default false
   */
  multiple?: boolean
  /**
   * isLoading state
   * @default false
   */
  isLoading?: boolean
  /**
   * onAdd files event handler.
   */
  onAdd?: (files: File[]) => void
  /**
   * onDelete file event handler.
   */
  onDelete?: () => void
  /**
   * onEditFileName event handler.
   */
  onEditFileName?: (newName: string) => void
  /**
   * onDownload event handler. By default the onDownload will download the file pointed by the url.
   */
  onDownload?: () => void
  /**
   * onView event handler. By default the onView will open the file in a new tab.
   */
  onView?: () => void
  /**
   * The props of the dropzone
   */
  dropzoneProps?: Omit<DropzoneProps, 'children' | 'onDrop'>
}

export type DocumentHandlerProps = MergeMuiElementProps<
  StackProps,
  DocumentHandlerBasicProps
>

export const DocumentHandler = (props: DocumentHandlerProps) => {
  const {
    label,
    getFileUrl,
    isRequired = false,
    fileTypesAllowed,
    customErrorMessage,
    multiple = false,
    onAdd,
    onDelete,
    onEditFileName,
    onDownload,
    onView,
    isLoading = false,
    className,
    dropzoneProps,
    style,
    uploaded,
    fileLabel,
    id,
    ...otherProps
  } = props
  const [error, setError] = useState(customErrorMessage)
  const [loading, setLoading] = useState(false)
  const theme = useTheme()
  const dropzoneRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()

  const downHandler = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.click()
    }
  }, [])

  useEffect(() => {
    if (dropzoneRef.current) {
      //@ts-ignore
      dropzoneRef.current.onkeydown = downHandler
    }
  }, [dropzoneRef.current])

  useEffect(() => {
    setError(customErrorMessage)
  }, [customErrorMessage])

  const onViewMemoized = useCallback(async () => {
    if (onView) {
      onView()
    } else if (getFileUrl) {
      setLoading(true)
      const url = await getFileUrl()
      if (url) window.open(url, '_blank')
      setLoading(false)
    }
  }, [onView, getFileUrl])

  const onDownloadMemoized = useCallback(async () => {
    if (onDownload) {
      onDownload()
    } else if (getFileUrl && fileLabel) {
      setLoading(true)
      const url = await getFileUrl()
      if (url) {
        const link = document.createElement('a')
        link.href = url
        link.download = fileLabel
        link.click()
      }
      setLoading(false)
    }
  }, [onDownload, getFileUrl, fileLabel])

  const onRejectMemoized = useCallback(
    (fileRejections: FileRejection[]) => {
      const code = fileRejections[0].errors[0].code as DropError
      setError(
        t('g2.' + code, {
          formats: fileTypesAllowed?.join(', '),
          sizeLimit: dropzoneProps?.maxSize
            ? dropzoneProps?.maxSize / 1024 / 1024
            : 50
        })
      )
    },
    [t, dropzoneProps?.maxSize, fileTypesAllowed]
  )

  const onDrop = useCallback(
    (files: File[]) => {
      onAdd && onAdd(files)
      setError(undefined)
    },
    [onAdd]
  )

  const accept = useMemo(() => {
    if (fileTypesAllowed) {
      return fileTypesAllowed.map((type) => MIME_TYPES[type])
    }
    return
  }, [fileTypesAllowed])

  const childrenProps: DropzoneChildrenProps = {
    uploaded,
    error,
    label: fileLabel,
    isRequired,
    onDelete,
    onEditFileName,
    onDownload: onDownloadMemoized,
    onView: onViewMemoized,
    fileTypesAllowed,
    isLoading: isLoading || loading
  }

  if (uploaded) {
    return (
      <>
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
        {/* @ts-ignore */}
        <Stack
          {...otherProps}
          id={id}
          className={cx('AruiDocumentHandler-root', className)}
          style={style}
          sx={{
            width: '100%',
            minWidth: '100px',
            overflow: 'hidden',
            borderRadius: theme.borderRadius + 'px',
            background: '#F5F5F5',
            cursor: 'pointer',
            ...otherProps?.sx
          }}
          onClick={onViewMemoized}
        >
          <DropzoneChildren {...childrenProps} />
        </Stack>
      </>
    )
  }
  return (
    <Box
      sx={{
        width: '100%',
        minWidth: '100px',
        '& .AruiDocumentHandler-root': {
          width: '100%',
          minWidth: '100px',
          overflow: 'hidden',
          borderRadius: theme.borderRadius + 'px',
          border: '2px dashed rgb(189, 189, 189)',
          borderColor: error ? theme.colors.error : '#BDBDBD',
          padding: '0px',
          pointerEvents: isLoading || loading ? 'none' : 'auto',
          opacity: isLoading || loading ? 0.8 : 1,
          backgroundColor: 'rgb(255, 255, 255)'
        },
        '&:hover .AruiDocumentHandler-root': {
          backgroundColor: 'rgb(248, 249, 250)'
        }
      }}
    >
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <Dropzone
        className={cx('AruiDocumentHandler-root', className)}
        onDrop={onDrop}
        onReject={onRejectMemoized}
        accept={accept}
        ref={dropzoneRef}
        maxSize={50 * 1024 * 1024}
        multiple={multiple && !isRequired}
        disabled={isLoading || loading}
        {...dropzoneProps}
      >
        <DropzoneChildren {...childrenProps} />
      </Dropzone>
    </Box>
  )
}

interface DropzoneChildrenProps {
  uploaded: boolean
  error?: string
  label?: string
  isRequired?: boolean
  onDelete?: () => void
  onEditFileName?: (newName: string) => void
  onDownload?: () => void
  onView?: () => void
  fileTypesAllowed?: (keyof typeof MIME_TYPES)[]
  isLoading: boolean
}

export const DropzoneChildren = (props: DropzoneChildrenProps) => {
  const {
    uploaded,
    error,
    isRequired,
    label,
    onDelete,
    onDownload,
    onEditFileName,
    onView,
    fileTypesAllowed,
    isLoading
  } = props

  const { t } = useTranslation()
  const generatedLabel = useMemo(() => {
    if (error)
      return (
        <Typography
          sx={{ color: (theme) => theme.palette.error.main }}
          variant='body2'
        >
          {error}
        </Typography>
      )
    const labels: JSX.Element[] = []

    if (isRequired && !uploaded) {
      labels.push(
        <Typography
          key='isRequired'
          sx={{ color: (theme) => theme.palette.warning.main, fontWeight: 700 }}
          variant='subtitle2'
        >
          {t('g2.required')}
        </Typography>
      )
    }

    if (fileTypesAllowed && !uploaded) {
      labels.push(
        <Typography
          key='fileType'
          sx={{ color: '#676879', textTransform: 'uppercase' }}
          variant='subtitle2'
        >
          {fileTypesAllowed.join(', ')}
        </Typography>
      )
    }
    if (label) {
      const labelParts = label.split('.')
      const labelName = labelParts[0]
      const labelType = labelParts[1]
      if (labelType) {
        labels.push(
          <Typography
            key='fileType-lastPart'
            sx={{ color: '#676879', textTransform: 'uppercase' }}
            variant='subtitle2'
          >
            {labelType}
          </Typography>
        )
      }
      labels.push(
        <Typography
          key='label'
          sx={{
            color: '#676879',
            lineBreak: 'anywhere',
            WebkitLineClamp: 2,
            lineClamp: '2',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}
          variant='body2'
        >
          {labelName}
        </Typography>
      )
    }

    return labels
  }, [error, label, isRequired, uploaded, fileTypesAllowed])

  const generatedIcon = useMemo(() => {
    if (isLoading) {
      return (
        <CircularProgress
          size={24}
          sx={{
            color: '#676879'
          }}
        />
      )
    }
    if (uploaded) {
      return <CloudDoneRounded color='success' />
    }
    if (error) {
      return <ErrorRounded color='error' />
    }
    if (isRequired) {
      return <CloudUploadRounded color='warning' />
    }
    return <CloudUploadRounded sx={{ color: '#676879' }} />
  }, [isRequired, error, isLoading])

  const generatedActions = useMemo(() => {
    const iconSx = {
      width: '20px',
      height: '20px',
      color: '#676879',
      cursor: 'pointer',
      opacity: 0.6,
      '&:hover': {
        opacity: 1
      }
    }
    if (!uploaded) {
      return <UploadRounded sx={iconSx} />
    } else {
      const actions: JSX.Element[] = []
      if (onDelete) {
        actions.push(
          <DeleteRounded
            key='onDelete'
            sx={iconSx}
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
          />
        )
      }
      // if (onEditFileName) {
      //     actions.push(
      //         <IconButton sx={buttonSx} onClick={}>
      //             <EditRounded sx={iconSx} />
      //         </IconButton>
      //     )
      // }
      if (onDownload) {
        actions.push(
          <DownloadRounded
            sx={iconSx}
            key='onDownload'
            onClick={(e) => {
              e.stopPropagation()
              onDownload()
            }}
          />
        )
      }
      if (onView) {
        actions.push(
          <VisibilityRounded
            sx={iconSx}
            key='onView'
            onClick={(e) => {
              e.stopPropagation()
              onView()
            }}
          />
        )
      }
      return actions
    }
  }, [uploaded, onDelete, onEditFileName, onDownload, onView])

  return (
    <Stack
      direction='row'
      sx={{
        alignItems: 'center',
        padding: '10px 14px',
        gap: (theme) => theme.spacing(2)
      }}
    >
      {generatedIcon}
      <Divider
        sx={{ borderColor: '#BDBDBD' }}
        orientation='vertical'
        flexItem
      />
      <Stack
        direction='row'
        sx={{
          alignItems: 'center',
          flex: 1,
          gap: (theme) => theme.spacing(1)
        }}
        divider={<Divider sx={{ width: '8px', borderColor: '#BDBDBD' }} />}
      >
        {generatedLabel}
      </Stack>
      <Stack
        direction='row'
        sx={{
          alignItems: 'center',
          gap: (theme) => theme.spacing(1.2)
        }}
      >
        {generatedActions}
      </Stack>
    </Stack>
  )
}
