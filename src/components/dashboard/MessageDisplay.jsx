import React from 'react';

const MessageDisplay = ({ message }) => (
    <div className="mx-6 mt-6 p-4 rounded-xl animate-pulse" style={{
        background: message.type === 'success'
            ? 'linear-gradient(to right, rgba(34,197,94,0.2), rgba(16,185,129,0.2))'
            : 'linear-gradient(to right, rgba(239,68,68,0.2), rgba(225,29,72,0.2))',
        border: `1px solid ${message.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
        color: message.type === 'success' ? '#4ade80' : '#f87171'
    }}>
        {message.text}
    </div>
);

export default MessageDisplay;