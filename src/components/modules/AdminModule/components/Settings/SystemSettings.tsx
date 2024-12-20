import React from 'react';
import { Settings, Bell, Globe, Moon, Shield, Clock, Database } from 'lucide-react';

export function SystemSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <Settings className="w-8 h-8 text-slate-600" />
            <h3 className="text-lg font-semibold">General Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="font-medium">Language</p>
                  <p className="text-sm text-gray-500">System default language</p>
                </div>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Moon className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-gray-500">System appearance</p>
                </div>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <Shield className="w-8 h-8 text-slate-600" />
            <h3 className="text-lg font-semibold">Security Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="font-medium">Auto Logout</p>
                  <p className="text-sm text-gray-500">Inactive session timeout</p>
                </div>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="font-medium">2FA</p>
                  <p className="text-sm text-gray-500">Two-factor authentication</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <Bell className="w-8 h-8 text-slate-600" />
            <h3 className="text-lg font-semibold">Notification Settings</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: 'System Alerts', description: 'Critical system notifications' },
              { label: 'User Activities', description: 'New user registrations and updates' },
              { label: 'Security Alerts', description: 'Security-related notifications' }
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{setting.label}</p>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Backup Settings */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <Database className="w-8 h-8 text-slate-600" />
            <h3 className="text-lg font-semibold">Backup Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Automatic Backup</p>
                <p className="text-sm text-gray-500">Schedule system backups</p>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <button className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700">
              Backup Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}