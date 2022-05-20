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
  SvgDelete,
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
import { CardFeedType } from 'src/constants/types/feed/yours'
import { DashboardUpdatesType } from 'src/constants/types/dashboard/training.types'
import clsx from 'clsx'
import { CommentType } from '../../constants/types'

interface OptionFeedType {
  userId?: string
  type?: string
  providerId?: string
  link?: string
  className?: string
  reportUserName?: string
  card?: CardFeedType
  handleBlockComment?: Function
  handleDeleteComment?: Function
  comment?: CommentType
  checkAccount?: string
}

export const OptionFeed = ({
  userId,
  type,
  providerId,
  link,
  reportUserName,
  card,
  className,
  handleBlockComment,
  handleDeleteComment,
  comment,
  checkAccount,
}: OptionFeedType) => {
  const queryClient = useQueryClient()
  const [openOption, setOpenOption] = useState<boolean>(false)
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [openModalDeleteComment, setOpenModalDeleteComment] =
    useState<boolean>(false)
  const [openModalBlockComment, setOpenModalBlockComment] =
    useState<boolean>(false)
  const [openModalUnfollow, setOpenModalUnfollow] = useState<boolean>(false)
  const [openModalReport, setOpenModalReport] = useState<boolean>(false)

  const [anchorEl, setAnchorEl] = useState(null)
  const classNames = clsx(className && className)
  const { currentRoleId, userRoles } = useAuth()
  // console.log('userRoles', userRoles)
  // console.log('comment', comment?.userId)

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

  const handleConfirmDeleteComment = () => {
    setOpenModalDeleteComment(false)
    handleDeleteComment && handleDeleteComment()
  }

  const handleConfirmBlockComment = () => {
    setOpenModalBlockComment(false)
    handleBlockComment && handleBlockComment()
  }

  // const handleCheckAccount = () => {
  //   if (comment?.userId === currentRoleId) {
  //     return 'sameRole'
  //   } else {
  //     userRoles.forEach((role) => {
  //       if (role?.roleId === comment?.userId) {
  //         return 'sameAccount'
  //       }
  //     })
  //   }
  // }

  return (
    <div className={`${classNames}`}>
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

      {type === 'comment' && (
        <BasicPopover
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          id="popover-feed"
        >
          <>
            <div
              className="h-[40px] w-full flex items-center p-4 hover:bg-[#818389] hover:rounded-[7px] cursor-pointer
                text-[#D60C0C] font-semibold"
              onClick={() => {
                setOpenModalDeleteComment(true)
                handleDeleteComment && handleDeleteComment
              }}
            >
              <SvgDelete />
              <span className="ml-[12px]">Delete comment</span>
            </div>

            {checkAccount !== 'sameRole' && (
              <div
                className="h-[40px] w-full flex items-center p-4 hover:bg-[#818389] hover:rounded-[7px] cursor-pointer
              text-[#D60C0C] font-semibold"
                onClick={() => {
                  setOpenModalBlockComment(true)
                }}
              >
                <SvgBlock fill="#D60C0C" width={14} height={14} />
                <span className="ml-[8px]">Block comment</span>
              </div>
            )}
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
      <ModalMui
        sx={{
          padding: 0,
          top: '50%',
          width: isMobile ? '100%' : 600,
          overflow: 'auto',
        }}
        isOpen={openModalReport}
        onClose={setOpenModalReport}
      >
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
        <SimpleBar style={{ maxHeight: 850 }}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenModalEdit(false)}
              className="absolute z-50 right-6 top-5"
            >
              <XIcon />
            </button>
            <DiaryUpdate
              selected={
                {
                  createdAt: card?.createdAt,
                  training: card?.training,
                  diaryId: card?.postId,
                } as DashboardUpdatesType
              }
            />
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

      {/* Delete Comment  */}
      <ConfirmModal
        label="Delete Comment"
        content={
          <div className="text-center">
            <p>Are you sure you want to delete this?</p>
            <p>Your data will be forever lost!</p>
          </div>
        }
        icon={null}
        actionLabel="Yes, Delete"
        isOpen={openModalDeleteComment}
        onClose={setOpenModalDeleteComment}
        onSubmit={handleConfirmDeleteComment}
        actionLabelClass="bg-[#D60C0C]"
      />

      {/* Block Comment  */}
      <ConfirmModal
        label="Block Comment"
        content={
          <div className="text-center">
            <p>Are you sure you want to block this?</p>
            <p>Your data will be forever lost!</p>
          </div>
        }
        icon={null}
        actionLabel="Yes, Block"
        isOpen={openModalBlockComment}
        onClose={setOpenModalBlockComment}
        onSubmit={handleConfirmBlockComment}
        actionLabelClass="bg-[#D60C0C]"
      />
    </div>
  )
}
