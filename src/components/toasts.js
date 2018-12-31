import React from 'react'

const Toast = ({ toast, hideToast }) => (
  <div className={`toast ${toast.className}`}>
    <div className="message">{toast.text}</div>
    <div onClick={hideToast} className="close">
      &times;
    </div>
  </div>
)

const Toasts = ({ toasts, hideToast }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast, index) => (
        <Toast key={index} toast={toast} hideToast={() => hideToast(toast)} />
      ))}
    </div>
  )
}

export default Toasts
