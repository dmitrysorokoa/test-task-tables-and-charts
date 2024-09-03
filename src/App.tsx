import { useEffect, useState } from 'react'

import { getMeasurements, getMeasurementsTrend } from './api'
import TermoTable from './TermoTable/TermoTable'
import DeformationTable from './DeformationTable/DeformationTable'
import DeformationChart from './DeformationChart/DeformationChart'
import TermoChart from './TermoChart/TermoChart'
import TermoChartSecond from './TermoChartSecond/TermoChartSecond'

function App() {
  const [termoData, setTermoData] = useState<any[]>([]);
  const [termoDepths, setTermoDepths] = useState<Array<number>>([]);
  const [deformationData, setDeformationData] = useState<any[]>([]);
  const [deformationTrendData, setDeformationTrendData] = useState<any>(null);
  const [termoTrendData, setTermoTrendData] = useState<any>(null);
  
  useEffect(() => {
    getMeasurementsTrend('DeformationControl').then((body => {
      if (body) {
        setDeformationTrendData(body.data)
      }
    }))

    getMeasurementsTrend('ThermistorChain').then((body => {
      if (body) {
        setTermoTrendData(body.data)
      }
    }))

    getMeasurements('DeformationControl').then((body => {
      if (body) {
        setDeformationData(body.data)
      }
    }))

    getMeasurements('ThermistorChain').then((body => {
      if (body) {
        const allDepths: number[] = [];
        body.data.forEach((item: any) => {
          Object.keys(item.data).forEach(key => {
            if (!allDepths.includes(Number(key))) {
              allDepths.push(Number(key))
            }
          })
        }, [])

        allDepths.sort((a, b) => a - b)
        setTermoDepths(allDepths)
        setTermoData(body.data);
      }
    }))
  }, [])

  return (
    <div className='p-1'>
      <div className='p-1'>
        <DeformationTable data={deformationData} />
      </div>
     
      <div className='p-1'>
        <TermoTable data={termoData} depths={termoDepths} />
      </div>
      
      <div className='p-1'>
        {deformationTrendData &&
          <DeformationChart data={deformationData} trendData={deformationTrendData} />
        }
      </div>

      <div className='p-1'>
        {termoTrendData && termoData.length &&
          <TermoChart data={termoData} trendData={termoTrendData} />
        }
      </div>

      <div className='p-1'>
        {termoData.length &&
          <TermoChartSecond data={termoData} />
        }
      </div>
    </div>
  )
}

export default App
