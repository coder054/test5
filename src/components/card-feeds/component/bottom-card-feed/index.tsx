import { SvgComment, SvgFavorite, SvgSave, SvgShare } from 'src/imports/svgs'
import { diaries } from '../../constants'
import { Text } from 'src/components/Text'

interface BottomCardFeedProps {
  typeOfPost?: string
  countLike?: number
  countComment?: number
  isLiked?: boolean
  isSaved?: boolean
}

export const BottomCardFeed = ({
  typeOfPost,
  isLiked,
  countLike,
  countComment,
  isSaved,
}: BottomCardFeedProps) => {
  return (
    <div
      className={`flex px-5 ${
        typeOfPost === diaries ? 'mt-[4px]' : 'mt-[32px]'
      }`}
    >
      <div className="flex-1 float-left">
        <div className="flex float-left">
          <div
            className="hover:scale-110 duration-150"
            // onClick={() =>
            //   handleClickFavorite(
            //     card?.postId as string,
            //     card?.typeOfPost as string
            //   )
            // }
          >
            <SvgFavorite active={isLiked} />
          </div>
          <Text name="Body2" className="text-Grey ">
            {countLike as number}
          </Text>
        </div>

        <div className="flex ml-[64px]">
          <Text name="Body2" className="text-Grey mr-1 ">
            {countComment as number}
          </Text>
          <SvgComment />
        </div>
      </div>

      <div className="flex-row-reverse hover:scale-110 duration-150 pr-[16px]">
        <SvgShare />
      </div>
      <div
        className="flex-row-reverse hover:scale-110 duration-150 mt-[2px] cursor-pointer"
        // onClick={handleSave}
      >
        <SvgSave fill={`${isSaved ? '#09E099' : ''}`} />
      </div>
    </div>
  )
}
