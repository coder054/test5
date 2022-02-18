import { Form } from 'antd'
import { MyInput } from 'components/MyInput'
import { useEffect, useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import { Loading } from 'components/loading/loading'
import cls from './location-search-input.module.css'
import { SvgPlace } from 'imports/svgs'

declare const window: any

interface LocationSearchInputProps {}

export const LocationSearchInput = () => {
  const [address, setAddress] = useState('')
  const [gmapsLoaded, setGmapsLoaded] = useState<boolean>(false)

  useEffect(() => {
    window.initMap = () => setGmapsLoaded(true)
    const gmapScriptEl = document.createElement(`script`)
    // gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8Z2bCGsFd5gPkbBwf6Z5rykMAT8tG9kE&libraries=places&callback=initMap`
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyACsPMTFY8RREvrQ5hHfZNrrh5KdYbRWiM&libraries=places&callback=initMap`
    // gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCHYCMrx7vUSIKrI4NAy3w-JIInILtJnps&libraries=places&callback=initMap`
    try {
      document
        ?.querySelector(`body`)
        ?.insertAdjacentElement(`beforeend`, gmapScriptEl)
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    // console.log('results', results[0].formatted_address)
    console.log('results[0].formatted_address', results[0].formatted_address)

    // setAddress(results[0].formatted_address)
    setAddress(value)
  }

  return (
    <div>
      {gmapsLoaded && (
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => {
            return (
              <div className="w-full">
                <Form.Item
                  className="mt-[24px]"
                  name={'city'}
                  rules={[
                    {
                      required: true,
                      message: 'Input your City where you are living in today',
                    },
                  ]}
                >
                  <MyInput
                    {...getInputProps({})}
                    name={'city'}
                    label="City where you are living in today"
                  />

                  <input className="hidden" />
                </Form.Item>
                <div>{loading && <Loading />}</div>
                <div className="">
                  {suggestions.map((suggestion, index) => {
                    const className = suggestion.active
                      ? `${cls.placeAutoActive} flex`
                      : `${cls.placeAuto} flex`
                    return (
                      <div
                        className="cursor-pointer -mt-[20px]"
                        key={index}
                        {...getSuggestionItemProps(suggestion, {
                          className,
                        })}
                      >
                        <div className="flex items-center ml-[4px]">
                          <SvgPlace />
                        </div>
                        <div
                          className={`${cls.textPlace} items-center flex ml-[2px] justify-between text-[14px] 
                          text-[#ffffff]`}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }}
        </PlacesAutocomplete>
      )}
    </div>
  )
}
