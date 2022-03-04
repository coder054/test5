import { MyImage } from './MyImage'
import clsx from 'clsx'

// const listComment = [
//   {
//     img: '/Ellipse 16.svg',
//     text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod t ',
//   },
// ]
type ListComment = {
  img: string
  text: string
}

interface CommentProps {
  listComment?: ListComment[]
  className?: string
}

export const Comments = ({ listComment, className }: CommentProps) => {
  const classNames = clsx(className && className)
  return (
    <div className={`${classNames}`}>
      {/* <div className="text-white font-semibold text-[24px] leading-[137%] mb-[25px] ">
        Comments
      </div> */}
      <div className=" ">
        {listComment.map((o, index) => (
          <div key={index} className=" mb-4 flex items-end  ">
            <MyImage
              className="
            rounded-[50%] mr-4
            w-[40px]
            h-[40px]
            flex-shrink-0
            "
              src={o.img}
            />

            <div
              style={{ borderRadius: '8px 8px 8px 0px' }}
              className="bg-[#030405] px-3 py-2 
            text-Grey text-[14px] leading-[157%]
            
            "
            >
              {o.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
