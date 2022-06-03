import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { NewProviderType } from 'src/constants/types'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import {
  getListNewProvider,
  subscribeProvider,
} from 'src/service/feed/news.service'
import { SvgAddSmall, SvgFollownews } from 'src/imports/svgs'
import { useState } from 'react'
import ConfirmModal from 'src/modules/contacts/components/modals/ModalDelete'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

var settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return <div className={className} onClick={onClick}></div>
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return <div className={className} onClick={onClick}></div>
}

export const ListItemSlick = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [nameNew, setNameNew] = useState<string>('')
  const [providerId, setProviderId] = useState<string>('')

  const { isLoading: loadingProvider, data: dataProvider } = useQuery(
    [QUERIES_FEED.FEED_NEW_PROVIDER],
    getListNewProvider,
    {
      onSuccess: (res) => {},
    }
  )

  const { isLoading: loadingSubscribe, mutate: subScribe } = useMutation(
    [QUERIES_FEED.FEED_SUBSCRIBE_PROVIDER],
    subscribeProvider,
    {
      onSuccess: (res) => {
        toast.success(res.data)
        setOpenModal(false)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_PROVIDER)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST)
      },
    }
  )

  const handleConfirmFollow = () => {
    try {
      subScribe(providerId)
    } catch (error) {}
  }

  return (
    <div className="w-full h-[88px] mb-6 bg-[#202128cc] rounded-[8px] ">
      <Slider {...settings}>
        {(dataProvider?.data || []).map((item: NewProviderType) => (
          <div className="h-[88px] flex justify-center items-center">
            <div className="w-[100px] text-center truncate">
              <div
                className={`w-[40px] h-[40px] mx-auto cursor-pointer ${
                  !item?.isFollowed ? 'relative' : ''
                }`}
              >
                <img
                  onClick={() => {
                    router.push({
                      pathname: `feed/news/${item?.providerId}`,
                      query: {
                        providerId: item?.providerId,
                        typeOfProvider: item?.typeOfProvider,
                      },
                    })
                  }}
                  src={item?.logo || ''}
                  className={`w-[40px] h-[40px] rounded-full mx-auto ${
                    !item?.isFollowed ? 'opacity-20 absolute' : ''
                  }`}
                />
                {!item?.isFollowed && (
                  <div
                    className="w-[40px] h-[40px] flex ml-[8px] items-center absolute"
                    onClick={() => {
                      setOpenModal(true)
                      setNameNew(item?.name)
                      setProviderId(item?.providerId)
                    }}
                  >
                    <SvgAddSmall active="#ffffff" />
                  </div>
                )}
              </div>
              <span className="mt-[4px]" title={item?.name}>
                {item?.name}
              </span>
            </div>
          </div>
        ))}
      </Slider>

      <ConfirmModal
        label="Follow news"
        content={
          <div className="text-center">
            <span>You have not been following </span>{' '}
            <span className="text-[#09E099]">{nameNew}</span>{' '}
            <span>yet. Would you like to follow this news provider?</span>
          </div>
        }
        icon={<SvgFollownews />}
        actionLabel="Follow"
        isOpen={openModal}
        onClose={setOpenModal}
        onSubmit={handleConfirmFollow}
        actionLabelClass="bg-[#4654EA]"
        followNews
        isLoading={loadingSubscribe}
      />
    </div>
  )
}
