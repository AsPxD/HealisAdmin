export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface NotificationFilters {
  search: string;
  type: string;
  status: string;
}

export interface Report {
  id: string;
  title: string;
  type: string;
  status: 'completed' | 'pending' | 'failed';
  generatedAt: string;
  size: string;
}

export interface ReportFilters {
  search: string;
  type: string;
  status: string;
}