import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ModalShowImage, MyInput } from 'src/components'
import { ListImageVideo } from 'src/components/list-image-video'
import { MyButton } from 'src/components/MyButton'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MyModal } from 'src/components/MyModal'
import { MySelect } from 'src/components/MySelect'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { MyTextArea } from 'src/components/MyTextarea'
import { UploadMutilImageVideo } from 'src/components/upload-mutil-image-video'
import {
  PersonalAwardOption,
  TypeOfPersonalAwardOption,
  TypeOfTeamTrophyOption,
} from 'src/constants/options'
import { TrophiesAndAwardsType } from 'src/constants/types'
import { ClubConnectedType } from 'src/constants/types/settingsType.type'
import { getToday } from 'src/hooks/functionCommon'
import {
  createTrophies,
  getProfilePlayer,
} from 'src/service/dashboard/biography-update'
import { BackGround } from 'src/modules/account-settings/common-components/Background'
import { InfiniteScrollClubConnected } from 'src/modules/account-settings/football/components/InfiniteScrollClubConnected'
import dayjs from 'dayjs'

interface FormValuesType {
  personalAward: string
  typeOfAward: string
  name: string
  country: any
  club: string
  date: string | Date | any
  description: string
  contractedClub: ClubConnectedType
}

export const Trophies = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [arrayFile, setArrayFile] = useState([])
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [newFile, setNewFile] = useState([])
  const [showUrl, setShowUrl] = useState('')
  const [images, setImages] = useState([])
  const [formValues, setFormValues] = useState<FormValuesType>({
    personalAward: 'AWARD',
    typeOfAward: 'POM',
    name: '',
    country: {
      alpha2Code: '',
      alpha3Code: '',
      flag: '',
      name: '',
      phoneCode: '',
      region: '',
    },
    club: '',
    date: getToday(),
    description: '',
    contractedClub: {
      careerId: '',
      club: {
        city: '',
        clubId: '',
        clubName: '',
        logoUrl: '',
      },
      connectedClubType: '',
      fromTime: '',
      toTime: '',
    },
  })

  useEffect(() => {
    setArrayFile(newFile)
  }, [newFile])

  useEffect(() => {
    const getProfile = async () => {
      try {
        await getProfilePlayer().then((data) => {
          setFormValues((prev) => ({
            ...prev,
            country: data.data.profile.birthCountry,
            contractedClub: data.data.playerCareer.contractedClub,
          }))
        })
      } catch (error) {}
    }

    getProfile()
  }, [])

  useEffect(() => {
    arrayFile.forEach((item) => {
      setImages((prev) => [
        ...prev,
        {
          type: 'IMAGE',
          url: item,
        },
      ])
    })
  }, [arrayFile])

  const handleShow = (url: string) => {
    setIsOpenModal(true)
    setShowUrl(url)
  }

  const handleChangeForm = (type: keyof FormValuesType, value: string) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const setSelectedClub = (value: ClubConnectedType) => {
    setFormValues((prev) => ({
      ...prev,
      contractedClub: value,
      clubId: value?.club?.clubId,
      clubName: value?.club?.clubName,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const vaueUpdate: TrophiesAndAwardsType = {
      achievementType: formValues.personalAward,
      trophyType: 'SERIE',
      name: formValues.name,
      country: formValues.country,
      connectedClub: {
        connectedClubType: '',
        careerId: '',
        clubId: formValues.contractedClub?.club?.clubId,
      },
      date: formValues.date,
      description: formValues.description,
      media: images as [{ type: string; url: string }],
    }

    if (!formValues?.contractedClub?.club?.clubName) {
      toast.error('Club is empty.')
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      return
    }

    if (
      formValues?.contractedClub?.fromTime &&
      formValues?.contractedClub?.toTime &&
      (dayjs(formValues?.contractedClub?.fromTime).unix() * 1000 >
        dayjs(formValues?.date).unix() * 1000 ||
        dayjs(formValues?.contractedClub?.toTime).unix() * 1000 <
          dayjs(formValues?.date).unix() * 1000)
    ) {
      toast.error('Time is not valid.')
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      return
    }

    try {
      createTrophies(vaueUpdate).then((data) => {
        if (data.status === 201) {
          setLoading(false)
          window.scroll(0, 0)
          toast.success(data.data)
        }
      })
    } catch (error) {}
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-5">
      <BackGround
        label="Trophies & Awards"
        className="2xl:w-3/5"
        contentClass="xl:w-[600px]"
      >
        <div className="space-y-7">
          <p className="text-white bg-[#13161A] laptopM:py-[10px] laptopM:pl-[10px] laptopM:pr-[20px] mobileM:p-[10px] rounded-[8px]">
            Add your Personal Awards and Team Trophies to your Biography
          </p>

          <MySelect
            label=""
            arrOption={PersonalAwardOption}
            onChange={(e) => handleChangeForm('personalAward', e.target.value)}
            value={formValues.personalAward}
            // defauleValue="AWARD"
          />

          <MySelect
            label=""
            arrOption={
              formValues.personalAward === 'AWARD'
                ? TypeOfPersonalAwardOption
                : TypeOfTeamTrophyOption
            }
            onChange={(e) => handleChangeForm('typeOfAward', e.target.value)}
            value={formValues.typeOfAward}
          />

          <MyInput
            label="Name"
            onChange={(e) => handleChangeForm('name', e.target.value)}
          />

          <MySelectCountry
            label="Country"
            onChange={(_, value) => handleChangeForm('country', value)}
            value={formValues.country}
          />

          <InfiniteScrollClubConnected
            label="Club"
            value={formValues.contractedClub}
            handleSetClub={setSelectedClub}
          />

          <MyDatePicker
            label="Date"
            onChange={(e) => handleChangeForm('date', e)}
            value={formValues.date}
            maxDate={dayjs(getToday()).toDate()}
          />

          <MyTextArea
            placeholder="Description"
            onChange={(e) => handleChangeForm('description', e.target.value)}
            // value={formValues.strengths}
          />
          <UploadMutilImageVideo
            image
            arrayFiles={arrayFile}
            setArrayFiles={setArrayFile}
          />

          <ListImageVideo
            arrayFile={arrayFile}
            setArrayFile={setArrayFile}
            setIsOpenModal={setIsOpenModal}
            handleShow={handleShow}
            setNewFile={setNewFile}
            newFile={newFile}
          />
        </div>
      </BackGround>
      <MyButton
        onClick={handleSubmit}
        isLoading={loading}
        type="submit"
        label="Save"
        className="mt-[24px] mb-[181px]"
      />
      <MyModal width={751} show={isOpenModal} setShow={setIsOpenModal}>
        <ModalShowImage url={showUrl} setIsOpenModal={setIsOpenModal} />
      </MyModal>
    </div>
  )
}
