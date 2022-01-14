import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { MyImage } from './MyImage'
import { Text } from './Text'
import { imgAvatar } from 'imports/images'

export const Card = () => {
  return (
    <div className="bg-[#202128cc] p-4 min-h-[82px] flex items-center ">
      <MyImage className="w-[50px] h-[50px] mr-2 " src={imgAvatar} />

      <div className=" mr-[120px] ">
        <Text className={'text-white'} name={'Header6'}>
          Devendra Banhart
        </Text>

        <Text name="Body2" className="text-Grey ">
          #Devendra Banhart
        </Text>
      </div>

      <Text name="body1" className="text-white mr-[80px] ">
        CDM
      </Text>
      <Text name="body1" className="text-white mr-[80px] ">
        HIF IF/PO7
      </Text>
      <Text name="body1" className="text-white mr-[80px] ">
        SE/Stockholm
      </Text>

      <div className="flex-grow "></div>

      <div className="flex items-start space-x-[20px] mr-[20px] ">
        <MyImage src={'/phone.svg'} className="w-[24px] h-[24px] " />
        <MyImage
          src={'/chat-bubble-outline.svg'}
          className="w-[24px] h-[24px] "
        />
        <MyImage
          src={'/keyboard-arrow-right.svg'}
          className="w-[24px] h-[24px] "
        />
      </div>
      <MyImage src={'/more-vert.svg'} className="w-[24px] h-[24px]" />
    </div>
  )
}
