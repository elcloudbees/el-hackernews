import Rox from 'rox-browser'
import { betaAccess, isLoggedIn, getCompany } from './users'

export const configurationFetchedHandler = fetcherResults => {
  console.log(fetcherResults)
  if (fetcherResults.hasChanges && fetcherResults.fetcherStatus === 'APPLIED_FROM_NETWORK') {
    window.location.reload(false)
  }
}

export const impressionHandler = (reporting) => {
  if (reporting.targeting) {
    console.log('flag ' + reporting.name + ' value is ' + reporting.value)
  } else {
    console.log('No experiment configured for flag ' + reporting.name + '. default value ' + reporting.value + ' was used')
  }
}

//const API_HOST = 'https://api.cloudbees.io'
//const API_HOST = 'https://api-staging.saas-dev.beescloud.com'
const options = {
  configurationFetchedHandler: configurationFetchedHandler,
  impressionHandler: impressionHandler/*,
  configuration: {
    CD_API_ENDPOINT: 'https://api.saas-preprod.beescloud.com/device/get_configuration',
    CD_S3_ENDPOINT: 'https://rox-conf.saas-preprod.beescloud.com/',
    SS_API_ENDPOINT: 'https://api.saas-preprod.beescloud.com/device/update_state_store/',
    SS_S3_ENDPOINT: 'https://development-statestore.rollout.io/',
    CLIENT_DATA_CACHE_KEY: 'client_data',
    ANALYTICS_ENDPOINT: 'https://localhost:8787',
    NOTIFICATIONS_ENDPOINT: 'https://api.saas-preprod.beescloud.com/sse'
  },
  debugLevel: 'verbose',
  disableSignatureVerification: true
  */
    
  /*,
  configuration: {
    API_HOST: API_HOST,
    CD_API_ENDPOINT: `${API_HOST}/device/get_configuration`,
    CD_S3_ENDPOINT: 'https://development-conf.rollout.io/',
    SS_API_ENDPOINT: `${API_HOST}/device/update_state_store/`,
    SS_S3_ENDPOINT: 'https://development-statestore.rollout.io/',
    CLIENT_DATA_CACHE_KEY: 'client_data',
    ANALYTICS_ENDPOINT: 'https://localhost:8787',
    NOTIFICATIONS_ENDPOINT: 'https://api-staging.saas-dev.beescloud.com/sse'
  },
  debugLevel: 'verbose',
  disableSignatureVerification: true*/
}

export const Flags = {
  score: new Rox.Flag(false),
  ask: new Rox.Flag(false),
  show: new Rox.Flag(false),
  headerColor: new Rox.RoxString('is-dark', ['is-dark', 'is-primary', 'is-white'])
  
}

Rox.setCustomBooleanProperty('isBetaUser', betaAccess())
Rox.setCustomBooleanProperty('isLoggedIn', isLoggedIn())
Rox.setCustomStringProperty('company', getCompany())
//Rox.setCustomStringProperty('getGregProperty', getCompany())

Rox.register('default', Flags)
Rox.setup('ad588b34-ef7c-4d76-5d4c-16ee6ab48b44', options)
//Rox.setup('7187091f-0ce5-40a6-48f0-d1d8e82fc1ef', options)

