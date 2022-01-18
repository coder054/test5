import TextField from '@mui/material/TextField'
import clsx from 'clsx'

export const MyInput = ({
  placeholder,
  value,
  handleChange,
  className,
  password,
  ...rest
}: {
  placeholder: string
  value: string
  handleChange: any
  className?: string
  password?: boolean
  [rest: string]: any
}) => {
  const styles = clsx(className && className)
  return (
    <div className={`relative ${styles}`}>
      <input
        {...rest}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        type={password ? 'password' : ''}
        className="peer
        w-full
        placeholder:text-transparent
        h-[54px] px-[12px] py-[15px] rounded-[8px] border border-Dark-1 
    bg-[#1d1d24]    
    focus:border-Primary-Main focus:border-[2px]
      focus:outline-0
      focus:px-[11px]
      duration-200
      text-white
      text-[16px]
      leading-[150%]
    "
      />
      <label
        className="
        pointer-events-none
        duration-200    
        rounded-[2px]
        absolute
        bg-[#1d1d24]
        text-Grey
        text-[12px]
        leading-[20px]
        px-[5px]
        top-[-8px]
        left-[12px]
        
    
        peer-placeholder-shown:text-Grey        
         peer-placeholder-shown:text-[16px] 
         peer-placeholder-shown:leading-[24px] 
         peer-placeholder-shown:top-[15px] 
         peer-placeholder-shown:left-[7px] 
        
        peer-focus:text-Primary-Main
        peer-focus:text-[12px]
        peer-focus:leading-[20px]
        peer-focus:px-[5px]
        peer-focus:top-[-8px]
        peer-focus:left-[12px]"
      >
        {placeholder}
      </label>
    </div>
  )
}
