import clsx from 'clsx'
import { MiniLoading } from 'src/components/mini-loading'

type CounterProps = {
  withPlace?: string
  className?: string
  isLoading?: boolean
  count: number
  label: string
}

export const Counter = ({
  count,
  label,
  isLoading,
  className,
  withPlace,
}: CounterProps) => {
  return (
    <div className={clsx('flex items-center space-x-2 text-[16px]', className)}>
      <p className="text-[#09E099] font-medium">
        {isLoading ? <MiniLoading color="#09E099" size={18} /> : count}
      </p>
      <p className="text-[#A2A5AD] font-normal">
        {count !== 1 ? label + 's' : label}{' '}
        {withPlace ? 'in' + ' ' + withPlace : ''}
      </p>
    </div>
  )
}
