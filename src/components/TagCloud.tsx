export const TagCloud = ({
  tags,
}: {
  tags: {
    label: string
    link?: string
  }[]
}) => {
  return (
    <div className=" flex flex-wrap">
      {tags.map((o, index) => (
        <div
          key={index}
          className="text-[16px] leading-[150%] text-white 
        bg-DividerColor rounded-[4px] h-[32px] flex items-center justify-center px-4
        mr-3 mb-3
        "
        >
          {o.label}
        </div>
      ))}
    </div>
  )
}
