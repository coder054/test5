import { useEffect, useState } from 'react'
import { MyInput, MyInputChips } from 'src/components'
import { ListImageVideo } from 'src/components/list-image-video'
import { LocationSearchInput } from 'src/components/location-search-input'
import { MyTextArea } from 'src/components/MyTextarea'
import { UploadMutilImageVideo } from 'src/components/upload-mutil-image-video'
import { SvgFeedUpdate, SvgX } from 'src/imports/svgs'
import { MySwitchButton } from 'src/components/MySwitchButton'
import { Button } from 'src/components/Button'
import { PostFeed } from './types'
import { useMutation, useQueryClient } from 'react-query'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import { createPlainPost } from 'src/service/feed/news.service'
import toast from 'react-hot-toast'

interface ModalFeedProps {
  setIsOpenModal?: (value: boolean) => void
}

interface FormValueType {
  headline: string
  text: string
  mediaLinks: { type: string; url: string }[]
  location: string
}

interface SwitchValueType {
  zporter: string
  instagram: string
  facebook: string
  snapchat: string
  twitter: string
}

export const ModalFeed = ({ setIsOpenModal }: ModalFeedProps) => {
  const queryClient = useQueryClient()
  const [tags, setTags] = useState<string[]>([])
  const [arrayFile, setArrayFile] = useState([])
  const [medias, setMedias] = useState([])
  const [formValues, setFormValues] = useState<FormValueType>({
    headline: '',
    text: '',
    mediaLinks: [{ type: '', url: '' }],
    location: '',
  })
  const [valueSwitch, setValueSwitch] = useState<SwitchValueType>({
    zporter: '',
    instagram: '',
    facebook: '',
    snapchat: '',
    twitter: '',
  })

  const { isLoading: loading, mutate: postFeed } = useMutation(
    [QUERIES_FEED.FEED_CREATE_PLAIN_POST],
    createPlainPost,
    {
      onSuccess: (res) => {
        toast.success(res?.data)
        setIsOpenModal(false)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST_FRIENDS)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST_ALL)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST_YOURS)
      },
    }
  )

  useEffect(() => {
    setMedias([])
    arrayFile &&
      arrayFile.map((item) => {
        if (item.includes('mp4')) {
          setMedias((prev) => [...prev, { type: 'VIDEO', url: item }])
        } else {
          setMedias((prev) => [...prev, { type: 'IMAGE', url: item }])
        }
      })
  }, [arrayFile])

  const handleChangeForm = (type: keyof FormValueType, value: string) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleChangeSwitch = (type: keyof SwitchValueType, value: string) => {
    setValueSwitch((prev) => ({ ...prev, [type]: value }))
  }

  const handlePost = (e) => {
    e.preventDefault()
    const valuePost: PostFeed = {
      headline: formValues.headline,
      text: formValues.text,
      mediaLinks: medias,
      friendTags: tags,
      location: formValues.location,
    }

    try {
      postFeed(valuePost)
    } catch (error) {}
  }

  return (
    <div className="p-[32px]">
      <div
        className="float-right cursor-pointer"
        onClick={() => {
          setIsOpenModal(false)
        }}
      >
        <SvgX className={'w-[20px] h-[20px]'} />
      </div>

      <div className="w-full">
        <div className="mx-auto w-[54px] pt-[32px]">
          <SvgFeedUpdate />
        </div>
      </div>

      <p className="text-[24px] text-center mt-[16px]">Feed update</p>

      <div className="space-y-6">
        <MyInput
          label="Headline"
          className="mt-[32px]"
          value={formValues.headline}
          onChange={(e) => handleChangeForm('headline', e.target.value)}
        />

        <MyTextArea
          label="Text"
          value={formValues.text}
          onChange={(e) => handleChangeForm('text', e.target.value)}
        />

        <MyInputChips
          label="Friend tags"
          labelClass="text-[#A2A5AD]"
          value={tags}
          setTags={setTags}
        />

        <div
          className={`w-full flex ${
            !!arrayFile ? 'mb-[12.5px]' : ''
          } mt-[11.75px]`}
        >
          <UploadMutilImageVideo
            image
            arrayFiles={arrayFile}
            setArrayFiles={setArrayFile}
          />
          <div className="ml-[31px]">
            <UploadMutilImageVideo
              arrayFiles={arrayFile}
              setArrayFiles={setArrayFile}
            />
          </div>
        </div>

        <ListImageVideo
          arrayFile={arrayFile}
          setArrayFile={setArrayFile}
          // setIsOpenModal={setIsOpenModalImg}
        />

        <LocationSearchInput
          setCity={(value) => {
            setFormValues((prev) => ({ ...prev, location: value }))
          }}
          feed
        />

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            Zporter friends feed
            <MySwitchButton
              checked
              name="zporter"
              onChange={(e) => handleChangeSwitch('zporter', e.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex">
          <div className="flex-1 mr-[12px]" onClick={handlePost}>
            <Button
              isLoading={loading}
              label="Post"
              type="button"
              labelClass="text-[15px]"
              className="bg-[#4654EA] rounded-[8px] w-full h-[48px]"
            />
          </div>
          <div className="flex-1 ml-[12px]">
            <Button
              label="Cancel"
              type="button"
              className=" rounded-[8px] w-full h-[48px] border border-[#10B981]"
              labelClass="text-[#10B981] text-[15px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
