import Tooltip from '@mui/material/Tooltip'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  RedditShareButton,
  TumblrShareButton,
  InstapaperShareButton,
  LineShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  InstapaperIcon,
  LineIcon,
  TelegramIcon,
} from 'react-share'

interface ModalShareProps {
  url?: string
}

export const ModalShare = ({ url }: ModalShareProps) => {
  return (
    <div className="flex w-full gap-2">
      <FacebookShareButton
        url={url && url}
        className="flex-1 h-[78px] flex justify-center items-center"
      >
        <Tooltip title="Facebook">
          <FacebookIcon size={64} className="rounded-full" />
        </Tooltip>
      </FacebookShareButton>

      <TwitterShareButton
        url={url && url}
        className="flex-1 h-[78px] flex justify-center items-center"
      >
        <TwitterIcon size={64} className="rounded-full" />
      </TwitterShareButton>

      <LinkedinShareButton
        url={url && url}
        className="flex-1 h-[78px] flex justify-center items-center"
      >
        <LinkedinIcon size={64} className="rounded-full" />
      </LinkedinShareButton>

      <WhatsappShareButton
        url={url && url}
        className="flex-1 h-[78px] flex justify-center items-center"
      >
        <WhatsappIcon size={64} className="rounded-full" />
      </WhatsappShareButton>

      <RedditShareButton
        url={url && url}
        className="flex-1 h-[78px] flex justify-center items-center"
      >
        <RedditIcon size={64} className="rounded-full" />
      </RedditShareButton>

      <TumblrShareButton
        url={url && url}
        className="flex-1 h-[78px] flex justify-center items-center"
      >
        <TumblrIcon size={64} className="rounded-full" />
      </TumblrShareButton>

      <InstapaperShareButton
        url={url && url}
        className="flex-1 h-[78px] flex justify-center items-center"
      >
        <InstapaperIcon size={64} className="rounded-full" />
      </InstapaperShareButton>

      <LineShareButton
        url={url && url}
        className="flex-1 h-[78px] flex justify-center items-center"
      >
        <LineIcon size={64} className="rounded-full" />
      </LineShareButton>

      <TelegramShareButton
        url={url && url}
        className="flex-1 h-[78px] flex justify-center items-center"
      >
        <TelegramIcon size={64} className="rounded-full" />
      </TelegramShareButton>
    </div>
  )
}
