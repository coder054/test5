import clsx from 'clsx'
import { useAtom } from 'jotai'
import { dashboardTags } from 'src/atoms/dashboardTrainingAtom'

export const TrainingTags = () => {
  const [tags] = useAtom(dashboardTags)
  return (
    <div className="flex flex-col items-start space-y-8">
      <p className="font-bold text-[17px]">Practice Tag Cloud</p>
      <div className="flex flex-wrap  ">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={clsx(
              'bg-tags py-2 px-3 rounded-full my-2 mr-2',
              index < 30 ? 'block' : 'hidden'
            )}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
