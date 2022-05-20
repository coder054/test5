import { useIdHead2HeadQuery } from 'src/atoms/biographyAtom'

export const Head2HeadButton = ({ userId }) => {
  const { idHead2Head, setIdHead2Head } = useIdHead2HeadQuery()
  return (
    <button
      onClick={() => {
        setIdHead2Head(userId)
      }}
      className="font-bold text-Red font-Inter text-[16px] leading-[150%] flex justify-center items-center h-[48px] border-[2px]  border-Red rounded-[8px] cursor-pointer"
    >
      Head 2 Head
    </button>
  )
}
