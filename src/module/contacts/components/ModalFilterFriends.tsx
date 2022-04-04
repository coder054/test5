import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { chain, isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import type { FC } from 'react'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { notiToast } from 'src/components/common/Toast'
import { Loading } from 'src/components/loading/loading'
import { IUsersSearch } from 'src/constants/types/searchUsers.types'
import { SearchIcon } from 'src/icons/search'
import { XIcon } from 'src/icons/x'
import { axios } from 'src/utils/axios'
import { getErrorMessage, getStr, truncateStr } from 'src/utils/utils'
import { useDebounce } from 'use-debounce'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { InfiniteScrollClub } from 'src/module/account-settings/football/components/InfiniteScrollClub'
import { optionAllCountry } from 'src/constants/mocks/countries.constants'
import { optionAllClub } from 'src/constants/mocks/clubs.constans'

interface ContentSearchProps {
  onClose?: () => void
  open?: boolean
  country: any
  setCountry: any
  contractedClub: any
  setContractedClub: any
  role: any
  setRole: any
  getListContact: any
}

// here aaa1 declare ModalFilterFriends
export const ModalFilterFriends: FC<ContentSearchProps> = (props) => {
  const searchInputRef = useRef(null)
  const {
    onClose,
    open,
    country,
    setCountry,
    contractedClub,
    setContractedClub,
    role,
    setRole,
    getListContact,
    ...other
  } = props

  useEffect(() => {
    console.log('aaa contractedClub: ', contractedClub)
  }, [contractedClub])

  useEffect(() => {
    console.log('aaa country: ', country)
  }, [country])

  const setSelectedClub = (value) => {
    setContractedClub
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={() => {
        onClose()
      }}
      open={open}
      {...other}
    >
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
        <Typography variant="h6">Filter your friends</Typography>
        <IconButton color="inherit" onClick={onClose}>
          <XIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          height: 500,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          {/* // here aaa1 MySelectCountry */}
          <div className="mb-[24px] ">
            <MySelectCountry
              defauleValue={optionAllCountry}
              isShowOptionAll={true}
              label="Select Country"
              onChange={(_, value) => {
                setCountry(value)
              }}
              value={country}
              className="mt-[24px]"
              errorMessage={''}
            />
          </div>

          <div className="mb-[24px] ">
            <InfiniteScrollClub
              label="Your Club"
              value={contractedClub}
              handleSetClub={setSelectedClub}
              errorMessage={''}
              isHideAddNewClub={true}
            />
          </div>

          <div className="mb-[24px] ">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Role</InputLabel>

              <Select
                fullWidth
                label="Role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value)
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Player">Player</MenuItem>
                <MenuItem value="Coach">Coach</MenuItem>
              </Select>
            </FormControl>
          </div>
        </form>
        {/*  */}

        <div className="h-[16px] "></div>

        {/*  */}
      </DialogContent>

      <div className="flex mt-4 px-[24px] mb-[20px] ">
        <Button
          onClick={() => {
            setCountry({
              name: 'Sweden',
              alpha2Code: 'SE',
              alpha3Code: 'SWE',
              region: 'Europe',
              flag: 'https://res.cloudinary.com/zporter-media-cloud/image/upload/v1626939466/country-flags/SWE.png',
              phoneCode: '+46',
            })
            setContractedClub(optionAllClub)
            setRole('All')
          }}
          fullWidth
          size="large"
          sx={{ mr: 2 }}
          variant="outlined"
        >
          Reset
        </Button>
        <Button
          onClick={async () => {
            getListContact(1)
            onClose()
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          Filter
        </Button>
      </div>
    </Dialog>
  )
}

const ItemUser = ({ user, listChecked, setListChecked }) => {
  return (
    <Fragment key={user.username}>
      <div className="flex w-full items-center ">
        <img
          src={user.faceImage}
          className="w-[65px] h-[65px] object-cover rounded-[8px] mr-3"
          alt=""
        />
        <div className=" w-[200px] ">
          <div className="text-white font-semibold ">
            {user.firstName} {user.lastName}
          </div>
          <div className="flex justify-between ">
            <span className="text-Grey ">#{user.username}</span>
            <span className="text-Grey ">
              {getStr(user, 'favoriteRoles[0]')}
            </span>
          </div>

          <div className="flex justify-between ">
            <span className="text-white ">
              {truncateStr(user.city || '', 11)}
            </span>
            <span className="text-white ">{getStr(user, 'clubName')} </span>
          </div>
        </div>
        <div className="grow "></div>
        <div className="">
          <Checkbox
            checked={listChecked.map((o) => o.userId).includes(user.userId)}
            onChange={(event) => {
              // if currently checked
              if (listChecked.map((o) => o.userId).includes(user.userId)) {
                let findIndex = listChecked.findIndex((o) => {
                  return o.userId === user.userId
                })
                const listCheckedClone = [...listChecked]
                listCheckedClone.splice(findIndex, 1)
                setListChecked(listCheckedClone)
              } else {
                // if currently unchecked
                setListChecked([...listChecked, user])
              }
            }}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
        <div className="w-[8px] "></div>
      </div>
      <div className="h-[16px] "></div>
    </Fragment>
  )
}

ModalFilterFriends.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
