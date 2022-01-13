import { ButtonAdd } from 'components/ButtonAdd'
import { Comments } from 'components/Comments'
import { FootballersSlider } from 'components/Feed/FootballersSlider/FootballersSlider'
import { GreenSlider } from 'components/GreenSlider'
// import { MyInput } from 'components/MyInput'
import { RainbowSlider } from 'components/RainbowSlider'
import { TagCloud } from 'components/TagCloud'
import { useState } from 'react'
import { TextField } from '@mui/material'
import { MyInput } from 'components/MyInput'

const Components = () => {
  const [value, setValue] = useState(7)
  const [valueInput, setValueInput] = useState('')

  return (
    <div className=" w-full min-h-screen bg-[#111115] ">
      <FootballersSlider />

      <div className="w-[507px] ">
        <TagCloud
          tags={[
            { label: 'HOME', link: '#' },
            { label: 'STAKE', link: '#' },
            { label: 'MARKETPLACE', link: '#' },
            { label: 'tsraw', link: '#' },
            { label: 'wzzf', link: '#' },
            { label: 'mgpnx', link: '#' },
            { label: 'w{}zx', link: '#' },
            { label: '5wrw', link: '#' },
          ]}
        />
      </div>

      <div className="w-[384px]">
        <Comments />
      </div>

      <ButtonAdd />

      <div className=" w-[439px] ">
        <GreenSlider />
      </div>

      <div className=" w-[439px] ">
        <RainbowSlider min={0} max={10} value={value} setValue={setValue} />
      </div>

      <div className="my-6 w-[500px] ">
        <MyInput
          placeholder={'Username'}
          value={valueInput}
          handleChange={(e) => {
            setValueInput(e.target.value)
          }}
        />
      </div>
    </div>
  )
}

export default Components
