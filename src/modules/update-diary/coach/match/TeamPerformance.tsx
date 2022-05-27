import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  TextField,
} from '@mui/material'
import Rating from '@mui/material/Rating'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { PlAYER_REVIEWS } from 'src/atoms/diaryAtoms'
import { QUERIES_CLUBS } from 'src/constants/query-keys/query-keys.constants'
import { PlayerReviewsType } from 'src/constants/types/diary.types'
import { UserType } from 'src/constants/types/settingsType.type'
import { SvgFilter } from 'src/imports/svgs'
import { fetchMember } from 'src/service/diary-update'
import { safeHttpImage } from 'src/utils/utils'

interface TeamPerformanceProps {
  teamId: string
  value?: PlayerReviewsType[]
}

function TeamPerformance({ teamId, value }: TeamPerformanceProps) {
  const [, setPlayerReviews] = useAtom(PlAYER_REVIEWS)
  const [members, setMembers] = useState<UserType[]>([])
  const [isSelectAll, setIsSelectAll] = useState<boolean>(true)
  const [isSelectable, setIsSelectable] = useState<boolean>(false)

  const [expanded, setExpanded] = useState<string | boolean>(false)
  const handleChange = (panel: string) => (_: unknown, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const { data } = useQuery([QUERIES_CLUBS.TEAM_MEMBERS, teamId], () =>
    fetchMember(teamId, 'PLAYER')
  )

  const handleRatingAll = (value: number) => {
    setMembers((prev) => [...prev].map((it) => ({ ...it, performance: value })))
  }

  const handleRatingMember = (id: string, value: number) => {
    setMembers((prev) =>
      [...prev].map((it) => ({
        ...it,
        performance: it.userId === id ? value : it.performance,
      }))
    )
  }

  const handleSelectAll = (value: boolean) => {
    setIsSelectAll(value)
    setMembers((prev) =>
      [...prev].map((it) => ({
        ...it,
        isSelected: value,
      }))
    )
  }

  const handleSelectMember = (id: string, value: boolean) => {
    setMembers((prev) =>
      [...prev].map((it) => ({
        ...it,
        isSelected: it.userId === id ? value : it.isSelected,
      }))
    )
  }

  const handleChangeReview = debounce((userId, value) => {
    setMembers((prev) =>
      [...prev].map((it) => ({
        ...it,
        matchReview: it.userId === userId ? value : it.matchReview,
      }))
    )
  }, 600)

  useEffect(() => {
    setPlayerReviews(
      [...(members || [])]
        .filter((it) => it.isSelected)
        .map((it) => ({
          performance: it.performance,
          userId: it.userId,
          matchReview: it.matchReview,
          role: it.role,
        }))
    )
  }, [members])

  useEffect(() => {
    if (value && value.length > 0) {
      setMembers(
        value.map((it: PlayerReviewsType) => ({
          ...it,
          isSelected: true,
        }))
      )
    } else {
      setMembers(
        data?.map((it: UserType) => ({
          matchReview: '',
          userId: it.userId,
          faceImage: it.faceImage,
          username: it.username,
          role: it.favoriteRoles || it.role,
          isSelected: true,
          performance: 5,
        }))
      )
    }
  }, [JSON.stringify({ value, data })])

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-lg font-normal">Team Performance</p>
        <Rating
          defaultValue={5}
          className="text-green-400"
          onChange={(_, e) => handleRatingAll(e)}
        />
      </div>
      <Accordion
        className="bg-transparent"
        expanded={expanded === 'members'}
        onChange={handleChange('members')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className="p-0 border-none"
        >
          <div className="flex w-full justify-between items-center">
            <p>
              <span className="text-light_green font-semibold">
                {members?.length}{' '}
              </span>
              Players
            </p>
            <div className="flex items-center space-x-2 mr-4">
              <motion.button
                animate={{
                  opacity: isSelectable ? 1 : 0,
                }}
                onClick={(e) => {
                  isSelectable && e.stopPropagation()
                  isSelectable && handleSelectAll(!isSelectAll)
                }}
                className={clsx('flex items-center text-light_green')}
              >
                Select all{' '}
                <Checkbox
                  checked={isSelectAll}
                  sx={{
                    '& .css-i4bv87-MuiSvgIcon-root': {
                      color: '#09E099',
                    },
                  }}
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsSelectable((prev) => !prev)
                }}
              >
                <SvgFilter />
              </motion.button>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="p-0">
          <div className="max-h-[calc(60vh)] overflow-y-auto pr-4">
            {(members || []).map(
              ({
                role,
                userId,
                isSelected,
                faceImage,
                username,
                performance,
              }: UserType) => (
                <Accordion key={userId} className="bg-transparent">
                  <AccordionSummary
                    className="p-0"
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <div className="flex items-center w-full">
                      <motion.div
                        animate={{
                          opacity: isSelectable ? 1 : 0,
                          width: isSelectable ? 70 : 0,
                        }}
                      >
                        <Checkbox
                          sx={{
                            '& .css-i4bv87-MuiSvgIcon-root': {
                              color: '#09E099',
                            },
                          }}
                          className="hover:bg-transparent"
                          checked={isSelected ? isSelected : false}
                          onChange={(_, e) => handleSelectMember(userId, e)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </motion.div>
                      <motion.div
                        animate={{ opacity: isSelected ? 1 : 0.4 }}
                        transition={{ duration: 0.15 }}
                        className={clsx(
                          'w-full h-full flex items-center justify-between pr-4'
                        )}
                      >
                        <div className="space-x-6 flex h-full items-center">
                          <img
                            className="w-20 h-20 rounded-lg object-cover"
                            src={safeHttpImage(faceImage)}
                          />
                          <div className="flex flex-col h-full py-2 justify-between text-gray-400 font-semibold">
                            <p>#{username}</p>
                            <p>{role}</p>
                          </div>
                        </div>
                        <Rating
                          value={performance}
                          className="text-green-400 flex"
                          onChange={(_, e) => handleRatingMember(userId, e)}
                        />
                      </motion.div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className="p-0">
                    <TextField
                      multiline
                      rows={2}
                      label="Match Review"
                      fullWidth
                      onChange={(e) =>
                        handleChangeReview(userId, e.target.value)
                      }
                    />
                  </AccordionDetails>
                </Accordion>
              )
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

function areEqual(prevProps: any, nextProps: any) {
  const isEqual = prevProps === nextProps
  if (isEqual) {
  }
  return isEqual
}

export default React.memo(TeamPerformance, areEqual)
