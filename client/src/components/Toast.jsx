import { useEffect } from 'react';

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`toast transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} hidden sm:block`}>
  <div className="alert alert-info">
    <span>{message}</span>
  </div>
</div>
  );
};

export default Toast;
