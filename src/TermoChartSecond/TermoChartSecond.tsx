
import { useMemo } from 'react';
import Plot from 'react-plotly.js'
import * as Plotly from "plotly.js";
import { getAxisProps } from '../utils';

interface Props { data: any[]; }

function TermoChart({ data }: Props) {
  const charts = useMemo(() => {
    return data.slice(0, 5).map((el) => ({ 
      name: el.time,
      x: Object.keys(el.data).map(key => el.data[key].value),
      y: Object.keys(el.data),
      type: 'scatter',
      mode: 'lines+markers',
    }))
  }, [data])

  const layout: Plotly.Layout = useMemo(() => ({
    width: 1000,
    height: 500,
    title: 'Termo Chart Second',
    xaxis: getAxisProps('Температура, \u00BAC'),
    yaxis: getAxisProps('Глубина, м', { autorange: 'reversed' }),
    shapes: [
      {
        name: 'T\u1D49 max, \u00BAC',
        type: 'line',
        // xref: 'paper',
        showlegend: true,
        x0: data[0].criticalTemperature,
        y0: 0,
        x1: data[0].criticalTemperature,
        y1: 30,
        line:{
            color: 'rgb(255, 0, 0)',
            width: 2,
            dash:'dot'
        }
      },
    ]
  }), [data])

  return (
      <Plot
        data={charts}
        layout={layout}
      />
  )
}

export default TermoChart
