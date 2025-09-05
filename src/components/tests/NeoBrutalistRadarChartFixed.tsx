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

// Custom angle tick component with better positioning
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomAngleTick = ({ x, y, payload, cx, cy }: any) => {
  if (!payload?.value) return <g />;

  const text = payload.value;
  
  // Calculate angle and distance from center
  const angle = Math.atan2(y - cy, x - cx);
  const distance = 40; // Increased distance from chart
  
  // Calculate offset position
  const offsetX = x + Math.cos(angle) * distance;
  const offsetY = y + Math.sin(angle) * distance;
  
  // Determine text dimensions based on content
  let lines: string[] = [];
  let boxWidth = 90;
  let boxHeight = 20;
  
  // Split long text into multiple lines
  if (text === "Доброжелательность") {
    lines = ["Доброжела-", "тельность"];
    boxWidth = 95;
    boxHeight = 28;
  } else if (text === "Эмоциональная стабильность") {
    lines = ["Эмоциональная", "стабильность"];
    boxWidth = 110;
    boxHeight = 28;
  } else if (text === "Открытость опыту") {
    lines = ["Открытость", "опыту"];
    boxWidth = 90;
    boxHeight = 28;
  } else if (text === "Экстраверсия") {
    lines = [text];
    boxWidth = 95;
  } else if (text === "Добросовестность") {
    lines = [text];
    boxWidth = 110;
  } else {
    lines = [text];
  }
  
  return (
    <g transform={`translate(${offsetX},${offsetY})`}>
      {/* Background rectangle */}
      <rect
        x={-boxWidth/2}
        y={-boxHeight/2}
        width={boxWidth}
        height={boxHeight}
        fill="#FFD23F"
        stroke="#000000"
        strokeWidth={2}
        rx={1}
      />
      {/* Shadow */}
      <rect
        x={-boxWidth/2 + 2}
        y={-boxHeight/2 + 2}
        width={boxWidth}
        height={boxHeight}
        fill="#000000"
        opacity={0.15}
        rx={1}
      />
      {/* Text */}
      {lines.length === 1 ? (
        <text
          x={0}
          y={0}
          fill="#000000"
          textAnchor="middle"
          dominantBaseline="central"
          className="font-heading font-bold uppercase"
          style={{ fontSize: "8px" }}
        >
          {lines[0]}
        </text>
      ) : (
        lines.map((line, index) => (
          <text
            key={index}
            x={0}
            y={-4 + index * 10}
            fill="#000000"
            textAnchor="middle"
            dominantBaseline="central"
            className="font-heading font-bold uppercase"
            style={{ fontSize: "7px" }}
          >
            {line}
          </text>
        ))
      )}
    </g>
  );
};

// Custom tooltip in neobrutalist style
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
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

export default function NeoBrutalistRadarChartFixed({
  data,
}: NeoBrutalistRadarChartProps) {
  
  // Fallback data if no data provided
  const fallbackData = [
    { factor: "Экстраверсия", value: 50 },
    { factor: "Доброжелательность", value: 50 },
    { factor: "Добросовестность", value: 50 },
    { factor: "Эмоциональная стабильность", value: 50 },
    { factor: "Открытость опыту", value: 50 }
  ];

  const chartData = (!data || !Array.isArray(data) || data.length === 0) ? fallbackData : data;
  
  return (
    <div className="relative w-full">

      {/* Main chart container */}
      <div className="bg-background border-2 border-border p-4 shadow-shadow">
        <ResponsiveContainer width="100%" height={600}>
          <RadarChart
            data={chartData}
            margin={{ top: 120, right: 140, bottom: 120, left: 140 }}
          >
            {/* Grid */}
            <PolarGrid
              stroke="#000000"
              strokeWidth={2}
              radialLines={true}
              gridType="polygon"
            />

            {/* Angle axis with custom labels */}
            <PolarAngleAxis 
              dataKey="factor" 
              tick={CustomAngleTick}
              className="font-heading"
            />

            {/* Radius axis */}
            <PolarRadiusAxis
              domain={[0, 100]}
              tick={{ 
                fontSize: 10, 
                fontWeight: "bold", 
                fill: "#000000",
                fontFamily: "var(--font-heading)"
              }}
              tickCount={6}
              axisLine={false}
              angle={90}
              tickFormatter={(value) => `${value}%`}
            />

            {/* Radar area */}
            <Radar
              name="Результат"
              dataKey="value"
              stroke="#FF6B35"
              fill="#FF6B35"
              fillOpacity={0.3}
              strokeWidth={3}
              dot={{ 
                fill: "#FF6B35", 
                stroke: "#000000",
                strokeWidth: 2, 
                r: 4 
              }}
            />

            {/* Custom tooltip */}
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Title */}
      <div className="absolute -top-2 left-4">
        <div className="bg-[#FFD23F] border-2 border-black px-4 py-2 shadow-[3px_3px_0px_0px_#000000]">
          <span className="font-heading font-bold text-sm uppercase text-black">
            Big Five Профиль
          </span>
        </div>
      </div>
    </div>
  );
}