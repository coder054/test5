import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { XIcon } from 'src/components/icons'
import { ModalMui } from 'src/components/ModalMui'
import { BasicPopover } from 'src/components/popover'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import {
  SvgBlock,
  SvgCopyLink,
  SvgOptionMenu,
  SvgUnfollow,
} from 'src/imports/svgs'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import ConfirmModal from 'src/modules/contacts/components/modals/ModalDelete'
import DiaryUpdate from 'src/modules/update-diary'
import { subscribeProvider } from 'src/service/feed/news.service'
import { remind_update_diaries, rss_news, zporter_news } from '../../constants'
import { ModalReport } from './modal-report'
import SimpleBar from 'simplebar-react'

interface OptionFeedType {
  userId?: string
  type?: string
  providerId?: string
  link?: string
  reportUserName?: string
}

export const OptionFeed = ({
  userId,
  type,
  providerId,
  link,
  reportUserName,
}: OptionFeedType) => {
  const { currentRoleId } = useAuth()
  const queryClient = useQueryClient()

  const [openOption, setOpenOption] = useState<boolean>(false)
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [openModalUnfollow, setOpenModalUnfollow] = useState<boolean>(false)
  const [openModalReport, setOpenModalReport] = useState<boolean>(false)

  const [anchorEl, setAnchorEl] = useState(null)

  const { isLoading: loadingSubscribe, mutate: subScribe } = useMutation(
    [QUERIES_FEED.FEED_SUBSCRIBE_PROVIDER],
    subscribeProvider,
    {
      onSuccess: (res) => {
        toast.success(res.data)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_PROVIDER)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST)
        setOpenOption(false)
      },
    }
  )

  const handleConfirmUnfollow = () => {
    if (!providerId) {
      toast.error('provider id not found')
      setOpenModalUnfollow(false)
      return
    }
    subScribe(providerId && providerId)
  }

  const handleOption = (e) => {
    setAnchorEl(e.currentTarget)
    if (!openOption) {
      setOpenOption(true)
    } else {
      setOpenOption(false)
    }
  }
  const open = Boolean(anchorEl)

  const handleConfirmFollow = () => {}

  return (
    <div className="">
      {type !== remind_update_diaries && (
        <div onClick={handleOption} aria-describedby={'basic-popover'}>
          <SvgOptionMenu />
        </div>
      )}

      {type && (type === rss_news || type === zporter_news) && (
        <BasicPopover
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          id="popover-feed"
        >
          <div className="box-border">
            <div
              className="h-[40px] w-full flex items-center p-4 hover:bg-[#818389] hover:rounded-[7px] cursor-pointer"
              onClick={() => setOpenModalUnfollow(true)}
            >
              <SvgUnfollow />{' '}
              <span className="ml-[8px] text-[#D60C0C] font-bold">
                Unfollow
              </span>
            </div>
            <div
              className="h-[40px] w-full flex items-center p-4 hover:bg-[#818389] hover:rounded-[7px] cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(link && (link as string))
                toast.success('Copy successfully!')
                setOpenOption && setOpenOption(false)
              }}
            >
              <SvgCopyLink /> <span className="ml-[10px]">Copy link</span>
            </div>
          </div>
        </BasicPopover>
      )}

      {userId &&
        type &&
        type !== rss_news &&
        type !== zporter_news &&
        currentRoleId &&
        userId !== currentRoleId && (
          <BasicPopover
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            id="popover-feed"
          >
            <>
              <div
                className="h-[40px] w-full flex items-center p-4 hover:bg-[#818389] hover:rounded-[7px] cursor-pointer"
                onClick={() => {
                  setOpenModalReport(true)
                  setOpenOption(false)
                }}
              >
                <span className="ml-[8px]">Report</span>
              </div>
              <div
                className="h-[40px] w-full flex items-center p-4 hover:bg-[#818389] hover:rounded-[7px] cursor-pointer"
                onClick={() => {
                  // navigator.clipboard.writeText(card?.link as string)
                  // toast.success('Copy successfully!')
                  setOpenOption(false)
                }}
              >
                <span className="ml-[10px]">Copy link</span>
              </div>
              <div
                className="h-[40px] w-full flex items-center p-4 hover:bg-[#818389] hover:rounded-[7px] cursor-pointer"
                onClick={() => {
                  setOpenModalUnfollow(false)
                  setOpenOption(false)
                }}
              >
                <span className="ml-[8px]">Share</span>
              </div>
            </>
          </BasicPopover>
        )}

      {userId &&
        type &&
        type !== rss_news &&
        type !== zporter_news &&
        currentRoleId &&
        userId === currentRoleId && (
          <BasicPopover
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            id="popover-feed"
          >
            <>
              <div
                className="h-[40px] w-full flex items-center p-4 hover:bg-[#818389] hover:rounded-[7px] cursor-pointer"
                onClick={() => setOpenModalEdit(true)}
              >
                <span className="ml-[8px]">Edit</span>
              </div>
              <div
                className="h-[40px] w-full flex items-center p-4 hover:bg-[#818389] hover:rounded-[7px] cursor-pointer"
                onClick={() => setOpenModalDelete(true)}
              >
                <span className="ml-[8px]">Delete Post</span>
              </div>
              <div
                className="h-[40px] w-full flex items-center p-4 hover:bg-[#818389] hover:rounded-[7px] cursor-pointer"
                // onClick={() => setOpenModalUnfollow(false)}
              >
                <span className="ml-[8px]">Copy link</span>
              </div>
              <div
                className="h-[40px] w-full flex items-center p-4 hover:bg-[#818389] hover:rounded-[7px] cursor-pointer"
                // onClick={() => setOpenModalUnfollow(false)}
              >
                <span className="ml-[8px]">Share</span>
              </div>
            </>
          </BasicPopover>
        )}
      <ConfirmModal
        label="Unfollow"
        content="Are you sure you want to unfollow this news provider?"
        icon={<SvgBlock />}
        actionLabel="Unfollow"
        isOpen={openModalUnfollow}
        onClose={setOpenModalUnfollow}
        onSubmit={handleConfirmUnfollow}
      />
      {/* report */}
      <ModalMui isOpen={openModalReport} onClose={setOpenModalReport}>
        <ModalReport
          setOpenModalReport={setOpenModalReport}
          reportUserName={reportUserName}
        />
      </ModalMui>

      {/* edit diary  */}
      <ModalMui
        sx={{
          padding: 0,
          top: '50%',
          width: isMobile ? '100%' : 700,
          overflow: 'auto',
        }}
        isOpen={openModalEdit}
        onClose={setOpenModalEdit}
      >
        {/* @ts-ignore: Unreachable code error */}
        <SimpleBar style={{ maxHeight: 850 }}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenModalEdit(false)}
              className="absolute z-50 right-6 top-5"
            >
              <XIcon />
            </button>
            <DiaryUpdate />
          </div>
        </SimpleBar>
      </ModalMui>

      {/* Delete Post  */}
      <ConfirmModal
        label="Delete Post"
        content={
          <div className="text-center">
            <p>Are you sure you want to delete this?</p>
            <p>Your data will be forever lost!</p>
          </div>
        }
        icon={null}
        actionLabel="Yes, Delete"
        isOpen={openModalDelete}
        onClose={setOpenModalDelete}
        onSubmit={handleConfirmFollow}
        actionLabelClass="bg-[#D60C0C]"
        followNews
        isLoading={loadingSubscribe}
      />
    </div>
  )
}
