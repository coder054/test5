export function AppStoreSvg({ ...rest }) {
  return (
    <div className="flex  items-center bg-white rounded-lg space-x-4 mobileM:px-3 laptopM:px-5 py-[9px] border-4 border-gray-200 shadow-xl">
      <svg
        width="19"
        height="22"
        viewBox="0 0 19 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.2973 11.5804C15.319 9.89936 16.2217 8.30876 17.6539 7.4283C16.7504 6.13798 15.2371 5.31988 13.6627 5.27062C11.9835 5.09436 10.3555 6.27545 9.49981 6.27545C8.62754 6.27545 7.31004 5.28812 5.89131 5.31731C4.04206 5.37705 2.31809 6.42844 1.41839 8.04518C-0.515607 11.3936 0.926982 16.3146 2.77959 19.0213C3.70649 20.3466 4.78977 21.8271 6.20722 21.7746C7.59428 21.717 8.11232 20.8901 9.78662 20.8901C11.4454 20.8901 11.9314 21.7746 13.3776 21.7412C14.866 21.717 15.8038 20.4099 16.6981 19.072C17.3641 18.1277 17.8766 17.084 18.2166 15.9795C16.4674 15.2397 15.2994 13.4795 15.2973 11.5804Z"
          fill="#282828"
        />
        <path
          d="M12.5656 3.49062C13.3772 2.51641 13.777 1.26423 13.6802 0C12.4403 0.13022 11.2951 0.722779 10.4726 1.65961C9.6683 2.57494 9.24975 3.80509 9.32888 5.021C10.5692 5.03377 11.7885 4.45727 12.5656 3.49062Z"
          fill="#282828"
        />
      </svg>
      <div className="text-left text-black  mobileM:leading-4 laptopM:leading-5 font-SVNGilroy">
        <p className="mobileM:text-[10px] laptopM:text-[15px] font-medium">
          Download on the
        </p>
        <p className="mobileM:text-[12px] laptopM:text-[19px] font-bold ">
          Appstore
        </p>
      </div>
    </div>
  )
}
