import { setupWorker } from 'msw/browser'
import { http, HttpResponse } from 'msw'
import deformationResponse from './deformation_response.json'
import termoResponse from './termo_response.json'
import deformationTrendResponse from './deformation_trend_response.json'
import termoTrendResponse from './termo_trend_response.json'
 
export const worker = setupWorker(
  http.get('/api/measurements/:id', ({ params }) => {
    const { id } = params

    if (!id) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(id === 'DeformationControl' ? deformationResponse : termoResponse)
  }),
  http.get('/api/measurements/trend/:id', ({ params }) => {
    const { id } = params

    if (!id) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(id === 'DeformationControl' ? deformationTrendResponse : termoTrendResponse)
  }),
)