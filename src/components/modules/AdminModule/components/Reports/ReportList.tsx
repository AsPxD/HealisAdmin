import React from 'react';
import { FileText, Download, Printer, Eye } from 'lucide-react';
import { Report } from '../../types';

interface ReportListProps {
  reports: Report[];
  onViewReport: (id: string) => void;
  onDownloadReport: (id: string) => void;
  onPrintReport: (id: string) => void;
}

export function ReportList({ reports, onViewReport, onDownloadReport, onPrintReport }: ReportListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report) => (
        <div key={report.id} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-50 rounded-lg">
                <FileText className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-500">{report.type}</p>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              report.status === 'completed' ? 'bg-green-100 text-green-800' :
              report.status === 'pending' ? 'bg-amber-100 text-amber-800' :
              'bg-red-100 text-red-800'
            }`}>
              {report.status}
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Generated</span>
              <span className="text-gray-900">{report.generatedAt}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Size</span>
              <span className="text-gray-900">{report.size}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => onViewReport(report.id)}
              className="p-2 text-gray-400 hover:text-slate-600"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDownloadReport(report.id)}
              className="p-2 text-gray-400 hover:text-slate-600"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => onPrintReport(report.id)}
              className="p-2 text-gray-400 hover:text-slate-600"
            >
              <Printer className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}