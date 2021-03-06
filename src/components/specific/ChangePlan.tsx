import { Text } from 'src/components/Text'

export const ChangePlan = () => {
  return (
    <div className=" ">
      <div className="font-Roboto font-semibold text-[18px] leading-[25px] text-white mb-[8px] ">
        Change plan
      </div>

      <div className="text-Grey font-medium font-Roboto text-[14px] leading-[22px] mb-[24px] ">
        You can upgrade and downgrade whenever you want
      </div>

      <div className="grid grid-cols-3 gap-x-[24px]  ">
        {[
          {
            label: 'STARTUP',
            price: 0,
            isUsing: true,
            icon: (
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.6744 0.492981L31.9038 5.55771C32.117 5.67468 32.2944 5.84498 32.4178 6.05102C32.5413 6.25713 32.6064 6.49154 32.6064 6.73031C32.6064 6.96907 32.5413 7.20348 32.4178 7.4096C32.2944 7.61564 32.117 7.78594 31.9038 7.9029L22.6745 12.9679C22.0854 13.2911 21.4212 13.4609 20.7456 13.4609C20.0698 13.4609 19.4056 13.2911 18.8166 12.9679L9.5873 7.9029C9.37415 7.78594 9.1967 7.61564 9.0732 7.4096C8.94971 7.20348 8.8846 6.96907 8.8846 6.73031C8.8846 6.49154 8.94971 6.25713 9.0732 6.05102C9.1967 5.84498 9.37415 5.67468 9.5873 5.55771L18.8166 0.492981C19.4056 0.169739 20.0698 -5.72205e-06 20.7456 -5.72205e-06C21.4212 -5.72205e-06 22.0854 0.169739 22.6744 0.492981Z"
                  fill="#4654EA"
                />
              </svg>
            ),
          },
          {
            label: 'STANDARD',
            price: 4.99,
            isUsing: false,
            icon: (
              <svg
                width="43"
                height="42"
                viewBox="0 0 43 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.0074 0.492981L32.2368 5.55771C32.45 5.67468 32.6274 5.84498 32.7509 6.05102C32.8744 6.25713 32.9395 6.49154 32.9395 6.73031C32.9395 6.96907 32.8744 7.20348 32.7509 7.4096C32.6274 7.61564 32.45 7.78594 32.2368 7.9029L23.0075 12.9679C22.4185 13.2911 21.7542 13.4609 21.0786 13.4609C20.4029 13.4609 19.7386 13.2911 19.1496 12.9679L9.9203 7.9029C9.70715 7.78594 9.52971 7.61564 9.40621 7.4096C9.28271 7.20348 9.21761 6.96907 9.21761 6.73031C9.21761 6.49154 9.28271 6.25713 9.40621 6.05102C9.52971 5.84498 9.70715 5.67468 9.9203 5.55771L19.1496 0.492981C19.7386 0.169739 20.4029 -5.72205e-06 21.0786 -5.72205e-06C21.7542 -5.72205e-06 22.4185 0.169739 23.0074 0.492981Z"
                  fill="#4654EA"
                />
                <path
                  opacity="0.7"
                  d="M22.9577 5.24786L36.1755 12.5014C36.3886 12.6183 36.5661 12.7886 36.6896 12.9947C36.8131 13.2008 36.8782 13.4352 36.8782 13.6739C36.8782 13.9127 36.8131 14.1472 36.6896 14.3532C36.5661 14.5594 36.3886 14.7296 36.1755 14.8466L22.9577 22.1C22.3687 22.4232 21.7045 22.593 21.0288 22.593C20.3532 22.593 19.6889 22.4232 19.1 22.1L5.88218 14.8466C5.66903 14.7296 5.49158 14.5594 5.36808 14.3532C5.24458 14.1472 5.17949 13.9127 5.17949 13.6739C5.17949 13.4352 5.24458 13.2008 5.36808 12.9947C5.49158 12.7886 5.66903 12.6183 5.88218 12.5014L19.1 5.24786C19.6889 4.9247 20.3532 4.75496 21.0288 4.75496C21.7045 4.75496 22.3687 4.9247 22.9577 5.24786Z"
                  fill="#4654EA"
                />
              </svg>
            ),
          },
          {
            label: 'BUSINESS',
            price: 29.99,
            isUsing: false,
            icon: (
              <svg
                width="43"
                height="42"
                viewBox="0 0 43 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.3409 0.492981L32.5703 5.55771C32.7835 5.67468 32.9609 5.84498 33.0844 6.05102C33.2078 6.25713 33.2729 6.49154 33.2729 6.73031C33.2729 6.96907 33.2078 7.20348 33.0844 7.4096C32.9609 7.61564 32.7835 7.78594 32.5703 7.9029L23.341 12.9679C22.752 13.2911 22.0877 13.4609 21.4121 13.4609C20.7364 13.4609 20.0721 13.2911 19.4831 12.9679L10.2538 7.9029C10.0406 7.78594 9.8632 7.61564 9.7397 7.4096C9.61621 7.20348 9.55111 6.96907 9.55111 6.73031C9.55111 6.49154 9.61621 6.25713 9.7397 6.05102C9.8632 5.84498 10.0406 5.67468 10.2538 5.55771L19.4831 0.492981C20.0721 0.169739 20.7364 -5.72205e-06 21.4121 -5.72205e-06C22.0877 -5.72205e-06 22.7519 0.169739 23.3409 0.492981Z"
                  fill="#4654EA"
                />
                <path
                  opacity="0.7"
                  d="M23.2912 5.24786L36.509 12.5014C36.7221 12.6183 36.8996 12.7886 37.0231 12.9947C37.1466 13.2008 37.2117 13.4352 37.2117 13.6739C37.2117 13.9127 37.1466 14.1472 37.0231 14.3532C36.8996 14.5594 36.7221 14.7296 36.509 14.8466L23.2912 22.1C22.7022 22.4232 22.038 22.593 21.3623 22.593C20.6867 22.593 20.0224 22.4232 19.4335 22.1L6.21567 14.8466C6.00252 14.7296 5.82507 14.5594 5.70158 14.3532C5.57808 14.1472 5.51298 13.9127 5.51298 13.6739C5.51298 13.4352 5.57808 13.2008 5.70158 12.9947C5.82507 12.7886 6.00252 12.6183 6.21567 12.5014L19.4335 5.24786C20.0224 4.9247 20.6867 4.75496 21.3623 4.75496C22.038 4.75496 22.7022 4.9247 23.2912 5.24786Z"
                  fill="#4654EA"
                />
                <path
                  opacity="0.4"
                  d="M23.5925 10.0019L41.9652 20.0844C42.178 20.2012 42.3552 20.3712 42.4785 20.5769C42.6018 20.7826 42.6667 21.0167 42.6667 21.2551C42.6667 21.4935 42.6018 21.7275 42.4785 21.9333C42.3552 22.139 42.178 22.309 41.9652 22.4258L23.5924 32.5081C23.0044 32.8308 22.3412 33.0002 21.6667 33.0002C20.9922 33.0002 20.329 32.8308 19.741 32.5081L1.36829 22.4258C1.15549 22.309 0.978329 22.139 0.855034 21.9333C0.731743 21.7275 0.666748 21.4935 0.666748 21.2551C0.666748 21.0167 0.731743 20.7826 0.855034 20.5769C0.978329 20.3712 1.15549 20.2012 1.36829 20.0844L19.741 10.0019C20.329 9.67924 20.9922 9.50969 21.6667 9.50969C22.3412 9.50969 23.0044 9.67924 23.5925 10.0019Z"
                  fill="#4654EA"
                />
              </svg>
            ),
          },
        ].map((o, index) => (
          <div
            key={index}
            className=" rounded-[8px] bg-Dark-3 px-[24px] py-[32px]
            [boxShadow:inset_0px_0px_0px_1px_#E6E8F0]
            [border:2px_solid_#00000000]
            hover:[boxShadow:0px_1px_1px_rgba(100,_116,_139,_0.06),_0px_1px_2px_rgba(100,_116,_139,_0.1)]
            hover:[border:2px_solid_#4654EA]

            "
          >
            {o.icon}
            <div className="h-[8px] "></div>

            <span
              className="font-Roboto font-semibold text-[24px] leading-[33px] text-white 
            inline-block mr-1 mb-2 "
            >
              ${o.price}
            </span>

            <span className="text-Grey font-Roboto text-[14px] font-medium leading-[22px] ">
              /mo
            </span>

            <div className="flex items-center justify-between ">
              <div className="text-white font-Roboto font-semibold text-[12px] leading-[30px] tracking-[0.5px]  ">
                {o.label}
              </div>

              {o.isUsing && (
                <div className="text-Green font-Roboto font-medium text-[12px] leading-[166%] ">
                  Using now
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
