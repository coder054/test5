import React, { ComponentPropsWithRef } from 'react'
export function SortIcon({ className, ...rest }: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M6.2289 12.9999H17.7759C18.6379 12.9999 19.0959 14.0199 18.5229 14.6649L12.7499 21.1599C12.6563 21.2656 12.5412 21.3502 12.4125 21.4082C12.2837 21.4661 12.1441 21.4961 12.0029 21.4961C11.8617 21.4961 11.7221 21.4661 11.5933 21.4082C11.4645 21.3502 11.3495 21.2656 11.2559 21.1599L5.4809 14.6649C4.9079 14.0199 5.3659 12.9999 6.2289 12.9999ZM11.2549 2.8409C11.3485 2.73521 11.4635 2.65059 11.5923 2.59264C11.7211 2.53468 11.8607 2.50472 12.0019 2.50472C12.1431 2.50472 12.2827 2.53468 12.4115 2.59264C12.5402 2.65059 12.6553 2.73521 12.7489 2.8409L18.5219 9.33591C19.0959 9.97991 18.6379 10.9999 17.7749 10.9999H6.2289C5.3669 10.9999 4.9089 9.97991 5.4819 9.33491L11.2549 2.8409Z"
        fill="white"
      />
    </svg>
  )
}
