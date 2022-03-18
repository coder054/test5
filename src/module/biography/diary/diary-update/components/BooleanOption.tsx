import clsx from 'clsx'

type BooleanOption = {
  label: string
  first: string
  second: string
  value: boolean
  onChange: (value: boolean) => void
}

export const BooleanOption = ({
  value,
  label,
  first,
  second,
  onChange,
}: BooleanOption) => {
  return (
    <div className="space-y-6">
      <p className="text-[16px] font-normal text-[#A2A5AD]">{label}</p>
      <div>
        <span
          onClick={() => onChange(true)}
          className={clsx(
            'text-white text-[14px] font-medium py-2 px-4 mr-2 mb-2 rounded-full hover:bg-[#09E099] cursor-pointer duration-150',
            value ? 'bg-[#09E099]' : 'bg-[#64748b] bg-opacity-[0.4]'
          )}
        >
          {first}
        </span>
        <span
          onClick={() => onChange(false)}
          className={clsx(
            'text-white text-[14px] font-medium py-2 px-4 mr-2 mb-2 rounded-full hover:bg-[#09E099] cursor-pointer duration-150',
            value ? 'bg-[#64748b] bg-opacity-[0.4]' : 'bg-[#09E099]'
          )}
        >
          {second}
        </span>
      </div>
    </div>
  )
}
