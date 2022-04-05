import { styled, Tooltip, tooltipClasses } from '@mui/material'

interface TooltipCustomProps {
  className?: string
  children?: any
  title: string
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top'
}

export const TooltipCustom = ({
  className,
  children,
  title,
  placement,
}: TooltipCustomProps) => {
  const CustomTooltip = styled(
    ({ className, children, title, placement }: TooltipCustomProps) => (
      <Tooltip
        arrow
        classes={{ popper: className }}
        title={title}
        placement={placement}
      >
        {children}
      </Tooltip>
    )
  )(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#484A4D',
      color: '#ffffff',
      boxShadow: theme.shadows[1],
      fontSize: 16,
      maxWidth: 'none',
    },
  }))

  return (
    <CustomTooltip className={className} title={title} placement={placement}>
      {children}
    </CustomTooltip>
  )
}
