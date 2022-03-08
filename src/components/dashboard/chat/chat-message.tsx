import { useState } from 'react'
import type { FC } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNowStrict } from 'date-fns'
import { Avatar, Box, Card, CardMedia, Link, Typography } from '@mui/material'
import { isEmpty } from 'lodash'

interface ChatMessageProps {
  authorAvatar: string
  authorName: string
  authorType: 'contact' | 'user'
  body: string
  contentType: string
  imageUrl: string
  videoUrl: string
  fileMeta: {
    fileUrl: string
    attachmentName: string
    size: number
  }
  createdAt: number
}

export const ChatMessage: FC<ChatMessageProps> = (props) => {
  const {
    body,
    contentType,
    createdAt,
    authorAvatar,
    authorName,
    authorType,
    imageUrl,
    videoUrl,
    fileMeta,
    ...other
  } = props
  const [expandMedia, setExpandMedia] = useState<boolean>(false)

  const renderContent = () => {
    if (contentType === 'image') {
      return (
        <CardMedia
          onClick={(): void => setExpandMedia(true)}
          image={imageUrl}
          sx={{ height: 200 }}
        />
      )
    }

    if (contentType === 'custom' && !!videoUrl) {
      return (
        <CardMedia
          component="video"
          onClick={(): void => setExpandMedia(true)}
          src={videoUrl}
          sx={{ height: 200 }}
          controls
        />
      )
    }

    if (contentType === 'file' && !isEmpty(fileMeta)) {
      return (
        <div className="flex ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-[12px] "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>

          <div className=" ">
            <a
              className="block hover:[color:#006699] "
              href={fileMeta.fileUrl}
              download
              target={'_blank'}
            >
              {fileMeta.attachmentName}
            </a>
            <div className="text-[14px] ">
              {(fileMeta.size / (1024 * 1024)).toFixed(2)} MB
            </div>
          </div>
        </div>
      )
    }

    return (
      <Typography color="inherit" variant="body1">
        {body}
      </Typography>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: authorType === 'user' ? 'row-reverse' : 'row',
        maxWidth: 500,
        ml: authorType === 'user' ? 'auto' : 0,
        mb: 2,
      }}
      {...other}
    >
      <Avatar
        src={authorAvatar}
        sx={{
          height: 32,
          ml: authorType === 'user' ? 2 : 0,
          mr: authorType === 'user' ? 0 : 2,
          width: 32,
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Card
          sx={{
            backgroundColor:
              authorType === 'user' ? 'primary.main' : 'background.paper',
            color:
              authorType === 'user' ? 'primary.contrastText' : 'text.primary',
            px: 2,
            py: 1,
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Link
              color="inherit"
              sx={{ cursor: 'pointer' }}
              variant="subtitle2"
            >
              {authorName}
            </Link>
          </Box>
          {renderContent()}
        </Card>
        <Box
          sx={{
            display: 'flex',
            justifyContent: authorType === 'user' ? 'flex-end' : 'flex-start',
            mt: 1,
            px: 2,
          }}
        >
          <Typography color="textSecondary" noWrap variant="caption">
            {formatDistanceToNowStrict(createdAt)} ago
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

ChatMessage.propTypes = {
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorType: PropTypes.oneOf(['contact', 'user']),
  body: PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
}
