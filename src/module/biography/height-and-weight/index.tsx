import { InputAdornment } from '@mui/material'
import { MyInput } from 'src/components'
import { MyButton } from 'src/components/MyButton'
import { BackGround } from 'src/module/account-settings/common-components/Background'

export const HeightAndWeight = () => {
  return (
    <div className="space-y-5">
      <BackGround
        label="Height & Weight"
        className="2xl:w-3/5"
        contentClass="xl:w-[600px]"
      >
        <div className="space-y-6">
          <MyInput
            label="Weight"
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />
          <MyInput
            label="Height"
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
          <div className="grid grid-cols-2 gap-x-6">
            <MyInput
              label="Left foot"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">cm</InputAdornment>
                ),
              }}
            />
            <MyInput
              label="Right foot"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">cm</InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      </BackGround>
      <MyButton
        // onClick={handleSubmit}
        // isLoading={isLoading}
        type="submit"
        label="Save"
      />
    </div>
  )
}
