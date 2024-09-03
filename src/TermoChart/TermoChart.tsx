
import { useMemo } from 'react';
import Plot from 'react-plotly.js'
import * as Plotly from "plotly.js";
import { getAxisProps } from '../utils';

interface Props { data: any[]; trendData: any }

function TermoChart({ data, trendData }: Props) {
  const trendChartData = useMemo(() => {
    const keys = Object.keys(trendData.points)
    const y = keys.map(key => trendData.points[key]).filter(item => item !== undefined)

    return {
      endDate: trendData.criticalEndDate,
      x: Object.keys(trendData.points),
      y,
      max: Math.max(...y),
      min: Math.min(...y)
    }
  }, [trendData])

  const chartData = useMemo(() => {
    const x = data.map(item => item.time).filter(item => item !== undefined)
    const y = data.map(item => item.averageTemperature).filter(item => item !== undefined)

    return { 
      x,
      y,
      max: Math.max(...y),
      min: Math.min(...y),
      critical: data[0].criticalTemperature
    }
  }, [data])

  const charts = useMemo(() => ([
    {
      x: trendChartData.x,
      y: trendChartData.y,
      type: 'scatter',
      mode: 'lines+markers',
      marker: {color: 'red'},
      name: 'Тренд T\u1D49',
    },
    {
      x: chartData.x,
      y: chartData.y,
      type: 'scatter',
      mode: 'lines+markers',
      marker: {color: 'blue'},
      name: 'T\u1D49,\u00BAC',
    }
  ]), [trendChartData, chartData])

  const layout: Plotly.Layout = useMemo(() => ({
    width: 1000,
    height: 500,
    title: 'Termo Chart',
    yaxis: getAxisProps('Температура, \u00BAC'),
    xaxis: getAxisProps('Дата'),
    shapes: [
      {
        name: 'T\u1D49 max, \u00BAC',
        type: 'line',
        xref: 'paper',
        showlegend: true,
        x0: 0,
        y0: chartData.critical,
        x1: 1,
        y1: chartData.critical,
        line:{
            color: 'rgb(255, 0, 0)',
            width: 2,
            dash:'dot'
        }
      },
      {
        name: 'Конец эксплуатации',
        type: 'line',
        showlegend: true,
        x0: trendChartData.endDate,
        y0: chartData.min,
        x1: trendChartData.endDate,
        y1: trendChartData.max,
        line:{
            color: 'rgb(0, 0, 0)',
            width: 2,
            dash:'solid'
        }
      }
    ]
  }), [trendChartData, chartData])

  return (
      <Plot
        data={charts}
        layout={layout}
      />
  )
}

export default TermoChart
