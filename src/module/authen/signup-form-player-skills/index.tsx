import React, { useState } from 'react'
import { Button, SliderStar } from 'src/components'
import { Comments } from 'src/components/Comments'
const cls = require('./signup-form-player-skills.module.css')
import { GoBack } from 'src/components/go-back'
import { ItemSkills } from 'src/components/item-skills'
import { Input } from 'antd'
import { SpecialityTags } from 'src/components/speciality-tags'
import { useAtom } from 'jotai'
import { profileAtom } from 'src/atoms/profileAtom'
import { ROUTES } from 'src/constants/constants'
import { useRouter } from 'next/router'

interface FormValuesType {
  technics: number
  tactics: number
  physics: number
  mental: number
  attacking: number
  dribbling: number
  passing: number
  defending: number
  pace: number
  shooting: number
  note: string
  specialTags: string[]
}

export const SignUpFormPlayerSkills = () => {
  const [profileForm, setProfileForm] = useAtom(profileAtom)
  const { TextArea } = Input
  const router = useRouter()

  const [technics, setTechnics] = useState<number>(0)
  const [tactics, setTactics] = useState<number>(0)
  const [physics, setPhysics] = useState<number>(0)
  const [mental, setMental] = useState<number>(0)

  const [attacking, setAttacking] = useState<number>(0)
  const [dribbling, setDribbling] = useState<number>(0)
  const [passing, setPassing] = useState<number>(0)
  const [defending, setDefending] = useState<number>(0)
  const [pace, setPace] = useState<number>(0)
  const [shooting, setShooting] = useState<number>(0)

  const [note, setNote] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])

  const [errorFormValues, setErrorFormValues] = useState<FormValuesType>({
    technics: 0,
    tactics: 0,
    physics: 0,
    mental: 0,
    attacking: 0,
    dribbling: 0,
    passing: 0,
    defending: 0,
    pace: 0,
    shooting: 0,
    note: '',
    specialTags: [],
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let el = window.document.querySelector('.ant-form')
    if (!el) {
      return
    }

    el.classList.remove('ant-form')
  }, [])

  React.useEffect(() => {
    if (!profileForm.profile?.firstName) {
      router.push(ROUTES.SIGNUP_FORM)
    }
  }, [profileForm])

  console.log(technics, tactics, physics, mental)
  console.log(attacking, dribbling, passing, defending, pace, shooting)
  console.log(note, tags)
  console.log('profileForm', profileForm)

  const handleNext = (e: any) => {
    e.preventDefault()

    setProfileForm({
      ...profileForm,
      playerSkills: {
        specialityTags: tags,
        overall: {
          mental: mental,
          physics: physics,
          tactics: tactics,
          technics: technics,
          leftFoot: 0,
          rightFoot: 0,
        },
        radar: {
          attacking: attacking,
          defending: defending,
          dribbling: dribbling,
          passing: passing,
          shooting: shooting,
          pace: pace,
          tackling: 0,
          heading: 0,
        },
      },
      playerCareer: { ...profileForm.playerCareer, summary: note },
    })

    router.push(ROUTES.SIGNUP_FORM_BIOGRAPHY)
  }

  return (
    <div className="autofill2 w-screen min-h-screen float-left lg:flex md:items-center">
      <div className="absolute top-[16px] lg:top-[40px] md:left-[40px] z-20">
        <GoBack
          textBlack
          label="Sign up form"
          goBack={ROUTES.SIGNUP_FORM_PLAYER}
        />
      </div>

      <div className="absolute z-20 w-full bottom-12">
        <div className="mx-auto w-11/12 md:w-5/6 lg:w-2/3 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2">
          <ItemSkills className="w-[372px] h-[513px]">
            <>
              <p className="text-[24px] text-[#FFFFFF] mb-[48px]">
                Sign up form - player skills
              </p>
              <Comments
                listComment={[
                  {
                    img: '/avt-nick.svg',
                    text: 'Honestly now, how’s your football skills, specialities and attributes compared to peers in your age? Let’s start with an overall view.',
                  },
                ]}
                className="mb-[28px]"
              />
              <SliderStar
                star
                label="Technics"
                className="h-[60px]"
                setValues={setTechnics}
              />
              <SliderStar
                star
                label="Tactics"
                className="h-[60px]"
                setValues={setTactics}
              />
              <SliderStar
                star
                label="Physics"
                className="h-[60px]"
                setValues={setPhysics}
              />
              <SliderStar
                star
                label="Mental"
                className="h-[60px]"
                setValues={setMental}
              />
            </>
          </ItemSkills>

          <ItemSkills className="w-[372px] h-[513px]">
            <Comments
              listComment={[
                {
                  img: '/avt-nick.svg',
                  text: 'And to be a bit more detailed, so we can build you a radar chart.',
                },
              ]}
              className="mb-[30px]"
            />
            <SliderStar
              point
              label="Attacking"
              className="h-[60px]"
              setValues={setAttacking}
            />
            <SliderStar
              point
              label="Dribbling"
              className="h-[60px]"
              setValues={setDribbling}
            />
            <SliderStar
              point
              label="Passing"
              className="h-[60px]"
              setValues={setPassing}
            />
            <SliderStar
              point
              label="Defending"
              className="h-[60px]"
              setValues={setDefending}
            />
            <SliderStar
              point
              label="Pace"
              className="h-[60px]"
              setValues={setPace}
            />
            <SliderStar
              point
              label="Shooting"
              className="h-[60px]"
              setValues={setShooting}
            />
          </ItemSkills>
          <ItemSkills className="w-[372px] h-[513px]">
            <Comments
              listComment={[
                {
                  img: '/avt-nick.svg',
                  text: 'Now, write a short summary of yourself and add your specialities',
                },
              ]}
              className="mb-[30px]"
            />
            <TextArea
              className={`${cls.note} rounded-[8px] h-[150px]`}
              onChange={(e) => {
                setNote(e.target.value)
              }}
              placeholder="As for ex. - Fast, hard shooting, power foward and striker with an amazing left foot."
              autoSize={{ minRows: 5, maxRows: 5 }}
              rows={5}
            />
            <SpecialityTags label="Speciality tags" setTags={setTags} />

            <div onClick={handleNext}>
              <Button
                text="Next"
                className="bg-[#4654EA] rounded-[8px] text-[15px] w-full h-[48px] mt-[24px]"
              />
            </div>
          </ItemSkills>
        </div>
      </div>
    </div>
  )
}
