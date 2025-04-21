import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Message = ({ variant, children, dismissible = false }) => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Alert 
        variant={variant} 
        className="rounded-lg border-0 shadow-sm" 
        onClose={() => dismissible && setShow(false)} 
        dismissible={dismissible}
      >
        {children}
      </Alert>
    </motion.div>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message; 