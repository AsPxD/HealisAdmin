import React from 'react';

interface OutbreakTimelineProps {
  trend: 'increasing' | 'stable' | 'decreasing';
}

export function OutbreakTimeline({ trend }: OutbreakTimelineProps) {
  const getPoints = () => {
    const points = [];
    for (let i = 0; i < 7; i++) {
      let height;
      if (trend === 'increasing') {
        height = 20 + (i * 10);
      } else if (trend === 'decreasing') {
        height = 80 - (i * 10);
      } else {
        height = 50 + (Math.sin(i) * 10);
      }
      points.push(height);
    }
    return points;
  };

  return (
    <div className="mt-4 h-12 flex items-end space-x-1">
      {getPoints().map((height, i) => (
        <div
          key={i}
          className="flex-1 bg-slate-600 rounded-t opacity-75"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}