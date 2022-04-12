import { get, isEmpty } from 'lodash'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  CarouselContext,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { createPortal } from 'react-dom'
import { Text } from 'src/components/Text'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useScreenWidth } from 'src/hooks/useScreenWidth'
import clsx from 'clsx'
import { IBiographyPlayer } from 'src/constants/types/biography.types'

export const TopVideos = ({ dataBio }: { dataBio: IBiographyPlayer }) => {
  const { screenWidth } = useScreenWidth()

  const data = useMemo(() => {
    return dataBio.topVideoLinks
  }, [dataBio])

  const visibleSlides = useMemo(() => {
    if (screenWidth < 640) {
      return 1
    } else if (screenWidth < 768) {
      return 2
    } else if (screenWidth < 1024) {
      return 3
    } else {
      return 4
    }
  }, [screenWidth])

  if (isEmpty(data)) {
    return null
  }

  return (
    <>
      <div className="flex items-center mt-[50px] ">
        <Text name="Header5" className="text-white mb-[16px] ">
          Top videos
        </Text>

        <div className="grow "></div>
        <div className="" id="btn-videos"></div>
      </div>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={60}
        totalSlides={data.length}
        visibleSlides={visibleSlides}
      >
        <VideosWrapper visibleSlides={visibleSlides} data={data} />
      </CarouselProvider>
    </>
  )
}

const VideosWrapper = ({
  visibleSlides,
  data,
}: {
  visibleSlides: number
  data: any[]
}) => {
  const [show, setShow] = useState(false)

  const carouselContext = useContext(CarouselContext)
  const [currentSlide, setCurrentSlide] = useState(
    get(carouselContext, 'state.currentSlide')
  )

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide)
    }
    carouselContext.subscribe(onChange)
    return () => carouselContext.unsubscribe(onChange)
  }, [carouselContext])

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <>
      <Slider>
        {data.map((video, index) => {
          return (
            <Slide key={'video' + index} index={index} className="">
              <a
                className="block sm:mr-4"
                key={index}
                href={video.url}
                target="_blank"
                rel="noreferrer"
              >
                <div key={index} className="cursor-pointer">
                  <img
                    src={video.thumbnailUrl}
                    className="rounded-[8px] w-full aspect-[1.78] object-cover mb-[12px] "
                    alt=""
                  />
                </div>
              </a>
            </Slide>
          )
        })}
      </Slider>
      {show &&
        createPortal(
          <>
            <ButtonBack className="cursor-auto">
              <svg
                className={clsx(
                  ` mr-[20px] `,
                  currentSlide <= 0
                    ? ' pointer-events-none fill-Grey '
                    : ' cursor-pointer fill-Green '
                )}
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.41 17.09L10.83 12.5L15.41 7.91L14 6.5L8 12.5L14 18.5L15.41 17.09Z" />
              </svg>
            </ButtonBack>
            <ButtonNext className="cursor-auto">
              <svg
                className={clsx(
                  ` mr-[20px] `,
                  currentSlide >= data.length - visibleSlides
                    ? ' pointer-events-none fill-Grey '
                    : ' cursor-pointer fill-Green '
                )}
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.59 17.09L13.17 12.5L8.59 7.91L10 6.5L16 12.5L10 18.5L8.59 17.09Z" />
              </svg>
            </ButtonNext>
          </>,
          window.document.getElementById('btn-videos')
        )}
    </>
  )
}
