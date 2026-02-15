import React from 'react';
import { FaPlus } from 'react-icons/fa';

const EmptyState = ({ icon, title, message, actionLabel, onAction }) => {
    return (
        <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-6xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 mb-4">{message}</p>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600
                             text-white rounded-xl inline-flex items-center gap-2"
                >
                    <FaPlus /> {actionLabel}
                </button>
            )}
        </div>
    );
};

export default EmptyState;