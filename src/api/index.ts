const getMeasurementsTrend = async (sensorType: 'ThermistorChain' | 'DeformationControl') => {
  try {
    const response = await fetch(`/api/measurements/trend/${sensorType}`)
    const body = await response.json()
    return body
  } catch (e) {
    console.error('getMeasurementsTrend fetch error')
    return null
  }
}

const getMeasurements = async (sensorType: 'ThermistorChain' | 'DeformationControl') => {
  try {
    const response = await fetch(`/api/measurements/${sensorType}`)
    const body = await response.json()
    return body
  } catch (e) {
    console.error('getMeasurements fetch error')
    return null
  }
}

export { getMeasurements, getMeasurementsTrend }
