import React from 'react';
import { Search, Filter, Download, ClipboardList } from 'lucide-react';

export function AuditLogs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
        <button className="flex items-center px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search audit logs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent">
          <option value="all">All Events</option>
          <option value="user">User Events</option>
          <option value="system">System Events</option>
          <option value="security">Security Events</option>
        </select>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              { timestamp: '2024-03-15 10:30:00', type: 'USER', user: 'John Doe', action: 'User Login', ip: '192.168.1.1' },
              { timestamp: '2024-03-15 10:25:00', type: 'SYSTEM', user: 'System', action: 'Backup Completed', ip: '192.168.1.2' },
              { timestamp: '2024-03-15 10:20:00', type: 'SECURITY', user: 'Admin', action: 'Permission Changed', ip: '192.168.1.3' }
            ].map((log, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {log.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    log.type === 'USER' ? 'bg-blue-100 text-blue-800' :
                    log.type === 'SYSTEM' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {log.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {log.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {log.action}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {log.ip}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <ClipboardList className="w-4 h-4" />
          <span>Showing 1-10 of 156 entries</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}