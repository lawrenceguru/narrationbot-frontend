import React from 'react';
import { notification } from 'antd';

// type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const notificationAlert = (type, message) => {
  notification[type]({
    message: message
    // description: ''
  });
};

// const App: React.FC = () => (
//   <Space>
//     <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
//     <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
//     <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
//     <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
//   </Space>
// );

// export default App;