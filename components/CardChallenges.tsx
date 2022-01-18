import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { MyImage } from './MyImage'
import { Text } from './Text'
import { imgAvatar } from 'imports/images'

export const CardChallenges = () => {
  return (
    <div
      style={{
        padding: '0px 0px 32px',
        backdropFilter: 'blur(68px)',
      }}
      className="rounded-[8px] bg-[#202128cc] w-[347px]"
    >
      {/* /// image and headline */}

      <div className="h-[195px] w-full relative mb-5">
        <img
          src={'/image 3.png'}
          className="object-cover h-[195px] w-full absolute border left-0 top-0"
          alt=""
        />

        <div
          style={{
            background:
              'linear-gradient(180.5deg, rgba(0, 0, 0, 0) 47.46%, #000000 99.57%)',
          }}
          className="absolute inset-0 [borderRadius:8px_8px_0px_0px] h-[195px]"
        ></div>
      </div>

      <div className="mt-[119px] w-full p-4 absolute top-0 left-0 ">
        <Text name="body1" className="text-white ">
          Program headline 1
        </Text>

        <Text name="Caption" className="text-Grey">
          Program name
        </Text>
      </div>

      {/* /// small image and name, category... */}

      <div className=" flex mb-3 px-5 ">
        <img
          src={'/tonicrud.png'}
          className="w-10 h-10 object-cover mr-3 "
          alt=""
        />
        <div className="">
          <Text name="body1" className="text-white ">
            Toni Kroos
          </Text>
          <Text name="Caption" className="text-Grey">
            Category X / 8 Modules / xx Hours
          </Text>
        </div>
      </div>

      {/* /// description */}

      <Text name="Body2" className="text-white mb-6 px-[20px] ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>

      {/* /// icons at bottom */}
      <div className="flex px-5 ">
        <svg
          className="mr-1"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.8375 3.99243C15.89 3.04993 14.645 2.53076 13.33 2.53076C12.0942 2.53076 10.92 2.99076 10 3.8291C9.08003 2.99076 7.90669 2.53076 6.67002 2.53076C5.35502 2.53076 4.11002 3.04993 3.15919 3.99576C1.19836 5.96493 1.19919 9.04493 3.16086 11.0058L10 17.8449L16.8392 11.0058C18.8009 9.04493 18.8017 5.96493 16.8375 3.99243Z"
            fill="#09E099"
          />
        </svg>
        <Text name="Body2" className="text-Grey ">
          48
        </Text>

        <div className="spacer flex-grow "></div>

        <Text name="Body2" className="text-Grey mr-1 ">
          15
        </Text>

        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.6666 1.66675H3.33329C2.41663 1.66675 1.66663 2.41675 1.66663 3.33341V18.3334L4.99996 15.0001H16.6666C17.5833 15.0001 18.3333 14.2501 18.3333 13.3334V3.33341C18.3333 2.41675 17.5833 1.66675 16.6666 1.66675ZM16.6666 13.3334H4.99996L3.33329 15.0001V3.33341H16.6666V13.3334Z"
            fill="#818389"
          />
        </svg>

        <div className="spacer flex-grow "></div>

        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 13.4001C14.3667 13.4001 13.8 13.6501 13.3667 14.0417L7.425 10.5834C7.46667 10.3917 7.5 10.2001 7.5 10.0001C7.5 9.80008 7.46667 9.60842 7.425 9.41675L13.3 5.99175C13.75 6.40841 14.3417 6.66675 15 6.66675C16.3833 6.66675 17.5 5.55008 17.5 4.16675C17.5 2.78341 16.3833 1.66675 15 1.66675C13.6167 1.66675 12.5 2.78341 12.5 4.16675C12.5 4.36675 12.5333 4.55841 12.575 4.75008L6.7 8.17508C6.25 7.75842 5.65833 7.50008 5 7.50008C3.61667 7.50008 2.5 8.61675 2.5 10.0001C2.5 11.3834 3.61667 12.5001 5 12.5001C5.65833 12.5001 6.25 12.2417 6.7 11.8251L12.6333 15.2917C12.5917 15.4667 12.5667 15.6501 12.5667 15.8334C12.5667 17.1751 13.6583 18.2667 15 18.2667C16.3417 18.2667 17.4333 17.1751 17.4333 15.8334C17.4333 14.4917 16.3417 13.4001 15 13.4001Z"
            fill="#09E099"
          />
        </svg>

        <div className="spacer flex-grow "></div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.1667 2.5H5.83335C4.91669 2.5 4.17502 3.25 4.17502 4.16667L4.16669 17.5L10 15L15.8334 17.5V4.16667C15.8334 3.25 15.0834 2.5 14.1667 2.5ZM14.1667 15L10 13.1833L5.83335 15V4.16667H14.1667V15Z"
            fill="#09E099"
          />
        </svg>
      </div>
    </div>
  )
}
