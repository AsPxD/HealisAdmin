import React from 'react';

export function RiskFactorChart() {
  const riskFactors = [
    { name: 'Population Density', value: 85 },
    { name: 'Environmental Conditions', value: 72 },
    { name: 'Healthcare Access', value: 65 },
    { name: 'Vaccination Rate', value: 58 }
  ];

  return (
    <div className="space-y-4">
      {riskFactors.map((factor) => (
        <div key={factor.name} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">{factor.name}</span>
            <span className="text-gray-600">{factor.value}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              style={{ width: `${factor.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}