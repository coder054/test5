type TicketProps = {
  title: string
  value: string | number
}

const Ticket = ({ title, value }: TicketProps) => {
  return (
    <div className="bg-[#13161A] laptopM:h-[85px] mobileM:h-[65px] laptopM:w-[110px] mobileM:w-[90px] rounded-md flex flex-col items-center justify-center font-normal space-y-1">
      <span className="text-[#A2A5AD] laptopM:text-[14px] mobileM:text-[13px]">
        {title}
      </span>
      <span className="laptopM:text-[18px] mobileM:text-[13px]">{value}</span>
    </div>
  )
}

export default Ticket
