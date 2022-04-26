import { InputAdornment, TextField } from '@mui/material'
import { SearchIcon } from 'src/icons/search'
import { useRef, useEffect, useState } from 'react'
import { MiniLoading } from '../mini-loading'

type SearchFieldProps = {
  isLoading?: boolean
  onChange: (value: string) => void
  label: string
}

const SearchField = ({ onChange, label, isLoading }: SearchFieldProps) => {
  const [isHasValue, setIsHasValue] = useState<string>('')
  return (
    <TextField
      name={label}
      onChange={(e) => {
        onChange(e.target.value.trim())
        setIsHasValue(e.target.value)
      }}
      fullWidth
      size="small"
      placeholder="Search"
      autoComplete="off"
      sx={{ background: '#202128cc' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            {isHasValue && isLoading ? (
              <MiniLoading color="#ffffff" size={18} />
            ) : (
              <SearchIcon fontSize="small" />
            )}
          </InputAdornment>
        ),
      }}
    />
  )
}
export default SearchField
