import React from 'react';
import { motion } from 'framer-motion';
import { FaTint } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="loader-container">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotateZ: [0, 360],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-center"
      >
        <FaTint size={40} className="text-danger mb-3" />
        <div className="spinner-dots">
          <motion.span
            className="spinner-dot bg-danger rounded-circle"
            animate={{ scale: [0.7, 1, 0.7] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="spinner-dot bg-danger rounded-circle"
            animate={{ scale: [0.7, 1, 0.7] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="spinner-dot bg-danger rounded-circle"
            animate={{ scale: [0.7, 1, 0.7] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Loader; 