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

export const SvgAddSmall = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#6B7280" />
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
      fill="#09E099"
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
