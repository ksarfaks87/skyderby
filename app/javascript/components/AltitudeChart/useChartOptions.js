import { useMemo } from 'react'
import merge from 'lodash.merge'

import { useI18n } from 'components/TranslationsProvider'
import { restoreSeriesVisibility, saveSeriesVisibility } from 'utils/chartSeriesSettings'
import { msToKmh } from 'utils/unitsConversion'

const chartName = 'AltitudeRangeSelect'

const onChartLoad = function () {
  restoreSeriesVisibility(chartName, this.series)
}

const onLegendItemClick = function () {
  saveSeriesVisibility(chartName, this.options.code, !this.visible)
}

const baseOptions = () => ({
  chart: {
    marginLeft: 16,
    marginRight: 16,
    events: {
      load: onChartLoad
    }
  },
  title: {
    text: null
  },
  plotOptions: {
    series: {
      marker: {
        radius: 1
      },
      events: {
        legendItemClick: onLegendItemClick
      }
    }
  },
  yAxis: [
    {
      title: {
        text: null
      },
      min: 0,
      tickInterval: 500,
      labels: {
        x: 25,
        y: -2
      }
    },
    {
      title: {
        text: null
      },
      gridLineWidth: 0,
      min: 0,
      opposite: true,
      visible: false
    }
  ],
  xAxis: {
    minPadding: 0,
    maxPadding: 0
  },
  tooltip: {
    crosshairs: true,
    shared: true
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  }
})

const buildSeries = (points, t) => {
  const altitudePoints = points.map(el => [
    Math.round((el.flTime - points[0].flTime) * 10) / 10,
    Math.round(el.altitude)
  ])

  const horizontalSpeed = points.map(el => [
    Math.round((el.flTime - points[0].flTime) * 10) / 10,
    Math.round(msToKmh(el.hSpeed))
  ])

  const verticalSpeed = points.map(el => [
    Math.round((el.flTime - points[0].flTime) * 10) / 10,
    Math.round(msToKmh(el.vSpeed))
  ])

  return {
    series: [
      {
        name: t('charts.all_data.series.height'),
        type: 'area',
        code: 'height',
        data: altitudePoints,
        yAxis: 0,
        color: '#9ec8f1',
        tooltip: {
          valueSuffix: ` ${t('units.m')}`,
          valueDecimals: 0
        }
      },
      {
        name: t('charts.all_data.series.horiz_speed'),
        type: 'spline',
        code: 'ground_speed',
        data: horizontalSpeed,
        yAxis: 1,
        color: '#52A964',
        lineWidth: 1,
        tooltip: {
          valueSuffix: ` ${t('units.kmh')}`,
          valueDecimals: 0
        }
      },
      {
        name: t('charts.all_data.series.vert_speed'),
        type: 'spline',
        code: 'vertical_speed',
        data: verticalSpeed,
        yAxis: 1,
        color: '#A7414E',
        lineWidth: 1,
        tooltip: {
          valueSuffix: ` ${t('units.kmh')}`,
          valueDecimals: 0
        }
      }
    ]
  }
}

const useChartOptions = (points, additionalOptions) => {
  const { t } = useI18n()
  const series = useMemo(() => buildSeries(points, t), [points, t])

  const options = useMemo(() => merge(baseOptions(), additionalOptions, series), [
    additionalOptions,
    series
  ])

  return options
}

export default useChartOptions
