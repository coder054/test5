import clsx from 'clsx'
const cls = require('./item-skills.module.css')

interface ItemSkillsProps {
  children: any
  className?: string
}

export const ItemSkills = ({ children, className }: ItemSkillsProps) => {
  const classNames = clsx(className && className)
  return (
    <div className={`${classNames} ${cls.item} rounded-[8px]`}>{children}</div>
  )
}
