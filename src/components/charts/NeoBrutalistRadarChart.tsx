'use client';

import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface ChartData {
  factor: string;
  value: number;
  fullMark: number;
}

interface NeoBrutalistRadarChartProps {
  data: ChartData[];
  className?: string;
  height?: number;
}

// Neobrutalist color palette
const NEOBRUTALIST_COLORS = {
  primary: '#FF6B35',      // Bright orange
  secondary: '#F7931E',    // Yellow-orange
  accent: '#FFD23F',       // Bright yellow
  text: '#000000',         // Pure black
  background: '#FFFFFF',   // Pure white
  border: '#000000',       // Black border
  grid: '#000000',         // Black grid
  shadow: '#000000',       // Black shadow
};

// Custom tick component for vertical labels
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomAngleTick = (props: any) => {
  const { payload, x, y, textAnchor, cx, cy } = props;
  
  // Calculate angle to determine if text should be rotated
  const angle = Math.atan2(y - cy, x - cx) * 180 / Math.PI;
  
  // Adjust positioning based on angle
  type DominantBaseline = 'auto' | 'inherit' | 'alphabetic' | 'hanging' | 'ideographic' | 'mathematical' | 'central' | 'middle' | 'text-after-edge' | 'text-before-edge';
  
  type TextAnchor = 'inherit' | 'start' | 'middle' | 'end';
  
  const textProps: {
    x: number;
    y: number;
    textAnchor: TextAnchor;
    dominantBaseline: DominantBaseline;
    fontSize: string;
    fontWeight: 'bold';
    fill: string;
    fontFamily: string;
    textTransform: 'uppercase';
  } = {
    x,
    y,
    textAnchor: textAnchor as TextAnchor,
    dominantBaseline: 'middle',
    fontSize: '12px',
    fontWeight: 'bold',
    fill: NEOBRUTALIST_COLORS.text,
    fontFamily: 'var(--font-heading), system-ui, sans-serif',
    textTransform: 'uppercase',
  };

  // For better readability, we'll keep text horizontal but adjust positioning
  let adjustedX = x;
  let adjustedY = y;
  
  // Adjust positioning based on quadrant
  if (angle >= -90 && angle <= 90) {
    // Right side
    adjustedX = x + 10;
    textProps.textAnchor = 'start';
  } else {
    // Left side  
    adjustedX = x - 10;
    textProps.textAnchor = 'end';
  }
  
  // Adjust vertical positioning for top/bottom
  if (angle >= -45 && angle <= 45) {
    // Right
    textProps.dominantBaseline = 'middle';
  } else if (angle >= 45 && angle <= 135) {
    // Top
    adjustedY = y - 10;
    textProps.dominantBaseline = 'alphabetic';
    textProps.textAnchor = 'middle';
    adjustedX = x;
  } else if (angle >= -135 && angle <= -45) {
    // Bottom
    adjustedY = y + 15;
    textProps.dominantBaseline = 'hanging';
    textProps.textAnchor = 'middle';
    adjustedX = x;
  } else {
    // Left
    textProps.dominantBaseline = 'middle';
  }

  return (
    <g>
      {/* Text shadow for neobrutalist effect */}
      <text
        {...textProps}
        x={adjustedX + 2}
        y={adjustedY + 2}
        fill={NEOBRUTALIST_COLORS.shadow}
        opacity={0.3}
      >
        {payload.value}
      </text>
      {/* Main text */}
      <text
        {...textProps}
        x={adjustedX}
        y={adjustedY}
      >
        {payload.value}
      </text>
    </g>
  );
};

// Custom radius tick component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomRadiusTick = (props: any) => {
  const { payload, x, y } = props;
  
  return (
    <g>
      <text
        x={x}
        y={y}
        fill={NEOBRUTALIST_COLORS.text}
        fontSize="10px"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="var(--font-heading), system-ui, sans-serif"
      >
        {payload.value}%
      </text>
    </g>
  );
};

// Custom tooltip component
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChartData;
    value: number;
  }>;
  label?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="bg-white border-2 border-black p-3 font-bold text-black uppercase text-sm"
        style={{
          boxShadow: '4px 4px 0px 0px black',
          fontFamily: 'var(--font-heading), system-ui, sans-serif'
        }}
      >
        <p className="mb-1">{label}</p>
        <p style={{ color: NEOBRUTALIST_COLORS.primary }}>
          {`${payload[0].value}%`}
        </p>
      </div>
    );
  }
  return null;
};

const NeoBrutalistRadarChart: React.FC<NeoBrutalistRadarChartProps> = ({ 
  data, 
  className = "", 
  height = 400 
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Chart container with neobrutalist styling */}
      <div 
        className="bg-white border-2 border-black p-4"
        style={{ 
          boxShadow: '4px 4px 0px 0px black',
          height: `${height}px`
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart 
            data={data} 
            margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
          >
            {/* Custom grid with thick black lines */}
            <PolarGrid 
              stroke={NEOBRUTALIST_COLORS.grid}
              strokeWidth={2}
              radialLines={true}
              gridType="polygon"
            />
            
            {/* Angle axis with custom labels */}
            <PolarAngleAxis 
              dataKey="factor" 
              tick={CustomAngleTick}
              axisLine={false}
            />
            
            {/* Radius axis */}
            <PolarRadiusAxis 
              domain={[0, 100]}
              tick={CustomRadiusTick}
              tickCount={6}
              axisLine={false}
              angle={90}
            />
            
            {/* Main radar area */}
            <Radar
              name="Результат"
              dataKey="value"
              stroke={NEOBRUTALIST_COLORS.primary}
              fill={NEOBRUTALIST_COLORS.primary}
              fillOpacity={0.3}
              strokeWidth={3}
              dot={{ 
                fill: NEOBRUTALIST_COLORS.primary, 
                stroke: NEOBRUTALIST_COLORS.border,
                strokeWidth: 2, 
                r: 6 
              }}
            />
            
            {/* Custom tooltip */}
            <defs>
              <filter id="neobrutalist-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="2" stdDeviation="0" floodColor={NEOBRUTALIST_COLORS.shadow}/>
              </filter>
            </defs>
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Chart title with neobrutalist styling */}
      <div className="absolute -top-2 left-4">
        <div 
          className="bg-white border-2 border-black px-4 py-2 font-bold uppercase text-sm"
          style={{ 
            boxShadow: '2px 2px 0px 0px black',
            fontFamily: 'var(--font-heading), system-ui, sans-serif'
          }}
        >
          BIG FIVE ПРОФИЛЬ
        </div>
      </div>
      
      {/* Legend with neobrutalist styling */}
      <div className="mt-4 flex justify-center">
        <div 
          className="bg-white border-2 border-black px-4 py-3 inline-flex items-center gap-3"
          style={{ boxShadow: '4px 4px 0px 0px black' }}
        >
          <div 
            className="w-4 h-4 border-2 border-black"
            style={{ backgroundColor: NEOBRUTALIST_COLORS.primary }}
          />
          <span 
            className="font-bold uppercase text-sm"
            style={{ fontFamily: 'var(--font-heading), system-ui, sans-serif' }}
          >
            ВАШИ ПОКАЗАТЕЛИ
          </span>
        </div>
      </div>
    </div>
  );
};

export default NeoBrutalistRadarChart;