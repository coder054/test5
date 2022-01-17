import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

var settings = {
  dots: true,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 17,
  slidesToScroll: 1,
}

const arr = [
  {
    img: '/feed/Avatar.svg',
    ird: 1,
  },
  {
    img: '/feed/Avatar.svg',
    id: 2,
  },
  {
    img: '/feed/Avatar.svg',
    id: 3,
  },
  {
    img: '/feed/Avatar.svg',
    id: 4,
  },
  {
    img: '/feed/Avatar.svg',
    id: 5,
  },
  {
    img: '/feed/Avatar.svg',
    id: 6,
  },
  {
    img: '/feed/Avatar.svg',
    id: 7,
  },
  {
    img: '/feed/Avatar.svg',
    id: 8,
  },
  {
    img: '/feed/Avatar.svg',
    id: 9,
  },
  {
    img: '/feed/Avatar.svg',
    id: 10,
  },
  {
    img: '/feed/Avatar.svg',
    id: 11,
  },
  {
    img: '/feed/Avatar.svg',
    id: 12,
  },
  {
    img: '/feed/Avatar.svg',
    id: 13,
  },
  {
    img: '/feed/Avatar.svg',
    id: 14,
  },
  {
    img: '/feed/Avatar.svg',
    id: 15,
  },
  {
    img: '/feed/Avatar.svg',
    id: 16,
  },
  {
    img: '/feed/Avatar.svg',
    id: 17,
  },
  {
    img: '/feed/Avatar.svg',
    id: 18,
  },
  {
    img: '/feed/Avatar.svg',
    id: 19,
  },
  {
    img: '/feed/Avatar.svg',
    id: 20,
  },
  {
    img: '/feed/Avatar.svg',
    id: 21,
  },
  {
    img: '/feed/Avatar.svg',
    id: 22,
  },
]

export const FootballersSlider = () => {
  return (
    <div className="w-[1078px] h-[60px] mb-6 bg-[#202128cc] rounded-[8px] ">
      <Slider {...settings}>
        {arr.map((o, index) => (
          <div
            onClick={() => {
              alert(o.id)
            }}
            key={index}
            className=" 
          
            w-[72px] h-[40px]
            mt-[12px] mb-[8px]
            text-center
          "
          >
            <Image src={o.img} width={40} height={40} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  )
}
