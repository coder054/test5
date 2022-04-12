type TicketProps = {
  title: string
  value: string | number
}

const Ticket = ({ title, value }: TicketProps) => {
  return (
    <div className="bg-[#13161A] h-[85px] w-[110px] rounded-md flex flex-col items-center justify-center font-normal space-y-1">
      <span className="text-[#A2A5AD] text-[14px]">{title}</span>
      <span className="text-[18px] ">{value}</span>
    </div>
  )
}

export default Ticket
