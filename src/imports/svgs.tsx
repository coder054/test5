import clsx from 'clsx'
import { useHover } from 'src/hooks/useHover'

export const SvgFeed = ({ active }: { active: boolean }) => (
  <svg
    style={{ display: 'inline' }}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 15H17.5V13.3333H2.5V15ZM2.5 10.8333H17.5V9.16667H2.5V10.8333ZM2.5 5V6.66667H17.5V5H2.5Z"
      fill={active ? '#FF9607' : '#9CA3AF'}
    />
  </svg>
)

export const SvgCloseAdd = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_4493_79691)">
      <path
        d="M16.2546 2.3555L12.012 6.59814L16.2546 10.8408L14.8404 12.255L10.5977 8.01236L6.3551 12.255L4.94088 10.8408L9.18352 6.59814L4.94088 2.3555L6.3551 0.94129L10.5977 5.18393L14.8404 0.94129L16.2546 2.3555Z"
        fill="white"
      />
      <path
        d="M10.9513 5.53748L14.8404 1.6484L15.5475 2.3555L11.6584 6.24459L11.3048 6.59814L11.6584 6.9517L15.5475 10.8408L14.8404 11.5479L10.9513 7.6588L10.5977 7.30525L10.2442 7.6588L6.3551 11.5479L5.64799 10.8408L9.53708 6.9517L9.89063 6.59814L9.53708 6.24459L5.64799 2.3555L6.3551 1.6484L10.2442 5.53748L10.5977 5.89104L10.9513 5.53748Z"
        stroke="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_4493_79691"
        x="0.94043"
        y="0.941406"
        width="19.3145"
        height="19.3135"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_4493_79691"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_4493_79691"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export const SvgDashboard = ({ active }: { active: boolean }) => (
  <svg
    style={{ display: 'inline' }}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.33329 16.6667V11.6667H11.6666V16.6667H15.8333V10H18.3333L9.99996 2.5L1.66663 10H4.16663V16.6667H8.33329Z"
      fill={active ? '#FF9607' : '#9CA3AF'}
    />
  </svg>
)

export const SvgTest = ({ active }: { active: boolean }) => (
  <svg
    style={{ display: 'inline' }}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.1416 12.3833L18.3333 11.1917L17.1416 9.99999L14.1666 12.975L7.02496 5.83332L9.99996 2.85832L8.80829 1.66666L7.61663 2.85832L6.42496 1.66666L4.64163 3.44999L3.44996 2.25832L2.25829 3.44999L3.44996 4.64166L1.66663 6.42499L2.85829 7.61666L1.66663 8.80832L2.85829 9.99999L5.83329 7.02499L12.975 14.1667L9.99996 17.1417L11.1916 18.3333L12.3833 17.1417L13.575 18.3333L15.3583 16.55L16.55 17.7417L17.7416 16.55L16.55 15.3583L18.3333 13.575L17.1416 12.3833Z"
      fill={active ? '#FF9607' : '#9CA3AF'}
    />
  </svg>
)

export const SvgPrograms = ({ active }: { active: boolean }) => (
  <svg
    style={{ display: 'inline' }}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.56663 2.82499L5.49996 1.54999L1.66663 4.75832L2.74163 6.03332L6.56663 2.82499ZM18.3333 4.76665L14.5 1.54999L13.425 2.82499L17.2583 6.04165L18.3333 4.76665ZM9.99996 3.33332C5.85829 3.33332 2.49996 6.69165 2.49996 10.8333C2.49996 14.975 5.84996 18.3333 9.99996 18.3333C14.1416 18.3333 17.5 14.975 17.5 10.8333C17.5 6.69165 14.1416 3.33332 9.99996 3.33332ZM9.99996 16.6667C6.77496 16.6667 4.16663 14.0583 4.16663 10.8333C4.16663 7.60832 6.77496 4.99999 9.99996 4.99999C13.225 4.99999 15.8333 7.60832 15.8333 10.8333C15.8333 14.0583 13.225 16.6667 9.99996 16.6667ZM10.8333 7.49999H9.16663V9.99999H6.66663V11.6667H9.16663V14.1667H10.8333V11.6667H13.3333V9.99999H10.8333V7.49999Z"
      fill={active ? '#FF9607' : '#9CA3AF'}
    />
  </svg>
)

export const SvgChallenges = ({ active }: { active: boolean }) => (
  <svg
    style={{ display: 'inline' }}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.8333 4.16667H14.1667V2.5H5.83333V4.16667H4.16667C3.25 4.16667 2.5 4.91667 2.5 5.83333V6.66667C2.5 8.79167 4.1 10.525 6.15833 10.7833C6.68333 12.0333 7.80833 12.975 9.16667 13.25V15.8333H5.83333V17.5H14.1667V15.8333H10.8333V13.25C12.1917 12.975 13.3167 12.0333 13.8417 10.7833C15.9 10.525 17.5 8.79167 17.5 6.66667V5.83333C17.5 4.91667 16.75 4.16667 15.8333 4.16667ZM5.83333 9.01667C4.86667 8.66667 4.16667 7.75 4.16667 6.66667V5.83333H5.83333V9.01667ZM15.8333 6.66667C15.8333 7.75 15.1333 8.66667 14.1667 9.01667V5.83333H15.8333V6.66667Z"
      fill={active ? '#FF9607' : '#9CA3AF'}
    />
  </svg>
)

export const SvgContact = ({ active }: { active: boolean }) => (
  <svg
    style={{ display: 'inline' }}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5 5.00002H15.8333V12.5H4.99996V14.1667C4.99996 14.625 5.37496 15 5.83329 15H15L18.3333 18.3334V5.83335C18.3333 5.37502 17.9583 5.00002 17.5 5.00002ZM14.1666 10V2.50002C14.1666 2.04169 13.7916 1.66669 13.3333 1.66669H2.49996C2.04163 1.66669 1.66663 2.04169 1.66663 2.50002V14.1667L4.99996 10.8334H13.3333C13.7916 10.8334 14.1666 10.4584 14.1666 10Z"
      fill={active ? '#FF9607' : '#9CA3AF'}
    />
  </svg>
)

export const SvgAccount = ({ active }: { active: boolean }) => (
  <svg
    style={{ display: 'inline' }}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.95 10.7833C15.9834 10.5333 16.0001 10.275 16.0001 10C16.0001 9.73333 15.9834 9.46667 15.9417 9.21667L17.6334 7.9C17.7834 7.78333 17.8251 7.55833 17.7334 7.39167L16.1334 4.625C16.0334 4.44167 15.8251 4.38333 15.6417 4.44167L13.65 5.24167C13.2334 4.925 12.7917 4.65833 12.3 4.45833L12 2.34167C11.9667 2.14167 11.8 2 11.6 2H8.40005C8.20005 2 8.04172 2.14167 8.00838 2.34167L7.70838 4.45833C7.21672 4.65833 6.76672 4.93333 6.35838 5.24167L4.36672 4.44167C4.18338 4.375 3.97505 4.44167 3.87505 4.625L2.28338 7.39167C2.18338 7.56667 2.21672 7.78333 2.38338 7.9L4.07505 9.21667C4.03338 9.46667 4.00005 9.74167 4.00005 10C4.00005 10.2583 4.01672 10.5333 4.05838 10.7833L2.36672 12.1C2.21672 12.2167 2.17505 12.4417 2.26672 12.6083L3.86672 15.375C3.96672 15.5583 4.17505 15.6167 4.35838 15.5583L6.35005 14.7583C6.76672 15.075 7.20838 15.3417 7.70005 15.5417L8.00005 17.6583C8.04172 17.8583 8.20005 18 8.40005 18H11.6C11.8 18 11.9667 17.8583 11.9917 17.6583L12.2917 15.5417C12.7834 15.3417 13.2334 15.075 13.6417 14.7583L15.6334 15.5583C15.8167 15.625 16.0251 15.5583 16.1251 15.375L17.725 12.6083C17.8251 12.425 17.7834 12.2167 17.625 12.1L15.95 10.7833ZM10.0001 13C8.35005 13 7.00005 11.65 7.00005 10C7.00005 8.35 8.35005 7 10.0001 7C11.6501 7 13 8.35 13 10C13 11.65 11.6501 13 10.0001 13Z"
      fill={active ? '#FF9607' : '#9CA3AF'}
    />
  </svg>
)

export const SvgBiography = ({ active }: { active: boolean }) => (
  <svg
    style={{ display: 'inline' }}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.8333 2.49998H15V0.833313H13.3333V2.49998H6.66667V0.833313H5V2.49998H4.16667C3.24167 2.49998 2.5 3.24998 2.5 4.16665V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V4.16665C17.5 3.24998 16.75 2.49998 15.8333 2.49998ZM10 4.99998C11.3833 4.99998 12.5 6.11665 12.5 7.49998C12.5 8.88331 11.3833 9.99998 10 9.99998C8.61667 9.99998 7.5 8.88331 7.5 7.49998C7.5 6.11665 8.61667 4.99998 10 4.99998ZM15 15H5V14.1666C5 12.5 8.33333 11.5833 10 11.5833C11.6667 11.5833 15 12.5 15 14.1666V15Z"
      fill={active ? '#FF9607' : '#9CA3AF'}
    />
  </svg>
)

export const SvgSupport = ({ active }: { active: boolean }) => (
  <svg
    style={{ display: 'inline' }}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.16663 12.5H10.8333V14.1667H9.16663V12.5ZM9.16663 5.83335H10.8333V10.8334H9.16663V5.83335ZM9.99163 1.66669C5.39163 1.66669 1.66663 5.40002 1.66663 10C1.66663 14.6 5.39163 18.3334 9.99163 18.3334C14.6 18.3334 18.3333 14.6 18.3333 10C18.3333 5.40002 14.6 1.66669 9.99163 1.66669ZM9.99996 16.6667C6.31663 16.6667 3.33329 13.6834 3.33329 10C3.33329 6.31669 6.31663 3.33335 9.99996 3.33335C13.6833 3.33335 16.6666 6.31669 16.6666 10C16.6666 13.6834 13.6833 16.6667 9.99996 16.6667Z"
      fill={active ? '#FF9607' : '#9CA3AF'}
    />
  </svg>
)

export const SvgClockGoal = ({ color }: { color: string }) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2.5C6.486 2.5 2 6.986 2 12.5C2 18.014 6.486 22.5 12 22.5C17.514 22.5 22 18.014 22 12.5C22 6.986 17.514 2.5 12 2.5ZM15.293 17.207L11 12.914V6.5H13V12.086L16.707 15.793L15.293 17.207Z"
      fill={color}
    />
  </svg>
)

export const SvgClock = () => (
  <svg
    className="mr-1 inline-block"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.995 1C3.235 1 1 3.24 1 6C1 8.76 3.235 11 5.995 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 5.995 1ZM6 10C3.79 10 2 8.21 2 6C2 3.79 3.79 2 6 2C8.21 2 10 3.79 10 6C10 8.21 8.21 10 6 10Z"
      fill="#818389"
    />
    <path
      d="M6.25 3.5H5.5V6.5L8.125 8.075L8.5 7.46L6.25 6.125V3.5Z"
      fill="#818389"
    />
  </svg>
)

export const SvgFilter = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 11H16V13H4V11ZM4 6H20V8H4V6ZM4 18H11H11.235V16H11H4V18Z"
      fill="#09E099"
    />
  </svg>
)

export const SvgAbove = () => (
  <svg
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.25 10.5L9 6.75L12.75 10.5H5.25Z" fill="#A2A5AD" />
  </svg>
)

export const SvgBelow = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.25 7.5L9 11.25L12.75 7.5H5.25Z" fill="#A2A5AD" />
  </svg>
)

export const SvgAllowRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 3L7.9425 4.0575L12.1275 8.25H3V9.75H12.1275L7.9425 13.9425L9 15L15 9L9 3Z"
      fill="#09E099"
    />
  </svg>
)

export const SvgAllowLeftSlick = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z"
      fill="#A2A5AD"
    />
  </svg>
)
export const SvgAllowRightSlick = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.589996 10.59L5.17 6L0.589996 1.41L2 0L8 6L2 12L0.589996 10.59Z"
      fill="#09E099"
    />
  </svg>
)

export const SvgInfomation = () => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 16.5H12V12.5H11M12 8.5H12.01M21 12.5C21 13.6819 20.7672 14.8522 20.3149 15.9442C19.8626 17.0361 19.1997 18.0282 18.364 18.864C17.5282 19.6997 16.5361 20.3626 15.4442 20.8149C14.3522 21.2672 13.1819 21.5 12 21.5C10.8181 21.5 9.64778 21.2672 8.55585 20.8149C7.46392 20.3626 6.47177 19.6997 5.63604 18.864C4.80031 18.0282 4.13738 17.0361 3.68508 15.9442C3.23279 14.8522 3 13.6819 3 12.5C3 10.1131 3.94821 7.82387 5.63604 6.13604C7.32387 4.44821 9.61305 3.5 12 3.5C14.3869 3.5 16.6761 4.44821 18.364 6.13604C20.0518 7.82387 21 10.1131 21 12.5Z"
      stroke="#A2A5AD"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export const SvgIncrement = () => (
  <svg
    width="8"
    height="5"
    viewBox="0 0 8 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0.25 4.5L4 0.75L7.75 4.5H0.25Z" fill="#09E099" />
  </svg>
)

export const SvgDeincrement = () => (
  <svg
    width="8"
    height="5"
    viewBox="0 0 8 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0.25 0.5L4 4.25L7.75 0.5H0.25Z" fill="#D60C0C" />
  </svg>
)

export const SvgCamera = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.25 6V3.75H6.75V6H9V7.5H6.75V9.75H5.25V7.5H3V6H5.25ZM7.5 10.5V8.25H9.75V6H15L16.3725 7.5H18.75C19.575 7.5 20.25 8.175 20.25 9V18C20.25 18.825 19.575 19.5 18.75 19.5H6.75C5.925 19.5 5.25 18.825 5.25 18V10.5H7.5ZM12.75 17.25C14.82 17.25 16.5 15.57 16.5 13.5C16.5 11.43 14.82 9.75 12.75 9.75C10.68 9.75 9 11.43 9 13.5C9 15.57 10.68 17.25 12.75 17.25ZM10.35 13.5C10.35 14.8275 11.4225 15.9 12.75 15.9C14.0775 15.9 15.15 14.8275 15.15 13.5C15.15 12.1725 14.0775 11.1 12.75 11.1C11.4225 11.1 10.35 12.1725 10.35 13.5Z"
      fill="#6B7280"
    />
  </svg>
)

export const SvgVideo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5ZM14 13H11V16H9V13H6V11H9V8H11V11H14V13Z"
      fill="#6B7280"
    />
  </svg>
)

export const SvgEye = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 2.25C3.5 2.25 1.365 3.805 0.5 6C1.365 8.195 3.5 9.75 6 9.75C8.5 9.75 10.635 8.195 11.5 6C10.635 3.805 8.5 2.25 6 2.25ZM6 8.5C4.62 8.5 3.5 7.38 3.5 6C3.5 4.62 4.62 3.5 6 3.5C7.38 3.5 8.5 4.62 8.5 6C8.5 7.38 7.38 8.5 6 8.5ZM6 4.5C5.17 4.5 4.5 5.17 4.5 6C4.5 6.83 5.17 7.5 6 7.5C6.83 7.5 7.5 6.83 7.5 6C7.5 5.17 6.83 4.5 6 4.5Z"
      fill="white"
    />
  </svg>
)

export const SvgFan = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_3817_4779)">
      <path
        d="M11.048 1.70105C10.4268 1.02731 9.57449 0.65625 8.6478 0.65625C7.95511 0.65625 7.32074 0.875244 6.76227 1.3071C6.48047 1.52509 6.22513 1.79178 6 2.10306C5.77496 1.79187 5.51953 1.52509 5.23764 1.3071C4.67926 0.875244 4.04489 0.65625 3.3522 0.65625C2.42551 0.65625 1.57306 1.02731 0.951874 1.70105C0.338104 2.36691 0 3.27658 0 4.2626C0 5.27747 0.378204 6.20645 1.19019 7.18625C1.91656 8.06268 2.96054 8.95239 4.16949 9.98264C4.58231 10.3345 5.05023 10.7333 5.5361 11.1581C5.66446 11.2705 5.82916 11.3324 6 11.3324C6.17075 11.3324 6.33554 11.2705 6.46371 11.1583C6.94958 10.7334 7.41779 10.3344 7.83078 9.98236C9.03955 8.9523 10.0835 8.06268 10.8099 7.18616C11.6219 6.20645 12 5.27747 12 4.26251C12 3.27658 11.6619 2.36691 11.048 1.70105Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_3817_4779">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export const SvgAddFriend = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.33499 6.56494C9.01999 7.02994 9.49999 7.65994 9.49999 8.49994V9.99994H11C11.275 9.99994 11.5 9.77494 11.5 9.49994V8.49994C11.5 7.40994 9.71499 6.76494 8.33499 6.56494Z"
      fill="white"
    />
    <path
      d="M4.49997 6C5.60454 6 6.49997 5.10457 6.49997 4C6.49997 2.89543 5.60454 2 4.49997 2C3.3954 2 2.49997 2.89543 2.49997 4C2.49997 5.10457 3.3954 6 4.49997 6Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.50002 6C8.60502 6 9.50002 5.105 9.50002 4C9.50002 2.895 8.60502 2 7.50002 2C7.26502 2 7.04502 2.05 6.83502 2.12C7.25002 2.635 7.50002 3.29 7.50002 4C7.50002 4.71 7.25002 5.365 6.83502 5.88C7.04502 5.95 7.26502 6 7.50002 6Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.5 6.5C3.165 6.5 0.5 7.17 0.5 8.5V9.5C0.5 9.775 0.725 10 1 10H8C8.275 10 8.5 9.775 8.5 9.5V8.5C8.5 7.17 5.835 6.5 4.5 6.5Z"
      fill="white"
    />
  </svg>
)

export const SvgVisitor = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.33502 6.56494C9.02002 7.02994 9.50002 7.65994 9.50002 8.49994V9.99994H11C11.275 9.99994 11.5 9.77494 11.5 9.49994V8.49994C11.5 7.40994 9.71502 6.76494 8.33502 6.56494Z"
      fill="white"
    />
    <path
      d="M4.5 6C5.60457 6 6.5 5.10457 6.5 4C6.5 2.89543 5.60457 2 4.5 2C3.39543 2 2.5 2.89543 2.5 4C2.5 5.10457 3.39543 6 4.5 6Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.50002 6C8.60502 6 9.50002 5.105 9.50002 4C9.50002 2.895 8.60502 2 7.50002 2C7.26502 2 7.04502 2.05 6.83502 2.12C7.25002 2.635 7.50002 3.29 7.50002 4C7.50002 4.71 7.25002 5.365 6.83502 5.88C7.04502 5.95 7.26502 6 7.50002 6Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.5 6.5C3.165 6.5 0.5 7.17 0.5 8.5V9.5C0.5 9.775 0.725 10 1 10H8C8.275 10 8.5 9.775 8.5 9.5V8.5C8.5 7.17 5.835 6.5 4.5 6.5Z"
      fill="white"
    />
  </svg>
)

export const SvgClose = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.58869 1.70703C3.98634 1.70703 1.88281 3.81056 1.88281 6.41291C1.88281 9.01527 3.98634 11.1188 6.58869 11.1188C9.19105 11.1188 11.2946 9.01527 11.2946 6.41291C11.2946 3.81056 9.19105 1.70703 6.58869 1.70703ZM8.94164 8.10233L8.27811 8.76586L6.58869 7.07644L4.89928 8.76586L4.23575 8.10233L5.92517 6.41291L4.23575 4.7235L4.89928 4.05997L6.58869 5.74938L8.27811 4.05997L8.94164 4.7235L7.25222 6.41291L8.94164 8.10233Z"
      fill="#9CA3AF"
    />
  </svg>
)

export const SvgPlay = ({
  height,
  width,
}: {
  height?: number
  width?: number
}) => (
  <svg
    width={width ? width : 24}
    height={height ? height : 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z"
      fill="white"
      fill-opacity="0.51"
    />
  </svg>
)

export const SvgAddSmall = ({ active }: { active?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
      fill={active ? '#6B7280' : active}
    />
  </svg>
)

export const SvgSubSmall = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 13H5V11H19V13Z" fill="#6B7280" />
  </svg>
)

export const SvgFavorite = ({ active }: { active?: boolean }) => (
  <svg
    className="mr-1 cursor-pointer"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.8375 3.99243C15.89 3.04993 14.645 2.53076 13.33 2.53076C12.0942 2.53076 10.92 2.99076 10 3.8291C9.08003 2.99076 7.90669 2.53076 6.67002 2.53076C5.35502 2.53076 4.11002 3.04993 3.15919 3.99576C1.19836 5.96493 1.19919 9.04493 3.16086 11.0058L10 17.8449L16.8392 11.0058C18.8009 9.04493 18.8017 5.96493 16.8375 3.99243Z"
      fill={active ? '#09E099' : '#ffffff'}
    />
  </svg>
)

export const SvgShare = () => (
  <svg
    className="cursor-pointer"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 13.4001C14.3667 13.4001 13.8 13.6501 13.3667 14.0417L7.425 10.5834C7.46667 10.3917 7.5 10.2001 7.5 10.0001C7.5 9.80008 7.46667 9.60842 7.425 9.41675L13.3 5.99175C13.75 6.40841 14.3417 6.66675 15 6.66675C16.3833 6.66675 17.5 5.55008 17.5 4.16675C17.5 2.78341 16.3833 1.66675 15 1.66675C13.6167 1.66675 12.5 2.78341 12.5 4.16675C12.5 4.36675 12.5333 4.55841 12.575 4.75008L6.7 8.17508C6.25 7.75842 5.65833 7.50008 5 7.50008C3.61667 7.50008 2.5 8.61675 2.5 10.0001C2.5 11.3834 3.61667 12.5001 5 12.5001C5.65833 12.5001 6.25 12.2417 6.7 11.8251L12.6333 15.2917C12.5917 15.4667 12.5667 15.6501 12.5667 15.8334C12.5667 17.1751 13.6583 18.2667 15 18.2667C16.3417 18.2667 17.4333 17.1751 17.4333 15.8334C17.4333 14.4917 16.3417 13.4001 15 13.4001Z"
      fill="#ffffff"
    />
  </svg>
)

export const SvgComment = () => (
  <svg
    className="cursor-pointer"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.6666 1.66675H3.33329C2.41663 1.66675 1.66663 2.41675 1.66663 3.33341V18.3334L4.99996 15.0001H16.6666C17.5833 15.0001 18.3333 14.2501 18.3333 13.3334V3.33341C18.3333 2.41675 17.5833 1.66675 16.6666 1.66675ZM16.6666 13.3334H4.99996L3.33329 15.0001V3.33341H16.6666V13.3334Z"
      fill="#818389"
    />
  </svg>
)

export const SvgUnfollow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.6569 2.34313C12.1458 0.832156 10.1369 0 8 0C5.86309 0 3.85413 0.832156 2.34313 2.34313C0.832156 3.85416 0 5.86312 0 8C0 10.1369 0.832156 12.1458 2.34313 13.6569C3.85413 15.1678 5.86309 16 8 16C10.1369 16 12.1458 15.1678 13.6569 13.6569C15.1678 12.1458 16 10.1369 16 8C16 5.86312 15.1678 3.85416 13.6569 2.34313ZM11.5145 9.47294H4.48541C3.67322 9.47294 3.01244 8.81216 3.01244 8C3.01244 7.18784 3.67322 6.52709 4.48541 6.52709H11.5145C12.3267 6.52709 12.9875 7.18784 12.9875 8C12.9875 8.81216 12.3267 9.47294 11.5145 9.47294Z"
      fill="#D60C0C"
    />
  </svg>
)

export const SvgCopyLink = () => (
  <svg
    width="13"
    height="16"
    viewBox="0 0 13 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.66659 0.666626H1.66659C0.933252 0.666626 0.333252 1.26663 0.333252 1.99996V11.3333H1.66659V1.99996H9.66659V0.666626ZM8.99992 3.33329L12.9999 7.33329V14C12.9999 14.7333 12.3999 15.3333 11.6666 15.3333H4.32659C3.59325 15.3333 2.99992 14.7333 2.99992 14L3.00659 4.66663C3.00659 3.93329 3.59992 3.33329 4.33325 3.33329H8.99992ZM8.33325 7.99996H11.9999L8.33325 4.33329V7.99996Z"
      fill="white"
    />
  </svg>
)

export const SvgBlock = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25 0C11.215 0 0 11.215 0 25C0 38.785 11.215 50 25 50C38.785 50 50 38.785 50 25C50 11.215 38.785 0 25 0ZM5 25C5 20.385 6.585 16.145 9.22 12.7575L37.2425 40.78C33.8575 43.415 29.615 45 25 45C13.9725 45 5 36.0275 5 25ZM40.78 37.2425L12.7575 9.22C16.145 6.585 20.385 5 25 5C36.0275 5 45 13.9725 45 25C45 29.615 43.4125 33.855 40.78 37.2425Z"
      fill="#D60C0C"
    />
  </svg>
)

export const SvgFollownews = () => (
  <svg
    width="48"
    height="46"
    viewBox="0 0 48 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M43.6657 34.4466V15.1957H44.2483C45.9707 15.1957 47.3671 16.592 47.3671 18.3145V38.5527C47.3671 40.3953 46.6351 42.1623 45.3322 43.4651C44.0294 44.768 42.2624 45.5 40.4198 45.5H7.58006C5.73753 45.5 3.97048 44.768 2.66767 43.4651C1.36477 42.1623 0.632812 40.3953 0.632812 38.5527V3.61878C0.632812 2.79162 0.961413 1.99833 1.54632 1.41351C2.13114 0.8286 2.92444 0.5 3.7516 0.5H38.9039C39.7311 0.5 40.5244 0.8286 41.1092 1.41351C41.6941 1.99833 42.0227 2.79162 42.0227 3.61878V34.4466C42.0227 34.9 42.3908 35.2681 42.8442 35.2681C43.2976 35.2681 43.6657 34.9 43.6657 34.4466ZM6.54068 34.3641H36.1147C36.5682 34.3641 36.9362 33.996 36.9362 33.5426C36.9362 33.0892 36.5682 32.7211 36.1147 32.7211H6.54068C6.08731 32.7211 5.71918 33.0892 5.71918 33.5426C5.71918 33.996 6.08731 34.3641 6.54068 34.3641ZM6.54068 28.6592H36.1147C36.5682 28.6592 36.9362 28.2911 36.9362 27.8377C36.9362 27.3843 36.5682 27.0162 36.1147 27.0162H6.54068C6.08731 27.0162 5.71918 27.3843 5.71918 27.8377C5.71918 28.2911 6.08731 28.6592 6.54068 28.6592ZM6.54068 22.9544H36.1147C36.5682 22.9544 36.9362 22.5862 36.9362 22.1329C36.9362 21.6795 36.5682 21.3114 36.1147 21.3114H6.54068C6.08731 21.3114 5.71918 21.6795 5.71918 22.1329C5.71918 22.5862 6.08731 22.9544 6.54068 22.9544ZM36.9362 7.42197C36.9362 6.14481 35.9009 5.10953 34.6239 5.10953H8.03162C6.75455 5.10953 5.71918 6.14481 5.71918 7.42197V14.1156C5.71918 15.3927 6.75455 16.428 8.03162 16.428H34.6239C35.9009 16.428 36.9362 15.3927 36.9362 14.1156V7.42197Z"
      fill="#09E099"
    />
  </svg>
)

export const SvgNews = ({ active }: { active: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.6666 3.33301H3.33329C2.41663 3.33301 1.66663 4.08301 1.66663 4.99967V14.9997C1.66663 15.9163 2.41663 16.6663 3.33329 16.6663H16.6666C17.5833 16.6663 18.3333 15.9163 18.3333 14.9997V4.99967C18.3333 4.08301 17.5833 3.33301 16.6666 3.33301ZM3.33329 9.99967H6.66663V11.6663H3.33329V9.99967ZM11.6666 14.9997H3.33329V13.333H11.6666V14.9997ZM16.6666 14.9997H13.3333V13.333H16.6666V14.9997ZM16.6666 11.6663H8.33329V9.99967H16.6666V11.6663Z"
      fill={active ? '#FF9607' : '#9CA3AF'}
    />
  </svg>
)

export const IconClock = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.995 1C3.235 1 1 3.24 1 6C1 8.76 3.235 11 5.995 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 5.995 1ZM6 10C3.79 10 2 8.21 2 6C2 3.79 3.79 2 6 2C8.21 2 10 3.79 10 6C10 8.21 8.21 10 6 10Z"
      fill="#818389"
    />
    <path
      d="M6.25 3.5H5.5V6.5L8.125 8.075L8.5 7.46L6.25 6.125V3.5Z"
      fill="#818389"
    />
  </svg>
)

export const IconFavorite = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.99996 17.7917L8.79163 16.6917C4.49996 12.8 1.66663 10.2333 1.66663 7.08333C1.66663 4.51667 3.68329 2.5 6.24996 2.5C7.69996 2.5 9.09163 3.175 9.99996 4.24167C10.9083 3.175 12.3 2.5 13.75 2.5C16.3166 2.5 18.3333 4.51667 18.3333 7.08333C18.3333 10.2333 15.5 12.8 11.2083 16.7L9.99996 17.7917Z"
      fill="#09E099"
    />
  </svg>
)

export const IconComment = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.6667 1.66675H3.33335C2.41669 1.66675 1.66669 2.41675 1.66669 3.33341V18.3334L5.00002 15.0001H16.6667C17.5834 15.0001 18.3334 14.2501 18.3334 13.3334V3.33341C18.3334 2.41675 17.5834 1.66675 16.6667 1.66675ZM16.6667 13.3334H5.00002L3.33335 15.0001V3.33341H16.6667V13.3334Z"
      fill="#6B7280"
    />
  </svg>
)
export const IconSharing = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 13.4001C14.3667 13.4001 13.8 13.6501 13.3667 14.0417L7.425 10.5834C7.46667 10.3917 7.5 10.2001 7.5 10.0001C7.5 9.80008 7.46667 9.60842 7.425 9.41675L13.3 5.99175C13.75 6.40841 14.3417 6.66675 15 6.66675C16.3833 6.66675 17.5 5.55008 17.5 4.16675C17.5 2.78341 16.3833 1.66675 15 1.66675C13.6167 1.66675 12.5 2.78341 12.5 4.16675C12.5 4.36675 12.5333 4.55841 12.575 4.75008L6.7 8.17508C6.25 7.75842 5.65833 7.50008 5 7.50008C3.61667 7.50008 2.5 8.61675 2.5 10.0001C2.5 11.3834 3.61667 12.5001 5 12.5001C5.65833 12.5001 6.25 12.2417 6.7 11.8251L12.6333 15.2917C12.5917 15.4667 12.5667 15.6501 12.5667 15.8334C12.5667 17.1751 13.6583 18.2667 15 18.2667C16.3417 18.2667 17.4333 17.1751 17.4333 15.8334C17.4333 14.4917 16.3417 13.4001 15 13.4001Z"
      fill="white"
    />
  </svg>
)

export const IconMoneyEuro = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 12.3333C8.32666 12.3333 6.87999 11.3867 6.16 10H10L10.6667 8.66667H5.72C5.68666 8.44667 5.66666 8.22667 5.66666 8C5.66666 7.77333 5.68666 7.55333 5.72 7.33333H10L10.6667 6H6.16C6.87999 4.61333 8.33333 3.66667 10 3.66667C11.0733 3.66667 12.06 4.06 12.82 4.71333L14 3.53333C12.94 2.58 11.5333 2 10 2C7.38666 2 5.17333 3.67333 4.34666 6H1.99999L1.33333 7.33333H4.03999C4.01333 7.55333 3.99999 7.77333 3.99999 8C3.99999 8.22667 4.01333 8.44667 4.03999 8.66667H1.99999L1.33333 10H4.34666C5.17333 12.3267 7.38666 14 10 14C11.54 14 12.94 13.42 14 12.4667L12.8133 11.2867C12.06 11.94 11.08 12.3333 10 12.3333Z"
      fill="white"
    />
  </svg>
)

export const IconArrowBack = ({ textBlack }: { textBlack?: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
      fill={textBlack ? '#1E1F24' : 'white'}
    />
  </svg>
)

export const ChevronDown = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 10L12 15L17 10H7Z" fill="#818389" />
  </svg>
)
export const ChevronUp = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17 14L12 9L7 14L17 14Z" fill="#818389" />
  </svg>
)
export const SvgEuro = ({ ...rest }) => (
  <svg
    {...rest}
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.1666 12.3333C8.49327 12.3333 7.04661 11.3867 6.32661 10H10.1666L10.8333 8.66667H5.88661C5.85327 8.44667 5.83327 8.22667 5.83327 8C5.83327 7.77333 5.85327 7.55333 5.88661 7.33333H10.1666L10.8333 6H6.32661C7.04661 4.61333 8.49994 3.66667 10.1666 3.66667C11.2399 3.66667 12.2266 4.06 12.9866 4.71333L14.1666 3.53333C13.1066 2.58 11.6999 2 10.1666 2C7.55327 2 5.33994 3.67333 4.51327 6H2.16661L1.49994 7.33333H4.20661C4.17994 7.55333 4.16661 7.77333 4.16661 8C4.16661 8.22667 4.17994 8.44667 4.20661 8.66667H2.16661L1.49994 10H4.51327C5.33994 12.3267 7.55327 14 10.1666 14C11.7066 14 13.1066 13.42 14.1666 12.4667L12.9799 11.2867C12.2266 11.94 11.2466 12.3333 10.1666 12.3333Z"
      fill="#09E099"
    />
  </svg>
)

export const IconWarning = ({ ...rest }) => (
  <svg
    {...rest}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
      fill="#4654EA"
    />
  </svg>
)

export const SvgXIcon = ({ className, ...rest }) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()

  return (
    <svg
      //@ts-ignore: Unreachable code error
      ref={hoverRef}
      {...rest}
      className={clsx(className, 'cursor-pointer')}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.1516 13.1516C13.3767 12.9267 13.6818 12.8003 14 12.8003C14.3182 12.8003 14.6234 12.9267 14.8484 13.1516L20 18.3032L25.1516 13.1516C25.2623 13.037 25.3947 12.9456 25.5412 12.8827C25.6876 12.8198 25.845 12.7867 26.0044 12.7853C26.1637 12.7839 26.3217 12.8143 26.4692 12.8746C26.6167 12.935 26.7506 13.0241 26.8633 13.1367C26.976 13.2494 27.0651 13.3834 27.1254 13.5309C27.1858 13.6784 27.2161 13.8364 27.2147 13.9957C27.2134 14.155 27.1803 14.3125 27.1174 14.4589C27.0545 14.6053 26.963 14.7377 26.8484 14.8484L21.6968 20L26.8484 25.1516C27.067 25.3779 27.188 25.6811 27.1852 25.9957C27.1825 26.3103 27.0563 26.6113 26.8338 26.8338C26.6113 27.0563 26.3104 27.1825 25.9957 27.1852C25.6811 27.188 25.378 27.067 25.1516 26.8484L20 21.6968L14.8484 26.8484C14.6221 27.067 14.319 27.188 14.0044 27.1852C13.6897 27.1825 13.3887 27.0563 13.1663 26.8338C12.9438 26.6113 12.8176 26.3103 12.8148 25.9957C12.8121 25.6811 12.933 25.3779 13.1516 25.1516L18.3032 20L13.1516 14.8484C12.9267 14.6234 12.8003 14.3182 12.8003 14C12.8003 13.6818 12.9267 13.3767 13.1516 13.1516V13.1516Z"
        fill={isHovered ? '#ffffff' : '#6B7280'}
      />
    </svg>
  )
}

export const SvgPlace = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
      fill="#6B7280"
    />
  </svg>
)

export const SvgFeedUpdate = () => (
  <svg
    width="55"
    height="48"
    viewBox="0 0 55 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.8333 13.3333H11.5V32C11.5 34.9333 13.9 37.3333 16.8333 37.3333H40.8333V32H16.8333V13.3333Z"
      fill="#09E099"
    />
    <path
      d="M48.8327 0H27.4993C24.566 0 22.166 2.4 22.166 5.33333V21.3333C22.166 24.2667 24.566 26.6667 27.4993 26.6667H48.8327C51.766 26.6667 54.166 24.2667 54.166 21.3333V5.33333C54.166 2.4 51.766 0 48.8327 0ZM48.8327 21.3333H27.4993V10.6667H48.8327V21.3333Z"
      fill="#09E099"
    />
    <path
      d="M6.16634 24H0.833008V42.6667C0.833008 45.6 3.23301 48 6.16634 48H30.1663V42.6667H6.16634V24Z"
      fill="#09E099"
    />
  </svg>
)

export const SvgX = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
)
export const SvgCheck = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
)
