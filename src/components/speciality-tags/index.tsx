import ChipInput from 'material-ui-chip-input'
import { useState } from 'react'
const cls = require('./speciality-tags.module.css')

interface SpecialityTagsProps {
  label?: string
  listSpecial?: string[]
  setTags?: Function
}

export const SpecialityTags = ({
  label,
  listSpecial,
  setTags,
}: SpecialityTagsProps) => {
  const [chips, setChips] = useState<string[]>([])

  const handleAddChip = (chip: string) => {
    if (chips.length >= 10) {
      return
    }
    setChips((prev) => [...prev, chip])
    setTags && setTags((prev) => [...prev, chip])
  }

  const handleDeleteChip = (chip: string, index: number) => {
    setChips((prev) => prev.filter((item) => item !== chip))
    setTags && setTags((prev) => prev.filter((item) => item !== chip))
  }

  return (
    <div>
      <p className="text-base text-white mb-[8px] mt-[16px]">{label}</p>
      <ChipInput
        fullWidth
        value={chips}
        onAdd={(chip) => handleAddChip(chip)}
        onDelete={(chip, index) => handleDeleteChip(chip, index)}
      />
    </div>
  )
}
