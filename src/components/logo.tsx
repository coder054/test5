import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { imgLogo } from 'src/imports/images'

interface LogoProps {
  variant?: 'light' | 'primary'
}

export const Logo = styled((props: LogoProps) => {
  const { variant, ...rest } = props

  const color = variant === 'light' ? '#C1C4D6' : '#5048E5'

  return <Image src={imgLogo} alt="" />
})``

Logo.defaultProps = {
  variant: 'primary',
}

Logo.propTypes = {
  variant: PropTypes.oneOf(['light', 'primary']),
}
