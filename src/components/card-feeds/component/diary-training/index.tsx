import { ChartCircle } from 'src/components/chart-circle'
import { CardFeedType } from 'src/constants/types/feed/yours'
import { ItemTraining } from './item/item-training'
import { settings } from 'src/constants/constants'
import { useQuery } from 'react-query'
import { getDiaryById } from 'src/service/feed/yours.service'
import { ItemLineChart } from './item/item-line-chart'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import { ItemInjuries } from './item/item-injuries'
import { isEmpty } from 'lodash'
import { useState } from 'react'
import { ModalMui } from 'src/components/ModalMui'
import { isMobile } from 'react-device-detect'
import { XIcon } from 'src/components/icons'
import SimpleBar from 'simplebar-react'
import { ModalDiaryTraining } from './item/modal-diary-training'

interface CardDiaryTrainingProps {
  card: CardFeedType
}

export const CardDiaryTraining = ({ card }: CardDiaryTrainingProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div>
      <div
        className="h-[225px] pl-[20px]"
        onClick={() => {
          setOpenModal(true)
        }}
      >
        <ItemTraining card={card && card} />
      </div>

      <ModalMui
        sx={{
          padding: 0,
          top: '50%',
          width: isMobile ? '100%' : 900,
          overflow: 'auto',
        }}
        isOpen={openModal}
        onClose={setOpenModal}
      >
        <SimpleBar style={{ maxHeight: 850 }}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="absolute z-50 right-6 top-5"
            >
              <XIcon />
            </button>
            <ModalDiaryTraining card={card} />
          </div>
        </SimpleBar>
      </ModalMui>
    </div>
  )
}
