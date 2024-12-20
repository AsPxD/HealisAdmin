import React from 'react';
import { Brain, AlertTriangle, Map, TrendingUp, Activity, Wind } from 'lucide-react';
import { PredictionMap } from './PredictionMap';
import { RiskFactorChart } from './RiskFactorChart';
import { OutbreakTimeline } from './OutbreakTimeline';

export function DiseaseOutbreakPredictor() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Disease Outbreak Predictor</h2>
          <p className="text-gray-600 mt-1">AI-powered epidemic forecasting system</p>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">ML Model Active</span>
        </div>
      </div>

      {/* Prediction Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
          <div className="flex items-center space-x-4">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
            <div>
              <p className="text-sm text-gray-600">Risk Level</p>
              <h3 className="text-2xl font-bold text-amber-600">Moderate</h3>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
          <div className="flex items-center space-x-4">
            <Map className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Affected Areas</p>
              <h3 className="text-2xl font-bold text-blue-600">12 Regions</h3>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl">
          <div className="flex items-center space-x-4">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Prediction Accuracy</p>
              <h3 className="text-2xl font-bold text-purple-600">94.5%</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prediction Map */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Geographic Risk Distribution</h3>
          <PredictionMap />
        </div>

        {/* Risk Factors */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Key Risk Factors</h3>
          <RiskFactorChart />
        </div>
      </div>

      {/* Disease Patterns */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Predicted Disease Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              disease: 'Influenza A',
              probability: 78,
              trend: 'increasing',
              factors: ['Season Change', 'Population Density'],
              icon: Activity
            },
            {
              disease: 'Respiratory Infections',
              probability: 65,
              trend: 'stable',
              factors: ['Air Quality', 'Temperature'],
              icon: Wind
            }
          ].map((pattern) => (
            <div key={pattern.disease} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg">
                    <pattern.icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{pattern.disease}</h4>
                    <p className="text-sm text-gray-600">
                      {pattern.factors.join(' • ')}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  pattern.trend === 'increasing' 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {pattern.probability}% Probability
                </span>
              </div>
              <OutbreakTimeline trend={pattern.trend} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}