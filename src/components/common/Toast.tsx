import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import {
  FaInfo,
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaExclamationCircle,
} from 'react-icons/fa'

export const displayIcon = (type) => {
  switch (type) {
    case 'success':
      return <FaCheck />
    case 'info':
      return <FaInfo />
    case 'error':
      return <FaExclamationCircle />
    case 'warning':
      return <FaExclamationTriangle />
    default:
      return <FaBug />
  }
}

export const notiToast = ({
  type,
  message,
}: {
  type: 'success' | 'info' | 'error' | 'warning'
  message: string
}) =>
  toast[type](
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: '8px 12px' }}>
        {message}
      </div>
    </div>
  )

notiToast.dismiss = toast.dismiss
