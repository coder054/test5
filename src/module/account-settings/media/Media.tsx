import clsx from 'clsx'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import toast from 'react-hot-toast'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { CustomUploadImage } from 'src/components/custom-upload-image'
import { MinusIcon, PlusIcon } from 'src/components/icons'
import { MyButton } from 'src/components/MyButton'
import { MyInput } from 'src/components/MyInput'
import {
  MediaType,
  SocialLinksType,
} from 'src/constants/types/settingsType.type'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { axios } from 'src/utils/axios'
import {
  detectURLName,
  detectValidURL,
  getYoutubeThumbnail,
} from 'src/utils/utils'
import { BackGround } from '../common-components/Background'

const addNewForm = {
  source: '',
  thumbnailUrl: '',
  url: '',
}

export const Media = () => {
  const { currentRoleName } = useAuth()

  const [account, setAccount] = useAtom(settingsAtom)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [socialForm, setSocialForm] = useState<SocialLinksType>({
    facebook: '',
    instagram: '',
    tiktok: '',
    twitter: '',
    veoHighlites: '',
    youtube: '',
  })
  const [mediaForm, setMediaForm] = useState<MediaType>({
    bodyImage: '',
    faceImage: '',
    teamImage: '',
    videoLinks: [],
  })

  const handleChangeImage = (value: string, type: keyof MediaType) => {
    setMediaForm((prev) => ({ ...prev, [type]: value }))
  }

  const handleChangeSocialForm = (type: keyof SocialLinksType, value: any) => {
    setSocialForm((prev) => ({ ...prev, [type]: value }))
  }

  const handleAddForm = () => {
    if (mediaForm.videoLinks && mediaForm.videoLinks.length <= 9) {
      let test = [...mediaForm.videoLinks]
      test.push(addNewForm)
      setMediaForm((prev) => ({ ...prev, videoLinks: test }))
    }
  }

  const handleRemoveForm = (id: number) => {
    const newArr =
      mediaForm.videoLinks &&
      mediaForm.videoLinks.filter((_, index) => {
        return [id].indexOf(index) == -1
      })
    setMediaForm((prev) => ({ ...prev, videoLinks: newArr }))
  }

  const handleSubmit = async () => {
    const reformMediaForm = mediaForm.videoLinks?.map((link) => ({
      source: detectValidURL(link.url) ? detectURLName(link.url) : '',
      url: link.url,
      thumbnailUrl: detectValidURL(link.url)
        ? getYoutubeThumbnail(link.url, 'max')
        : link.url,
    }))
    const data = {
      media: { ...mediaForm, videoLinks: reformMediaForm },
      socialLinks: { ...socialForm },
    }
    setIsLoading(true)
    await axios
      .patch(`users/${currentRoleName.toLowerCase()}/settings`, {
        ...data,
      })
      .then(() => {
        setAccount({ ...account, ...data })
        toast.success('Successfully updated')
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
        toast.error('An error has occurred')
      })
  }

  const handleChangeMediaForm = useCallback(
    (value: any, index: number) => {
      let newArr = [...(mediaForm.videoLinks || [])]
      newArr[index].url = value
      setMediaForm((prev) => ({ ...prev, videoLinks: newArr }))
    },
    [mediaForm.videoLinks]
  )

  useEffect(() => {
    if (account) {
      setSocialForm({
        ...account.socialLinks,
      })
      if (account.media?.videoLinks && account.media?.videoLinks.length < 3) {
        const addArr = Array(3 - account.media?.videoLinks.length)
          .fill(0)
          .map(() => ({ source: '', thumbnailUrl: '', url: '' }))
        const newArr = account.media?.videoLinks.concat(addArr)
        setMediaForm({
          ...account.media,
          videoLinks: newArr,
        })
      } else {
        setMediaForm({
          ...account.media,
          videoLinks: account.media?.videoLinks,
        })
      }
    }
  }, [account])

  return (
    <div className="space-y-6">
      <BackGround label="Media" contentClass="xl:w-[400px]">
        <div className="space-y-7">
          <div
            className={clsx(
              'sm:flex sm:justify-between sm:pb-2',
              isMobile && 'space-y-4'
            )}
          >
            <CustomUploadImage
              title="Face image"
              text="Add portrait photo of 480*640 pixels or more"
              width={isMobile ? '100%' : 185}
              height={isMobile ? 160 : 140}
              className="border-[2px] border-gray-700 hover:border-white  duration-150"
              textClass="pt-8 px-9 font-medium"
              iconClass={clsx(isMobile ? 'pt-[38px]' : 'pt-[18px]')}
              value={mediaForm.faceImage}
              setImage={(value) => handleChangeImage(value, 'faceImage')}
            />
            <CustomUploadImage
              title="Body image"
              text="Add portrait photo of 480*640 pixels or more"
              width={isMobile ? '100%' : 185}
              height={isMobile ? 160 : 140}
              className="border-[2px] border-gray-700 hover:border-white  duration-150"
              textClass="pt-8 px-9 font-medium"
              iconClass={clsx(isMobile ? 'pt-[38px]' : 'pt-[18px]')}
              value={mediaForm.bodyImage}
              setImage={(value) => handleChangeImage(value, 'bodyImage')}
            />
          </div>
          {(mediaForm.videoLinks || []).map((form, index) => (
            <div key={index} className="flex items-center space-x-3">
              <MyInput
                value={form.url}
                onChange={(e) => handleChangeMediaForm(e.target.value, index)}
                label={`Video link ${index + 1}`}
              />
              {index === 2 && (
                <span
                  onClick={handleAddForm}
                  className="active:border-2 active:border-[#6B7280] border-2 border-[#202128cc] rounded-full duration-150 cursor-pointer"
                >
                  <PlusIcon />
                </span>
              )}
              {index >= 3 && (
                <span
                  onClick={() => handleRemoveForm(index)}
                  className="active:border-2 active:border-[#6B7280] border-2 border-[#202128cc] rounded-full duration-150 cursor-pointer"
                >
                  <MinusIcon />
                </span>
              )}
            </div>
          ))}
          <MyInput
            onChange={(e) =>
              handleChangeSocialForm('instagram', e.target.value)
            }
            value={socialForm.instagram}
            label="Instagram link"
          />
          <MyInput
            onChange={(e) => handleChangeSocialForm('facebook', e.target.value)}
            value={socialForm.facebook}
            label="Facebook link"
          />
          <MyInput
            onChange={(e) => handleChangeSocialForm('twitter', e.target.value)}
            value={socialForm.twitter}
            label="Twitter link"
          />
          <MyInput
            onChange={(e) => handleChangeSocialForm('youtube', e.target.value)}
            value={socialForm.youtube}
            label="Youtube channel"
          />
          <MyInput
            onChange={(e) =>
              handleChangeSocialForm('veoHighlites', e.target.value)
            }
            value={socialForm.veoHighlites}
            label="Veo highlight link"
          />
          <MyInput
            onChange={(e) => handleChangeSocialForm('tiktok', e.target.value)}
            value={socialForm.tiktok}
            label="Tiktok link"
          />
          <CustomUploadImage
            title="Existing Team Image"
            text="Add photo"
            width={'100%'}
            height={160}
            className="border-[2px] border-gray-700 hover:border-white  duration-150"
            textClass="pt-8 px-9 font-medium"
            iconClass="pt-[45px]"
            setImage={(value) => handleChangeImage(value, 'teamImage')}
            value={mediaForm.teamImage}
          />
        </div>
      </BackGround>
      <MyButton
        onClick={handleSubmit}
        isLoading={isLoading}
        type="submit"
        label="Save"
      />
    </div>
  )
}
