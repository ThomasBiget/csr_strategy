"use client"
import Link from 'next/link'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  LabelList,
  Cell
} from "recharts";
import { GraphAction } from '../../src/@types/actions'

interface EnjeuProps {
    id: number;
    label: string;
    color: string;
    pilier: string;
    esrs: string;
    business_impact: number;
    soc_en_impact: number;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
  }


export default function MatriceConfiguration({ dataEnjeux }: GraphAction[]) {


  return (
    <div>
      <ScatterChart
      width={800}
      height={500}
      margin={{
        top: 60,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid />
      <XAxis
        type="number"
        dataKey="x"
        domain={[0, 10]}
        name="Impact sur le business (financier)"
        label={{ value: 'Impact sur le business', position: 'bottom', offset: 0 }}
        ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        interval={0}
      />
      <YAxis
        type="number"
        dataKey="y"
        domain={[0, 10]}
        name="Impact environnemental et social"
        label={{ value: 'Impact environnemental et social', angle: -90, position: 'insideLeft', dy: 100 }}
        ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        interval={0}
      />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter data={dataEnjeux} fill={dataEnjeux.color} r={30}>
        <LabelList dataKey="label" position="top" />
        {dataEnjeux.map((enjeu: GraphAction, index: number) => (
          <Cell key={`cell-${index}`} fill={enjeu.color} />
        ))}
      </Scatter>
      <ReferenceArea x1={0} x2={10} y1={8} y2={10} fill="rgba(0,0,0,0.1)" stroke="none" />
      <ReferenceArea x1={8} x2={10} y1={0} y2={10} fill="rgba(0,0,0,0.1)" stroke="none" />
    </ScatterChart>
    </div>
  );
};