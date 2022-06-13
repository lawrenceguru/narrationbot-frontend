import React from 'react';
import { Modal } from 'antd';

const info = (content) => {
  Modal.info({
    content: content,
  });
};

const success = (content) => {
  Modal.success({
    content: content,
  });
};

const error = (content) => {
  Modal.error({
    content: content,
  });
};

const warning = (content) => {
  Modal.warning({
    content: content,
  });
};


export { info, success, error, warning };