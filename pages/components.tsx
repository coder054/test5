import { ButtonAdd } from 'components/ButtonAdd'
import { Comments } from 'components/Comments'
import { FootballersSlider } from 'components/Feed/FootballersSlider/FootballersSlider'
import { GreenSlider } from 'components/GreenSlider'
import { RainbowSlider } from 'components/RainbowSlider'
import { TagCloud } from 'components/TagCloud'

const Components = () => {
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
        <RainbowSlider />
      </div>
    </div>
  )
}

export default Components
