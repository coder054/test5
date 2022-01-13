import clsx from 'clsx'
import cls from './item-event-headline.module.css'
import Image from 'next/image'
import {
  IconClock,
  IconComment,
  IconFavorite,
  IconMoneyEuro,
  IconSharing,
} from 'imports/svgs'

interface ItemEventHeadlineProps {
  className?: string
  item?: any
}

export const ItemEventHeadline = ({
  className,
  item,
}: ItemEventHeadlineProps) => {
  const styles = clsx(className && className)

  return (
    <div
      className={clsx(styles, cls.item, 'h-[140px] rounded-[8px] float-left')}
    >
      <div className="w-[163px] h-full float-left">
        <Image
          src={item[0].background}
          alt=""
          className=" rounded-tl-[8px] rounded-bl-[8px]"
        />
      </div>
      <div className="w-1/4 h-full float-left ml-[23.67px] mr-[23.67px]">
        <div className="mt-[16px] h-1/2">
          <div className="float-left">
            <Image src={item[0].avatar} alt="" className="float-left" />
          </div>
          <div className="float-left">
            <p className="text-base text-[#FFFFFF] ml-[8px] mt-[3px]">
              #{item[0].fullName}
            </p>
            <div className="float-left">
              <div className="float-left mr-[4px] ml-[8px] mt-[4px]">
                <IconClock />
              </div>
              <span className="text-[12px] text-[#818389] float-left">
                {item[0].time}
              </span>
            </div>
          </div>
        </div>
        <div className="h-1/3 w-5/6 flex text-[14px] text-[#FFFFFF] mt-2">
          <div className="flex-1">
            <div className="float-left mr-[8px]">
              <IconFavorite />
            </div>
            <span className="float-left">{item[0].favorite}</span>
          </div>
          <div className="flex-1">
            <div className="float-left mr-[8px]">
              <IconComment />
            </div>
            <span>{item[0].comment}</span>
          </div>
          <div className="flex-1">
            <IconSharing />
          </div>
        </div>
      </div>
      <div className={`${cls.divider} float-left`}></div>
      <div className="w-1/3 h-full float-left">
        <p className="text-base text-[#818389] mt-[21px]">{item[0].content}</p>
      </div>
      <div className="w-[165px] h-full float-right bg-[#4654EA] rounded-tr-[8px] rounded-br-[8px] flex items-center">
        <div className="m-auto">
          <span
            className={`text-[#FFFFFF] text-[18px] float-left mr-[1.3px] ${cls.joinNow}`}
          >
            Join now / {item[0].price}
          </span>{' '}
          <div className="float-left mt-1.5">
            <IconMoneyEuro />
          </div>
        </div>
      </div>
    </div>
  )
}
