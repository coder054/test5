import { Text } from 'components/Text'

export const DropdownUser = () => {
  return (
    <div
      style={{
        boxShadow: `0px 2px 4px 0px rgba(31, 41, 55, 0.06),
 0px 4px 4px 0px rgba(0, 0, 0, 0.25)`,
      }}
      className="w-[266px] border border-Stroke rounded-[8px] bg-[#202128cc] "
    >
      <div className="flex px-[16px] py-[14px] items-center">
        <img
          src={'/Avatar.png'}
          className="w-[40px] h-[40px] rounded-[8px] mr-[8px]"
          alt=""
        />

        <div className=" ">
          <Text name="body1" className="text-white ">
            Anika Visser
          </Text>

          <Text name="Caption" className="text-Grey ">
            Acme Global Inc.
          </Text>
        </div>
      </div>

      <div className="h-[1px] bg-Stroke "></div>

      <div className="py-[8px] ">
        <div className="flex px-[16px] py-[8px] cursor-pointer  ">
          <svg
            className="mr-[8px] "
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.6 11.9999C21.6 14.546 20.5886 16.9878 18.7882 18.7881C16.9879 20.5885 14.5461 21.5999 12 21.5999C9.45392 21.5999 7.01212 20.5885 5.21177 18.7881C3.41142 16.9878 2.39999 14.546 2.39999 11.9999C2.39999 9.45382 3.41142 7.01203 5.21177 5.21168C7.01212 3.41133 9.45392 2.3999 12 2.3999C14.5461 2.3999 16.9879 3.41133 18.7882 5.21168C20.5886 7.01203 21.6 9.45382 21.6 11.9999ZM14.4 8.3999C14.4 9.03642 14.1471 9.64687 13.697 10.097C13.247 10.547 12.6365 10.7999 12 10.7999C11.3635 10.7999 10.753 10.547 10.3029 10.097C9.85285 9.64687 9.59999 9.03642 9.59999 8.3999C9.59999 7.76338 9.85285 7.15293 10.3029 6.70285C10.753 6.25276 11.3635 5.9999 12 5.9999C12.6365 5.9999 13.247 6.25276 13.697 6.70285C14.1471 7.15293 14.4 7.76338 14.4 8.3999ZM12 13.1999C10.8511 13.1997 9.72633 13.5293 8.75929 14.1496C7.79226 14.7699 7.02365 15.6548 6.54479 16.6991C7.22001 17.4846 8.05712 18.1148 8.99873 18.5465C9.94033 18.9781 10.9642 19.201 12 19.1999C13.0358 19.201 14.0597 18.9781 15.0013 18.5465C15.9429 18.1148 16.78 17.4846 17.4552 16.6991C16.9763 15.6548 16.2077 14.7699 15.2407 14.1496C14.2737 13.5293 13.1489 13.1997 12 13.1999Z"
              fill="white"
            />
          </svg>

          <Text name="body1" className="text-white ">
            Profile
          </Text>
        </div>
        <div className="flex px-[16px] py-[8px] cursor-pointer ">
          <svg
            className="mr-[8px] "
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.788 3.8039C13.332 1.9319 10.668 1.9319 10.212 3.8039C10.1439 4.0852 10.0104 4.34645 9.82227 4.5664C9.63415 4.78634 9.39676 4.95876 9.12941 5.06963C8.86207 5.18049 8.57233 5.22667 8.28376 5.20441C7.9952 5.18215 7.71597 5.09207 7.4688 4.9415C5.8224 3.9383 3.9384 5.8223 4.9416 7.4687C5.5896 8.5319 5.0148 9.9191 3.8052 10.2131C1.932 10.6679 1.932 13.3331 3.8052 13.7867C4.08657 13.8549 4.34787 13.9885 4.56781 14.1768C4.78776 14.3651 4.96013 14.6026 5.07089 14.8701C5.18165 15.1376 5.22767 15.4274 5.2052 15.7161C5.18274 16.0047 5.09242 16.284 4.9416 16.5311C3.9384 18.1775 5.8224 20.0615 7.4688 19.0583C7.71593 18.9075 7.99518 18.8172 8.28382 18.7947C8.57246 18.7722 8.86233 18.8183 9.12982 18.929C9.3973 19.0398 9.63485 19.2121 9.82311 19.4321C10.0114 19.652 10.145 19.9133 10.2132 20.1947C10.668 22.0679 13.3332 22.0679 13.7868 20.1947C13.8552 19.9135 13.989 19.6524 14.1773 19.4326C14.3656 19.2128 14.6031 19.0405 14.8705 18.9298C15.1379 18.8191 15.4277 18.773 15.7162 18.7953C16.0048 18.8177 16.284 18.9078 16.5312 19.0583C18.1776 20.0615 20.0616 18.1775 19.0584 16.5311C18.9079 16.2839 18.8177 16.0047 18.7954 15.7161C18.7731 15.4276 18.8192 15.1378 18.9299 14.8704C19.0406 14.603 19.2129 14.3655 19.4327 14.1772C19.6525 13.9889 19.9136 13.8551 20.1948 13.7867C22.068 13.3319 22.068 10.6667 20.1948 10.2131C19.9134 10.1449 19.6521 10.0113 19.4322 9.82302C19.2122 9.63475 19.0399 9.39721 18.9291 9.12972C18.8184 8.86223 18.7723 8.57236 18.7948 8.28372C18.8173 7.99508 18.9076 7.71583 19.0584 7.4687C20.0616 5.8223 18.1776 3.9383 16.5312 4.9415C16.2841 5.09232 16.0048 5.18264 15.7162 5.20511C15.4275 5.22757 15.1377 5.18155 14.8702 5.07079C14.6027 4.96003 14.3651 4.78766 14.1769 4.56772C13.9886 4.34777 13.855 4.08648 13.7868 3.8051L13.788 3.8039ZM12 15.5999C12.9548 15.5999 13.8705 15.2206 14.5456 14.5455C15.2207 13.8704 15.6 12.9547 15.6 11.9999C15.6 11.0451 15.2207 10.1294 14.5456 9.45432C13.8705 8.77919 12.9548 8.3999 12 8.3999C11.0452 8.3999 10.1295 8.77919 9.45442 9.45432C8.77928 10.1294 8.4 11.0451 8.4 11.9999C8.4 12.9547 8.77928 13.8704 9.45442 14.5455C10.1295 15.2206 11.0452 15.5999 12 15.5999Z"
              fill="white"
            />
          </svg>

          <Text name="body1" className="text-white ">
            Settings
          </Text>
        </div>
        <div className="flex px-[16px] py-[8px] cursor-pointer ">
          <svg
            className="mr-[8px] "
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.59999 6C9.28173 6 8.97651 6.12643 8.75147 6.35147C8.52642 6.57652 8.39999 6.88174 8.39999 7.2C8.39999 7.51826 8.52642 7.82348 8.75147 8.04853C8.97651 8.27357 9.28173 8.4 9.59999 8.4H16.3032L14.7516 9.9516C14.533 10.1779 14.4121 10.481 14.4148 10.7957C14.4175 11.1103 14.5437 11.4113 14.7662 11.6338C14.9887 11.8563 15.2897 11.9825 15.6043 11.9852C15.9189 11.9879 16.2221 11.867 16.4484 11.6484L20.0484 8.0484C20.2734 7.82337 20.3997 7.5182 20.3997 7.2C20.3997 6.8818 20.2734 6.57663 20.0484 6.3516L16.4484 2.7516C16.3377 2.63699 16.2053 2.54557 16.0589 2.48268C15.9125 2.41979 15.755 2.38668 15.5957 2.3853C15.4363 2.38391 15.2783 2.41428 15.1308 2.47461C14.9834 2.53495 14.8494 2.62405 14.7367 2.73673C14.624 2.8494 14.5349 2.98338 14.4746 3.13085C14.4143 3.27833 14.3839 3.43635 14.3853 3.59568C14.3867 3.75502 14.4198 3.91248 14.4827 4.05889C14.5456 4.20529 14.637 4.3377 14.7516 4.4484L16.3032 6H9.59999ZM14.4 18C14.7183 18 15.0235 17.8736 15.2485 17.6485C15.4736 17.4235 15.6 17.1183 15.6 16.8C15.6 16.4817 15.4736 16.1765 15.2485 15.9515C15.0235 15.7264 14.7183 15.6 14.4 15.6H7.69679L9.24839 14.0484C9.36301 13.9377 9.45442 13.8053 9.51731 13.6589C9.58021 13.5125 9.61331 13.355 9.61469 13.1957C9.61608 13.0363 9.58572 12.8783 9.52538 12.7309C9.46504 12.5834 9.37594 12.4494 9.26327 12.3367C9.1506 12.2241 9.01661 12.135 8.86914 12.0746C8.72166 12.0143 8.56365 11.9839 8.40431 11.9853C8.24498 11.9867 8.08751 12.0198 7.94111 12.0827C7.7947 12.1456 7.66229 12.237 7.55159 12.3516L3.95159 15.9516C3.72663 16.1766 3.60025 16.4818 3.60025 16.8C3.60025 17.1182 3.72663 17.4234 3.95159 17.6484L7.55159 21.2484C7.77792 21.467 8.08104 21.5879 8.39568 21.5852C8.71031 21.5825 9.01129 21.4563 9.23378 21.2338C9.45627 21.0113 9.58247 20.7103 9.5852 20.3957C9.58794 20.081 9.46698 19.7779 9.24839 19.5516L7.69679 18H14.4Z"
              fill="white"
            />
          </svg>

          <Text name="body1" className="text-white ">
            Change organization
          </Text>
        </div>
      </div>

      <div className="h-[1px] bg-Stroke "></div>

      <div className="py-[8px] ">
        <div className="flex px-[16px] py-[8px] cursor-pointer">
          <svg
            className="mr-[8px] "
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.8375 3.99243C15.89 3.04993 14.645 2.53076 13.33 2.53076C12.0942 2.53076 10.92 2.99076 10 3.8291C9.08003 2.99076 7.90669 2.53076 6.67002 2.53076C5.35502 2.53076 4.11002 3.04993 3.15919 3.99576C1.19836 5.96493 1.19919 9.04493 3.16086 11.0058L10 17.8449L16.8392 11.0058C18.8009 9.04493 18.8017 5.96493 16.8375 3.99243Z"
              fill="#09E099"
            />
          </svg>
          <Text name="body1" className="text-white ">
            Logout
          </Text>
        </div>
      </div>
    </div>
  )
}