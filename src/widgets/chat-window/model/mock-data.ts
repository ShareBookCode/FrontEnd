import type { MessageData } from '@shared/lib/types/chat'

export const mockData: MessageData[] = [
  {
    id: '1',
    senderId: 'user_2',
    message: 'Привет. Да, замечательная. Уже прочитал роман Хемингуэйа?',
    status: 'received',
    timestamp: '11:28',
  },
  {
    id: '2',
    senderId: 'user_1',
    message:
      'Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent ',
    status: 'send',
    timestamp: '11:29',
  },
  {
    id: '3',
    senderId: 'user_2',
    message: 'Horem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'received',
    timestamp: '11:30',
  },

  {
    id: '4',
    senderId: 'user_2',
    message:
      'Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
    status: 'received',
    timestamp: '11:31',
  },
  {
    id: '5',
    senderId: 'user_1',
    message:
      'Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit',
    status: 'send',
    timestamp: '11:32',
  },
  {
    id: '6',
    senderId: 'user_1',
    message:
      'Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, ',
    status: 'send',
    timestamp: '11:33',
  },

  {
    id: '7',
    senderId: 'user_2',
    message:
      'Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et veurabitur tempus urna at turpis condimentum lobortis.',
    status: 'received',
    timestamp: '11:34',
  },
  {
    id: '8',
    senderId: 'user_1',
    message:
      'Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, ',
    status: 'send',
    timestamp: '11:35',
  },

  {
    id: '9',
    senderId: 'user_1',
    message: 'Bye',
    status: 'error',
    timestamp: '11:36',
  },
  {
    id: '10',
    senderId: 'user_2',
    message:
      'Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et veurabitur tempus urna at turpis condimentum lobortis.',
    status: 'error',
    timestamp: '11:36',
  },
]
