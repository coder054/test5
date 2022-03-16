import { useState } from 'react'
import { MyInputChips } from 'src/components'
import { MySlider } from 'src/components/MySlider'

export const Training = () => {
  const [tags, setTags] = useState<string[]>([])
  return (
    <div className="space-y-4">
      <MySlider
        label="How is your energy level?"
        // onChange={(e) => setProgress((prev) => ({ ...prev, energy: e }))}
        isAdjective
        step={25}
        // max={4}
        value={50}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Hours of Practice"
        // onChange={(e) => setProgress((prev) => ({ ...prev, energy: e }))}
        isPoint
        unit="h"
        step={4}
        // max={4}
        value={50}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Technics"
        unit="%"
        // onChange={(e) => setProgress((prev) => ({ ...prev, energy: e }))}
        isPoint
        step={10}
        // max={4}
        value={50}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Tactics"
        // onChange={(e) => setProgress((prev) => ({ ...prev, energy: e }))}
        isPoint
        unit="%"
        step={10}
        // max={4}
        value={50}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Physics"
        // onChange={(e) => setProgress((prev) => ({ ...prev, energy: e }))}
        isPoint
        unit="%"
        step={10}
        // max={4}
        value={50}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Mental"
        // onChange={(e) => setProgress((prev) => ({ ...prev, energy: e }))}
        isPoint
        unit="%"
        step={10}
        // max={4}
        value={50}
        labelClass="text-[#A2A5AD]"
      />
      <MyInputChips
        label="Practice tags"
        labelClass="text-[#A2A5AD]"
        value={tags}
        setTags={setTags}
      />
    </div>
  )
}
