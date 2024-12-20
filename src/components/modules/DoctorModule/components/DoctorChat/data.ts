import { Chat, Message } from './types';

export const mockChats: Chat[] = [
  {
    id: '1',
    patient: 'Sarah Johnson',
    lastMessage: "Thank you doctor, I will follow the prescription.",
    time: '10:30 AM',
    unread: 2,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=50&h=50'
  },
  {
    id: '2',
    patient: 'Michael Chen',
    lastMessage: 'When should I schedule the follow-up?',
    time: '9:45 AM',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=50&h=50'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'patient',
    content: 'Hello Dr. Johnson, I have been following the treatment plan.',
    timestamp: '10:15 AM',
    type: 'text',
    status: 'read'
  },
  {
    id: '2',
    sender: 'doctor',
    content: "That is great to hear! How are you feeling now?",
    timestamp: '10:20 AM',
    type: 'text',
    status: 'read'
  },
  {
    id: '3',
    sender: 'patient',
    content: 'Much better! The medication has really helped with the symptoms.',
    timestamp: '10:25 AM',
    type: 'text',
    status: 'read'
  }
];