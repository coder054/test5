import { MySlider } from 'src/components/MySlider'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Link,
  Typography,
} from '@mui/material'
import { formatDistanceToNowStrict } from 'date-fns'
import { isEmpty, upperFirst } from 'lodash'
import PropTypes from 'prop-types'
import { FC } from 'react'
import { useState, useCallback, useRef } from 'react'
import { ModalMui } from 'src/components/ModalMui'
import { IPreviewData } from 'src/modules/chat/chatService'
import { getErrorMessage, getStr } from 'src/utils/utils'
import {
  FootBallSkillTypes,
  RadarChartTypes,
} from 'src/modules/development/skills'
import { MyTextArea } from 'src/components/MyTextarea'
import { MyInputChips } from 'src/components/MyInputChips'
import { axios } from 'src/utils/axios'
import toast from 'react-hot-toast'
import { MySelect } from 'src/components/MySelect'

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
  createdBy: string
  message: any
  previewData: IPreviewData
}

export const ChatMessage: FC<ChatMessageProps> = (props) => {
  const {
    message,
    body,
    contentType,
    createdAt,
    createdBy,
    authorAvatar,
    authorName,
    authorType,
    imageUrl,
    videoUrl,
    fileMeta,
    previewData,
    ...other
  } = props
  const [expandMedia, setExpandMedia] = useState<boolean>(false)

  const renderContent = () => {
    // return (
    //   <LinkPreview
    //     url="https://dantri.com.vn/the-gioi/slovakia-ra-dieu-kien-cap-s300-ngay-lap-tuc-cho-ukraine-20220318135631706.htm"
    //     width="400px"
    //     customFetcher={async (url) => {
    //       const target: {
    //         title: string | null
    //         description: string | null
    //         image: string | null
    //         siteName: string | null
    //         hostname: string | null
    //       }
    //       return target
    //     }}
    //   />
    // )

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

    if (contentType === 'text' && !isEmpty(previewData)) {
      return (
        <div className=" ">
          <Typography color="inherit" variant="body1">
            {body}
          </Typography>

          <a
            target="_blank"
            href={getStr(previewData, 'link')}
            className="hover:text-black  "
          >
            <div className="font-semibold mt-4 ">{previewData.title}</div>
            <div className="">{previewData.description}</div>
            <img src={getStr(previewData, 'image.url')} className=" " alt="" />
          </a>
        </div>
      )
    }

    if (contentType === 'skillUpdateLink') {
      return (
        <MessageSkillUpdateLink
          message={message}
          authorAvatar={authorAvatar}
          authorName={authorName}
          createdBy={createdBy}
        />
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

const MessageSkillUpdateLink = ({
  authorAvatar,
  authorName,
  createdBy,
  message,
}) => {
  const [open, setOpen] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [summary, setSummary] = useState<string>('')

  const [footballSkills, setFootBallSkills] = useState<FootBallSkillTypes>({
    technics: 0,
    tactics: 0,
    physics: 0,
    mental: 0,
    leftFoot: 0,
    rightFoot: 0,
  })

  const [radarChart, setRadarChart] = useState<RadarChartTypes>({
    attacking: 0,
    dribbling: 0,
    passing: 0,
    shooting: 0,
    heading: 0,
    defending: 0,
    tackling: 0,
    pace: 0,
  })
  const handleChangeSkills = useCallback(
    (type: keyof FootBallSkillTypes, value: number) => {
      setFootBallSkills((prev) => ({ ...prev, [type]: value }))
    },
    [footballSkills]
  )

  const handleChangeChart = useCallback(
    (type: keyof RadarChartTypes, value: number) => {
      setRadarChart((prev) => ({ ...prev, [type]: value }))
    },
    [radarChart]
  )

  return (
    <>
      {/*  */}
      <ModalMui
        sx={{
          width: 700,
          top: '50%',
          p: '0',
        }}
        isOpen={open}
        onClose={() => {
          setOpen(false)
        }}
        showXIcon
      >
        <>
          <div className="text-[18px] font-Inter mb-5 2xl:mb-6 ml-8 mt-8 ">
            Update player Skills
          </div>

          <div
            style={{
              maxHeight: 'calc(100vh - 195px)',
              overflowY: 'auto',
            }}
            className="p-4 xl:p-8 "
          >
            <MySelect
              label={'Your Team'}
              value={'C36'}
              disabled
              onChange={(e) => {}}
              arrOption={[
                {
                  label: 'C36',
                  value: 'C36',
                },
              ]}
            />
            <div className="h-[24px] "></div>

            <MySelect
              label={'Player'}
              value={authorName}
              disabled
              onChange={(e) => {}}
              arrOption={[
                {
                  label: authorName,
                  value: authorName,
                },
              ]}
            />
            <div className="h-[24px] "></div>
            <div className="text-Grey font-Inter pl-4 my-4 ">
              Update your players skills compared to peers in their age?
            </div>
            <div className="space-y-1 ">
              {Object.keys(footballSkills).map((skill: string) => (
                <MySlider
                  isStar
                  key={skill}
                  step={5}
                  readOnly={true}
                  label={upperFirst(skill)}
                  onChange={(e) =>
                    handleChangeSkills(skill as keyof FootBallSkillTypes, e)
                  }
                  labelClass="text-[#A2A5AD]"
                  value={footballSkills[skill]}
                />
              ))}
            </div>
            <div className="text-Grey font-Inter pl-4 my-4 ">
              And to be a bit more detailed, so they can update radar chart
            </div>

            <div className="space-y-1">
              {Object.keys(radarChart).map((chart) => (
                <MySlider
                  step={1}
                  isPoint
                  key={chart}
                  label={upperFirst(chart)}
                  onChange={(e) =>
                    handleChangeChart(chart as keyof RadarChartTypes, e)
                  }
                  labelClass="text-[#A2A5AD]"
                  value={radarChart[chart]}
                />
              ))}
            </div>

            <div className="text-Grey font-Inter pl-4 my-4 ">
              Now comment thei profile summary and suggest ev. specialities as
              well
            </div>

            <MyTextArea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="As for ex. - Fast, hard shooting, power forward and striker with an amazing left foot"
            />
            <div className="h-[32px] "></div>
            <MyInputChips
              label="Speciality tags"
              labelClass="text-[#A2A5AD]"
              value={tags}
              setTags={setTags}
            />
          </div>

          <div className="flex mt-4 p-4 ">
            <Button
              onClick={(e) => {
                e.stopPropagation()
                setOpen(false)
              }}
              fullWidth
              size="large"
              sx={{ mr: 2 }}
              variant="outlined"
            >
              Close
            </Button>
            <Button
              onClick={async (e) => {
                e.stopPropagation()

                try {
                  const { data } = await axios.patch(
                    `/users/${createdBy}/coach-update-player-skills`,
                    {
                      specialityTags: tags,
                      overall: {
                        mental: footballSkills.mental / 20,
                        physics: footballSkills.physics / 20,
                        tactics: footballSkills.tactics / 20,
                        technics: footballSkills.technics / 20,
                        leftFoot: footballSkills.leftFoot / 20,
                        rightFoot: footballSkills.rightFoot / 20,
                      },
                      radar: {
                        attacking: radarChart.attacking / 20,
                        defending: radarChart.defending / 20,
                        dribbling: radarChart.dribbling / 20,
                        passing: radarChart.passing / 20,
                        shooting: radarChart.shooting / 20,
                        pace: radarChart.pace / 20,
                        tackling: radarChart.tackling / 20,
                        heading: radarChart.heading / 20,
                      },
                      summary,
                    }
                  )
                  toast.success('Skill review successfully')
                } catch (error) {
                  toast.error(getErrorMessage(error))
                }
                setOpen(false)
              }}
              fullWidth
              size="large"
              variant="contained"
            >
              Ok
            </Button>
          </div>
        </>
      </ModalMui>
      {/*  */}
      <div
        className="flex items-center cursor-pointer gap-x-4"
        onClick={() => {
          setOpen(true)
        }}
      >
        <img
          src={authorAvatar}
          className="block w-[50px] h-[50px] rounded-[8px] object-cover "
          alt=""
        />
        <div className=" ">
          <Typography color="inherit" variant="body2">
            {authorName}
          </Typography>
          <div className="underline font-Inter">Skill update request</div>
        </div>
      </div>
    </>
  )
}
