import { type } from 'os'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { MyButton } from 'src/components/MyButton'
import { MyInput } from 'src/components/MyInput'
import { MySelect } from 'src/components/MySelect'
import { MyTextArea } from 'src/components/MyTextarea'
import { SvgX } from 'src/imports/svgs'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { crmCreateSupportTicket } from 'src/service/feed/yours.service'

interface ModalReportType {
  setOpenModalReport?: (value: boolean) => void
  reportUserName?: string
}

interface FormValuesType {
  priority: string
  title: string
  content: string
}

export const ModalReport = ({
  setOpenModalReport,
  reportUserName,
}: ModalReportType) => {
  const { userRoles, currentRoleName } = useAuth()

  const { isLoading, mutate: createSupport } = useMutation(
    '',
    crmCreateSupportTicket,
    {
      onSuccess: () => {
        toast.success('Your feedback was updated!')
        setOpenModalReport && setOpenModalReport(false)
      },
    }
  )

  const yourName = useMemo(() => {
    const res = userRoles.map((item) => {
      if (item.role === currentRoleName) {
        return item.username
      }
    })

    return res
  }, [userRoles, currentRoleName])

  const [formValues, setFormValues] = useState<FormValuesType>({
    priority: 'LOW',
    title: 'Report',
    content: `User ${yourName.slice(
      1
    )} wants to report that user ${reportUserName}`,
  })

  const handleChangeForm = (type: keyof FormValuesType, value: string) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleOnClick = () => {
    const valuePost = {
      subject: formValues.title,
      content: formValues.content,
      priority: formValues.priority,
    }
    try {
      createSupport(valuePost)
    } catch (error) {}
  }

  return (
    <div className="space-y-7">
      <div
        onClick={() => {
          setOpenModalReport && setOpenModalReport(false)
        }}
      >
        <SvgX className={'w-[24px] float-right cursor-pointer'} />
      </div>
      <p className="text-center text-[20px] font-semibold">Support</p>
      <MySelect
        label="Priority"
        value={formValues.priority}
        arrOption={[
          { label: 'Low', value: 'LOW' },
          { label: 'Medium', value: 'MEDIUM' },
          { label: 'High', value: 'HIGH' },
        ]}
        onChange={(e) => handleChangeForm('priority', e.target.value)}
      />
      <MyInput
        label="Title"
        value={formValues.title}
        onChange={(e) => handleChangeForm('title', e.target.value)}
      />
      <MyTextArea
        label={'Content'}
        value={formValues.content}
        onChange={(e) => handleChangeForm('content', e.target.value)}
      />

      <MyButton
        label="Submit"
        className="w-full h-[48px] bg-[#4654EA]"
        type="button"
        onClick={handleOnClick}
      />
    </div>
  )
}
