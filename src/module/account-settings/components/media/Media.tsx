import { notification } from 'antd'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
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

  const handleAddForm = () => {
    if (mediaForm.videoLinks && mediaForm.videoLinks.length <= 9) {
      let test = [...mediaForm.videoLinks]
      test.push({ ...addNewForm })
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

  const handleChangeMediaForm = (
    type: keyof MediaType,
    value: any,
    index: string
  ) => {
    let newArr = [...(mediaForm.videoLinks || [])]
    newArr[+index].url = value
    setMediaForm((prev) => ({ ...prev, [type]: newArr }))
  }

  const handleChangeSocialForm = (type: keyof SocialLinksType, value: any) => {
    setSocialForm((prev) => ({ ...prev, [type]: value }))
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
      ...mediaForm,
      videoLinks: reformMediaForm,
    }
    setAccount({ ...account, media: data })
    setIsLoading(true)
    await axios
      .patch(
        `users/${currentRoleName.toLowerCase()}/settings`,
        {
          media: data,
          socialLinks: {
            ...socialForm,
          },
        },
        {
          headers: {
            roleId: currentRoleId,
          },
        }
      )
      .then(() => {
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

  useEffect(() => {
    if (account) {
      setSocialForm((prev) => ({
        ...prev,
        facebook: account.socialLinks?.facebook,
        instagram: account.socialLinks?.instagram,
        tiktok: account.socialLinks?.tiktok,
        twitter: account.socialLinks?.twitter,
        veoHighlites: account.socialLinks?.veoHighlites,
        youtube: account.socialLinks?.youtube,
      }))
      if (account.media?.videoLinks && account.media?.videoLinks.length < 3) {
        const addArr = new Array(3 - account.media?.videoLinks.length).fill(
          addNewForm
        )
        const newArr = [...account.media?.videoLinks].concat(addArr)
        setMediaForm((prev) => ({
          ...prev,
          bodyImage: account.media?.bodyImage,
          faceImage: account.media?.faceImage,
          teamImage: account.media?.teamImage,
          videoLinks: newArr,
        }))
      } else {
        setMediaForm((prev) => ({
          ...prev,
          bodyImage: account.media?.bodyImage,
          faceImage: account.media?.faceImage,
          teamImage: account.media?.teamImage,
          videoLinks: account.media?.videoLinks,
        }))
      }
    }
  }, [account])

  return (
    <div className="space-y-6">
      <BackGround
        label="Media"
        form={
          <div className="space-y-7">
            {(mediaForm.videoLinks || []).map((form, index) => (
              <div key={index} className="flex items-center space-x-3">
                <MyInput
                  value={form.url}
                  onChange={(e) =>
                    handleChangeMediaForm(
                      'videoLinks',
                      e.target.value,
                      index.toString()
                    )
                  }
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
