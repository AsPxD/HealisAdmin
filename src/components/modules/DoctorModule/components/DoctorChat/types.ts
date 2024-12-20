export interface Chat {
  id: string;
  patient: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
}

export interface Message {
  id: string;
  sender: 'doctor' | 'patient';
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  status: 'sent' | 'delivered' | 'read';
}