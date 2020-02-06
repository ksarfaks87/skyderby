import React from 'react'
import PropTypes from 'prop-types'
import I18n from 'i18n-js'
import { useSelector } from 'react-redux'

import { METRIC, IMPERIAL } from 'redux/userPreferences/unitSystem'
import { msToKmh, msToMph } from 'utils/unitsConversion'

import ChevronDown from 'icons/chevron-down.svg'
import ChevronUp from 'icons/chevron-up.svg'
import WindEffect from './WindEffect'
import {
  SummaryItem,
  Title,
  ValueContainer,
  Value,
  Units,
  MinMaxValue,
  Min,
  Max
} from './elements'

const valuePresentation = (value, unitSystem) => {
  const placeholder = '---'
  if (!Number.isFinite(value)) return placeholder

  if (unitSystem === METRIC) return Math.round(msToKmh(value))
  if (unitSystem === IMPERIAL) return Math.round(msToMph(value))

  return placeholder
}

const HorizontalSpeed = ({ value = { avg: 111, min: 12, max: 139 } }) => {
  const { unitSystem } = useSelector(state => state.userPreferences)
  const units = unitSystem === METRIC ? 'kmh' : 'mph'

  return (
    <SummaryItem value="ground-speed">
      <Title>{I18n.t('tracks.indicators.ground_speed')}</Title>
      <ValueContainer>
        <Value data-testid="value[avg]">{valuePresentation(value.avg, unitSystem)}</Value>
        <MinMaxValue>
          <Max>
            <span data-testid="value[max]">
              {valuePresentation(value.max, unitSystem)}
            </span>
            <ChevronUp />
          </Max>
          <Min>
            <span data-testid="value[min]">
              {valuePresentation(value.min, unitSystem)}
            </span>
            <ChevronDown />
          </Min>
        </MinMaxValue>
        <Units>{I18n.t(`units.${units}`)}</Units>
      </ValueContainer>

      <WindEffect rawValue={111} zeroWindValue={139} />
    </SummaryItem>
  )
}

HorizontalSpeed.propTypes = {
  value: PropTypes.shape({
    avg: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number
  }).isRequired
}

export default HorizontalSpeed
