import { Text } from 'src/components/Text'

export const BillingDetail = () => {
  return (
    <div className=" ">
      <div className="flex justify-between mb-[24px] ">
        <div className="mb-[12px] font-Roboto text-white font-semibold text-[18px] leading-[25px] ">
          Billing detail
        </div>

        <div className=" w-[80px] h-[37px] py-[6px] px-[12px] text-center flex items-center cursor-pointer ">
          <svg
            className="mr-[8px] "
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.2274 3.2275C12.3934 3.05558 12.592 2.91845 12.8116 2.82411C13.0312 2.72978 13.2674 2.68012 13.5064 2.67805C13.7454 2.67597 13.9825 2.72151 14.2037 2.81202C14.4249 2.90252 14.6259 3.03618 14.7949 3.20519C14.9639 3.37419 15.0975 3.57517 15.188 3.79638C15.2785 4.01759 15.3241 4.25462 15.322 4.49362C15.3199 4.73262 15.2703 4.96882 15.1759 5.18843C15.0816 5.40803 14.9445 5.60665 14.7726 5.7727L14.0589 6.4864L11.5137 3.9412L12.2274 3.2275ZM10.2411 5.2138L2.69995 12.7549V15.3001H5.24515L12.7872 7.759L10.2402 5.2138H10.2411Z"
              fill="#4654EA"
            />
          </svg>

          <Text name="Header6" className="text-Blue font-semibold ">
            Edit
          </Text>
        </div>
      </div>

      <div
        style={{
          boxShadow: 'inset 0px 0px 0px 1px #E6E8F0',
        }}
        className="bg-Dark-3 rounded-[8px] min-h-[100px] px-[1px] mb-[24px] "
      >
        {[
          { label: 'Billing name', value: 'John Doe' },
          { label: 'Card number', value: '**** 1111' },
          { label: 'Country', value: 'Germany' },
          { label: 'Zip / Portal code', value: '727272' },
        ].map((o, index) => (
          <div
            key={index}
            className="flex border-b border-Stroke last:border-b-0 py-[16px] px-[24px]"
          >
            <Text name="Subtitle2" className="text-white w-[180px] mr-[16px] ">
              {o.label}
            </Text>
            <Text name="Subtitle2" className="text-Grey ">
              {o.value}
            </Text>
          </div>
        ))}
      </div>

      <div className="mb-[48px] ">
        <Text name="Subtitle2" className="text-Grey inline-block ">
          We cannot refund once you purchased a subscription, but you can always
        </Text>
        <Text
          name="Subtitle2"
          className="text-Blue cursor-pointer inline-block ml-[4px] "
        >
          Cancel
        </Text>
      </div>

      <div className="flex ">
        <div className="flex-grow "></div>
        <div
          className="mr-2 rounded-[8px] bg-Blue cursor-pointer h-[38px] w-[130px] 
        flex justify-center items-center "
        >
          <Text name="Subtitle2" className="text-white ">
            Upgrade plan
          </Text>
        </div>
      </div>
    </div>
  )
}
