'use client';

import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

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

  // Universal text wrapping logic
  let lines: string[] = [];
  let boxWidth = 90;
  let boxHeight = 20;

  const words = text.split(' ');
  const maxCharsPerLine = 16; // Maximum characters per line

  if (words.length === 1) {
    // Single word - no split possible
    lines = [text];
    boxWidth = Math.max(90, Math.min(130, text.length * 7));
  } else if (text.length <= maxCharsPerLine) {
    // Short text - single line
    lines = [text];
    boxWidth = Math.max(90, Math.min(130, text.length * 7));
  } else {
    // Multi-word text that needs splitting
    // Find optimal split point
    let bestSplit = 1;
    let minDiff = Infinity;

    for (let i = 1; i < words.length; i++) {
      const line1 = words.slice(0, i).join(' ');
      const line2 = words.slice(i).join(' ');

      // Check if both lines fit within max chars
      if (line1.length <= maxCharsPerLine && line2.length <= maxCharsPerLine) {
        const diff = Math.abs(line1.length - line2.length);
        if (diff < minDiff) {
          minDiff = diff;
          bestSplit = i;
        }
      }
    }

    lines = [words.slice(0, bestSplit).join(' '), words.slice(bestSplit).join(' ')];
    boxHeight = 28;

    // Set box width based on longest line
    const maxLineLength = Math.max(lines[0].length, lines[1].length);
    boxWidth = Math.max(90, Math.min(130, maxLineLength * 7));
  }

  // If we have 2 lines and they're still too long, adjust height
  if (lines.length === 2 && (lines[0].length > 15 || lines[1].length > 15)) {
    boxHeight = 32;
  }

  return (
    <g transform={`translate(${offsetX},${offsetY})`}>
      {/* Background rectangle */}
      <rect
        x={-boxWidth / 2}
        y={-boxHeight / 2}
        width={boxWidth}
        height={boxHeight}
        fill="#FFD23F"
        stroke="#000000"
        strokeWidth={2}
        rx={1}
      />
      {/* Shadow */}
      <rect
        x={-boxWidth / 2 + 2}
        y={-boxHeight / 2 + 2}
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
          style={{ fontSize: '8px' }}
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
            style={{ fontSize: '8px' }}
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
          <p className="font-heading font-black text-2xl text-black">{payload[0].value}%</p>
        </div>
        <div className="absolute top-1 left-1 w-full h-full bg-black -z-10" />
      </div>
    );
  }
  return null;
};

export default function NeoBrutalistRadarChartFixed({ data }: NeoBrutalistRadarChartProps) {
  // Fallback data if no data provided
  const fallbackData = [
    { factor: 'Экстраверсия', value: 50 },
    { factor: 'Доброжелательность', value: 50 },
    { factor: 'Добросовестность', value: 50 },
    { factor: 'Эмоциональная стабильность', value: 50 },
    { factor: 'Открытость опыту', value: 50 },
  ];

  const chartData = !data || !Array.isArray(data) || data.length === 0 ? fallbackData : data;

  return (
    <div className="relative w-full">
      {/* Main chart container */}
      <div
        className="bg-background border-2 border-border p-4 shadow-shadow outline-none [&_*]:outline-none select-none"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <ResponsiveContainer width="100%" height={600}>
          <RadarChart data={chartData} margin={{ top: 140, right: 160, bottom: 140, left: 160 }}>
            {/* Grid */}
            <PolarGrid
              stroke="#000000"
              strokeWidth={2}
              strokeDasharray="none"
              radialLines={true}
              gridType="polygon"
            />

            {/* Angle axis with custom labels */}
            <PolarAngleAxis dataKey="factor" tick={CustomAngleTick} className="font-heading" />

            {/* Radius axis */}
            <PolarRadiusAxis
              domain={[0, 100]}
              tick={(props) => {
                const { x, y, payload } = props;
                return (
                  <g transform={`translate(${x + 25},${y})`}>
                    <text
                      x={0}
                      y={0}
                      fill="#000000"
                      stroke="#FFFFFF"
                      strokeWidth="3"
                      paintOrder="stroke"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="font-heading"
                      style={{ fontSize: '10px', fontWeight: 'bold' }}
                    >
                      {payload.value}%
                    </text>
                  </g>
                );
              }}
              tickCount={6}
              axisLine={false}
              angle={90}
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
                fill: '#FF6B35',
                stroke: '#000000',
                strokeWidth: 2,
                r: 4,
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
            График результатов теста
          </span>
        </div>
      </div>
    </div>
  );
}
