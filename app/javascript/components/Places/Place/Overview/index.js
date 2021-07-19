import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { useI18n } from 'components/TranslationsProvider'

const Overview = ({ match }) => {
  const placeId = Number(match.params.id)
  const { t } = useI18n()

  return (
    <div>
      <Helmet>
        <title>{`${t('places.title')} | ${t('places.overview')}`}</title>
        <meta name="description" content={t('places.description')} />
      </Helmet>
      <div>Overview {placeId}</div>
    </div>
  )
}

Overview.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default Overview
