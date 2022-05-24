import { Form, Spin } from 'antd'
import { MyInput } from 'src/components/MyInput'
import { useEffect, useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import { Loading } from 'src/components/loading/loading'
const cls = require('./location-search-input.module.css')
import { SvgPlace } from 'src/imports/svgs'

declare const window: any

interface LocationSearchInputProps {
  errorMessage?: string
  setCity?: Function
  feed?: boolean
}

export const LocationSearchInput = ({
  setCity,
  errorMessage,
  feed,
}: LocationSearchInputProps) => {
  const [address, setAddress] = useState('')
  const [gmapsLoaded, setGmapsLoaded] = useState<boolean>(false)

  useEffect(() => {
    window.initMap = () => setGmapsLoaded(true)
    const gmapScriptEl = document.createElement(`script`)
    // gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD7JfGqgH_Y4opp0B7zgXEJe9FFa26phtE&libraries=places&callback=initMap`
    try {
      document
        ?.querySelector(`body`)
        ?.insertAdjacentElement(`beforeend`, gmapScriptEl)
    } catch (error) {
      return
    }
  }, [])

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    setCity && setCity(results[0].formatted_address)
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
                <MyInput
                  {...getInputProps({})}
                  name={'city'}
                  label={
                    feed ? 'Location' : 'City where you are living in today'
                  }
                  className="mt-[24px]"
                />

                <input className="hidden" />

                <Spin spinning={loading}>
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
                </Spin>
                {errorMessage && (
                  <p className="text-[#D60C0C] text-[14px]">{errorMessage}</p>
                )}
              </div>
            )
          }}
        </PlacesAutocomplete>
      )}
    </div>
  )
}
