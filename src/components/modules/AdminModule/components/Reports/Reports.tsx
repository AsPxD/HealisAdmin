import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { ReportList } from './ReportList';
import { ReportFilters } from './ReportFilters';
import { useReports } from '../../hooks/useReports';

export function Reports() {
  const {
    reports,
    filters,
    setFilters,
    viewReport,
    downloadReport,
    printReport,
    generateReport
  } = useReports();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">System Reports</h2>
        <button
          onClick={generateReport}
          className="flex items-center px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Generate Report
        </button>
      </div>

      <ReportFilters
        filters={filters}
        onFilterChange={setFilters}
      />

      <ReportList
        reports={reports}
        onViewReport={viewReport}
        onDownloadReport={downloadReport}
        onPrintReport={printReport}
      />
    </div>
  );
}