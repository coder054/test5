import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { Logo } from 'src/components/logo'
import { FAQsType } from 'src/constants/types/support/support.types'
import { Footer } from '../landing-page/components/Footer'

interface FQAsProps {
  data: FAQsType
}

const SECTIONS = {
  'ABOUT ZPORTER': 'About Zporter',
  BIOGRAPHY: 'Biography',
  'MESSAGES & NOTIFICATIONS': 'Messages & Notifications',
  SIGN_UP_IN: 'Sign up & Sign in',
  DIARY: 'Diary',
  ACCOUNT_SETTINGS: 'Account & Settings',
  FEED: 'Feed',
}

export default function Support({ data }: FQAsProps) {
  const router = useRouter()
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (_: unknown, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const TOPICS = useMemo(() => {
    return data.topics.map((it: string) => ({
      section: it,
      data: data.faqs.filter((item) => item.topic === it),
    }))
  }, [data])

  return (
    <div className="bg-[#13131C]">
      <div className="p-8">
        <button onClick={() => router.push('/dashboard')}>
          <Logo />
        </button>
        <p className="text-3xl text-center font-bold">FAQs</p>
        <div className="tabletM:w-2/5 mx-auto">
          {TOPICS.map((it) => (
            <div className="my-2 text-[#09E099]" key={it.section}>
              <p className="text-xl my-2 font-semibold">
                {SECTIONS[it.section]}
              </p>
              {it.data.map((it, index) => (
                <Accordion
                  key={index}
                  className="bg-transparent"
                  expanded={expanded === it.question}
                  onChange={handleChange(it.question)}
                >
                  <AccordionSummary
                    className="py-2 tabletM:py-3"
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography className="text-sm tabletM:text-base">
                      {it.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="text-sm tabletM:text-base pl-3">
                      {it.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
