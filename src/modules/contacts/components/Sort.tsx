import { SortASCIcon, SortDESCIcon } from 'src/components/icons'

type SortProps = {
  onChange?: (value: 'asc' | 'desc') => void
  value?: 'asc' | 'desc'
}

export const Sort = ({ onChange, value }) => {
  const CLASS = 'w-[25px] h-[25px]'
  return (
    <div className="cursor-pointer">
      {value === 'asc' ? (
        <SortASCIcon onClick={() => onChange('desc')} className={CLASS} />
      ) : (
        <SortDESCIcon onClick={() => onChange('asc')} className={CLASS} />
      )}
    </div>
  )
}
