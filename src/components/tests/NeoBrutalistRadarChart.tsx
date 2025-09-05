"use client";

import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ChartDataPoint {
  factor: string;
  value: number;
}

interface NeoBrutalistRadarChartProps {
  data: ChartDataPoint[];
}

// Простой компонент для отображения меток на осях (упрощенная версия для отладки)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SimpleCustomAngleTick = ({ x, y, payload }: any) => {
  console.log('SimpleCustomAngleTick props:', { x, y, payload });
  
  if (!payload?.value) {
    console.log('No payload value in SimpleCustomAngleTick');
    return <g />;
  }

  const text = payload.value;
  console.log('Rendering tick for:', text);

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Простая желтая рамка */}
      <rect
        x={-30}
        y={-10}
        width={60}
        height={20}
        fill="#FFD23F"
        stroke="#000000"
        strokeWidth={2}
      />
      {/* Простой текст */}
      <text
        x={0}
        y={0}
        fill="#000000"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-bold text-xs"
      >
        {text.length > 12 ? text.substring(0, 12) + '...' : text}
      </text>
    </g>
  );
};

// Кастомный tooltip в необруталистическом стиле
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChartDataPoint;
    value: number;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative">
        <div className="bg-[#FF6B35] border-2 border-black p-3">
          <p className="font-heading font-bold text-sm uppercase text-black">
            {payload[0].payload.factor}
          </p>
          <p className="font-heading font-black text-2xl text-black">
            {payload[0].value}%
          </p>
        </div>
        <div className="absolute top-1 left-1 w-full h-full bg-black -z-10" />
      </div>
    );
  }
  return null;
};

export default function NeoBrutalistRadarChart({
  data,
}: NeoBrutalistRadarChartProps) {
  // Debug logging
  console.log('NeoBrutalistRadarChart received data:', data);
  console.log('Data type:', typeof data);
  console.log('Data is array:', Array.isArray(data));
  console.log('Data length:', data?.length);
  
  // Test data for fallback
  const testData = [
    { factor: "Экстраверсия", value: 75 },
    { factor: "Доброжелательность", value: 60 },
    { factor: "Добросовестность", value: 85 },
    { factor: "Эмоциональная стабильность", value: 45 },
    { factor: "Открытость опыту", value: 70 }
  ];
  
  // Use test data if no data or invalid data
  const chartData = (!data || !Array.isArray(data) || data.length === 0) ? testData : data;
  
  console.log('Final chartData being used:', chartData);
  
  // Error boundary component
  try {
    return (
      <div className="relative">
        <div className="mb-4 p-2 bg-gray-100 text-xs text-gray-600 border">
          Debug Info: Using {chartData === testData ? 'TEST' : 'REAL'} data | 
          Data points: {chartData.length} | 
          {chartData.map(d => `${d.factor}: ${d.value}`).join(', ')}
        </div>

        <ResponsiveContainer width="100%" height={500}>
          <RadarChart
            data={chartData}
            margin={{ top: 80, right: 150, bottom: 80, left: 150 }}
          >
          <defs>
            <pattern
              id="gridPattern"
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
            >
              <rect width="1" height="1" fill="#000000" opacity="0.1" />
            </pattern>
          </defs>

          <PolarGrid
            stroke="#000000"
            strokeWidth={2}
            radialLines={true}
            gridType="polygon"
            strokeDasharray="0"
          />

          <PolarAngleAxis dataKey="factor" tick={SimpleCustomAngleTick} />

          <PolarRadiusAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fontWeight: "bold", fill: "#000000" }}
            tickCount={6}
            axisLine={false}
            angle={90}
            tickFormatter={(value) => `${value}`}
            className="font-heading"
          />

          <Radar
            name="Результат"
            dataKey="value"
            stroke="#FF6B35"
            fill="#FF6B35"
            fillOpacity={0.6}
            strokeWidth={3}
          />

          <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  } catch (error) {
    console.error('Error rendering NeoBrutalistRadarChart:', error);
    return (
      <div className="text-center py-8">
        <div className="text-red-500 font-bold">Error rendering radar chart</div>
        <div className="text-sm text-gray-600 mt-2">Check console for details</div>
        <div className="mt-4 p-4 bg-gray-100 text-left text-xs">
          <strong>Debug info:</strong><br/>
          Data received: {JSON.stringify(data, null, 2)}
        </div>
      </div>
    );
  }
}
