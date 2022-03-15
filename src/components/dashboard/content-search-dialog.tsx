import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Link from 'next/link'
import queryString from 'query-string'
import type { FC } from 'react'
import {
  Badge,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { Search as SearchIcon } from '../../icons/search'
import { wait } from '../../utils/wait'
import { X as XIcon } from '../../icons/x'
import { Tip } from '../tip'
import PropTypes from 'prop-types'
import { axios } from 'src/utils/axios'
import { IUsersSearch } from 'src/constants/types/searchUsers.types'
import { getStr, truncateStr } from 'src/utils/utils'

interface ContentSearchProps {
  onClose?: () => void
  open?: boolean
}

const results = {
  Platform: [
    {
      description:
        'Provide your users with the content they need, exactly when they need it, by building a next-level site search experience using our AI-powered search API.',
      title: 'Level up your site search experience with our hosted API',
      path: 'Users / Api-usage',
    },
    {
      description:
        'Algolia is a search-as-a-service API that helps marketplaces build performant search experiences at scale while reducing engineering time.',
      title: 'Build performant marketplace search at scale',
      path: 'Users / Api-usage',
    },
  ],
  Resources: [
    {
      description:
        'Algolia’s architecture is heavily redundant, hosting every application on …',
      title: 'Using NetInfo API to Improve Algolia’s JavaScript Client',
      path: 'Resources / Blog posts',
    },
    {
      description:
        'Algolia is a search-as-a-service API that helps marketplaces build performant search experiences at scale while reducing engineering time.',
      title: 'Build performance',
      path: 'Resources / UI libraries',
    },
  ],
}

export const ContentSearchDialog: FC<ContentSearchProps> = (props) => {
  const searchInputRef = useRef(null)
  const { onClose, open, ...other } = props
  const [value, setValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [users, setUsers] = useState<IUsersSearch[]>(null)
  const limit = 30

  const handleSubmit = async (event): Promise<void> => {
    event.preventDefault()
    setShowResults(false)
    setIsLoading(true)
    // Do search here
    // here

    const getMembersWithKeyword = async (
      keyword: string
    ): Promise<{
      error: boolean
      data: IUsersSearch[]
    }> => {
      try {
        const params = {
          limit,
          startAfter: 0,
          sorted: 'asc',
          name: keyword,
        }
        const { data } = await axios.get(
          `/users?${queryString.stringify(params)}`
        )
        return {
          error: false,
          data,
        }
      } catch (error) {
        console.log('aaa getMembersWithKeyword error', error)
        return {
          error: true,
          data: null,
        }
      }
    }
    const { data, error } = await getMembersWithKeyword(value)
    if (error) {
      alert('Error searching users')
      setIsLoading(false)
      return
    }
    console.log('aaa data', data)
    setUsers(data)
    setIsLoading(false)
    setShowResults(true)
  }

  useEffect(() => {
    if (open === true) {
      setTimeout(() => {
        const el = document.getElementById('searchInputRef')
        if (el) {
          el.focus()
        }
      }, 300)
    }
  }, [open])

  const usersSafe = useMemo(() => {
    return users || []
  }, [users])

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open} {...other}>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Search</Typography>
        <IconButton color="inherit" onClick={onClose}>
          <XIcon fontSize="small" />
        </IconButton>
      </Box>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Tip message="Search by entering a keyword and pressing Enter" />
          <TextField
            id="searchInputRef"
            ref={searchInputRef}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            label="Search"
            onChange={(event): void => setValue(event.target.value)}
            placeholder="Search..."
            sx={{ mt: 3 }}
            value={value}
          />
        </form>
        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 3,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {showResults && (
          <>
            {/*  */}
            <div className="h-[12px] "></div>
            <div className=" flex ">
              <span className="text-Green mr-[8px] ">
                {usersSafe.length === limit
                  ? `${usersSafe.length}+`
                  : usersSafe.length}
              </span>
              <span className="text-Grey ">members found</span>
            </div>
            <div className="h-[12px] "></div>
            <div className="max-h-[300px] py-[4px] overflow-y-auto">
              {usersSafe.map((user, index) => {
                const firstLastNameUrl =
                  `${user?.firstName}.${user?.lastName}`
                    .replace(/\s/g, '')
                    .toLowerCase() || 'coach'
                const urlBio = `/biography/${user?.username}/${firstLastNameUrl}`

                return (
                  <Fragment key={user.username}>
                    <Link href={urlBio}>
                      <a className="block py-[4px] ">
                        <div key={index} className="flex w-full items-center ">
                          <img
                            src={user.faceImage}
                            className="w-[65px] h-[65px] object-cover rounded-[8px] mr-3"
                            alt=""
                          />
                          <div className=" w-[200px] ">
                            <div className="text-white font-semibold ">
                              {user.firstName} {user.lastName}{' '}
                            </div>
                            <div className="flex justify-between ">
                              <span className="text-Grey ">
                                #{user.username}
                              </span>
                              <span className="text-Grey ">
                                {getStr(user, 'favoriteRoles[0]')}
                              </span>
                            </div>

                            <div className="flex justify-between ">
                              <span className="text-white ">
                                {truncateStr(user.city || '', 11)}
                              </span>
                              <span className="text-white ">
                                {getStr(user, 'clubName')}{' '}
                              </span>
                            </div>
                          </div>
                          <div className="grow "></div>
                          <div className="text-white ">
                            <ArrowForwardIosIcon />
                          </div>
                          <div className="w-[8px] "></div>
                        </div>
                      </a>
                    </Link>
                    <div className="h-[16px] "></div>
                  </Fragment>
                )
              })}
            </div>
            {/*  */}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

ContentSearchDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
