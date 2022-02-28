import { notification } from 'antd'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { CustomUploadImage } from 'src/components/custom-upload-image'
import { MinusIcon, PlusIcon } from 'src/components/icons'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { settingsAtom } from '../../../../atoms/accountAndSettings'
import { MyButton } from '../../../../components/MyButton'
import { MyInput } from '../../../../components/MyInput'
import {
  MediaType,
  SocialLinksType,
} from '../../../../constants/types/settingsType.type'
import { axios } from '../../../../utils/axios'
import {
  detectURLName,
  detectValidURL,
  getYoutubeThumbnail,
} from '../../../../utils/utils'
import { BackGround } from '../common-components/Background'

const addNewForm = {
  source: '',
  thumbnailUrl: '',
  url: '',
}

export const Media = () => {
  const { currentRoleName, currentRoleId } = useAuth()

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

  // Upload Img
  const handleChangeImage = (value: string, type: keyof MediaType) => {
    setMediaForm((prev) => ({ ...prev, [type]: value }))
  }

  // Social link
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
      .patch(
        `users/${currentRoleName.toLowerCase()}/settings`,
        {
          ...data,
        },
        {
          headers: {
            roleId: currentRoleId,
          },
        }
      )
      .then(() => {
        setAccount({ ...account, ...data })
        notification['success']({
          message: 'Upload successfully',
        })
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
        notification['error']({
          message: 'Link is not valid',
        })
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
      <BackGround
        label="Media"
        form={
          <div className="space-y-7">
            <div className="sm:flex sm:justify-between sm:pb-2 ">
              <CustomUploadImage
                title="Face image"
                text="Add portrait photo of 480*640 pixels or more"
                width={185}
                height={140}
                className="border-[2px] border-gray-700 hover:border-white  duration-150"
                textClass="pt-8 px-9 font-medium"
                iconClass="pt-[18px]"
                value={mediaForm.faceImage}
                setImage={(value) => handleChangeImage(value, 'faceImage')}
              />
              <CustomUploadImage
                title="Body image"
                text="Add portrait photo of 480*640 pixels or more"
                width={185}
                height={140}
                className="border-[2px] border-gray-700 hover:border-white  duration-150"
                textClass="pt-8 px-9 font-medium"
                iconClass="pt-[18px]"
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
              onChange={(e) =>
                handleChangeSocialForm('facebook', e.target.value)
              }
              value={socialForm.facebook}
              label="Facebook link"
            />
            <MyInput
              onChange={(e) =>
                handleChangeSocialForm('twitter', e.target.value)
              }
              value={socialForm.twitter}
              label="Twitter link"
            />
            <MyInput
              onChange={(e) =>
                handleChangeSocialForm('youtube', e.target.value)
              }
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
        }
      />
      <MyButton
        onClick={handleSubmit}
        isLoading={isLoading}
        type="submit"
        label="Save"
      />
    </div>
  )
}
