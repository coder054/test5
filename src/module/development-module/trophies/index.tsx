import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ModalShowImage, MyInput } from 'src/components'
import { ListImageVideo } from 'src/components/list-image-video'
import { MyButton } from 'src/components/MyButton'
import { MyCustomSelect } from 'src/components/MyCustomSelect'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MyModal } from 'src/components/MyModal'
import { MySelect } from 'src/components/MySelect'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { MyTextArea } from 'src/components/MyTextarea'
import { UploadMutilImageVideo } from 'src/components/upload-mutil-image-video'
import { PersonalAwardOption, TypeOfAwardOption } from 'src/constants/options'
import { TrophiesAndAwardsType } from 'src/constants/types'
import { ClubType } from 'src/constants/types/settingsType.type'
import { getToday } from 'src/hooks/functionCommon'
import { SvgCamera } from 'src/imports/svgs'
import { BackGround } from 'src/module/account-settings/common-components/Background'
import { InfiniteScrollClub } from 'src/module/account-settings/football/components/InfiniteScrollClub'
import { createTrophies } from 'src/service/biography-update'

interface FormValuesType {
  personalAward: string
  typeOfAward: string
  name: string
  country: any
  club: string
  date: string | Date | any
  description: string
  contractedClub: ClubType
}

export const Trophies = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [arrayFile, setArrayFile] = useState([])
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [newFile, setNewFile] = useState([])
  const [showUrl, setShowUrl] = useState('')
  const [images, setImages] = useState([])
  const [formValues, setFormValues] = useState<FormValuesType>({
    personalAward: '',
    typeOfAward: '',
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
      arena: '',
      city: '',
      clubId: '',
      clubName: '',
      country: '',
      logoUrl: '',
      nickName: '',
      websiteUrl: null,
    },
  })

  useEffect(() => {
    setArrayFile(newFile)
  }, [newFile])

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

  const setSelectedClub = (value: ClubType) => {
    setFormValues((prev) => ({
      ...prev,
      contractedClub: value,
      clubId: value.clubId,
      yourClub: value.clubName,
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
        clubId: formValues.contractedClub.clubId,
      },
      date: formValues.date,
      description: formValues.description,
      media: images as [{ type: string; url: string }],
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
            label="Personal Award"
            arrOption={PersonalAwardOption}
            onChange={(e) => handleChangeForm('personalAward', e.target.value)}
          />

          <MySelect
            label="Type of award"
            arrOption={TypeOfAwardOption}
            onChange={(e) => handleChangeForm('typeOfAward', e.target.value)}
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

          <InfiniteScrollClub
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
