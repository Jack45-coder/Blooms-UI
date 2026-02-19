import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const BlogPreview = ({ formData, getCategoryName, getSubCategoryName, onBack }) => {
    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <button
                onClick={onBack}
                className="flex items-center gap-2 mb-4 text-gray-400 hover:text-white transition-colors"
            >
                <FaArrowLeft /> Back to Edit
            </button>

            <div className="prose prose-invert max-w-none">
                <h1 className="text-3xl font-bold text-white mb-4">
                    {formData.title || 'Untitled'}
                </h1>
                <div className="flex gap-2 mb-4 flex-wrap">
                    {formData.categoryId && (
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                            {getCategoryName(formData.categoryId)}
                        </span>
                    )}
                    {formData.subCategoryId && (
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                            {getSubCategoryName(formData.subCategoryId)}
                        </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-sm ${
                        formData.status === 'PUBLISHED'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                        {formData.status}
                    </span>
                </div>

                {formData.imageUrl && (
                    <img
                        src={formData.imageUrl}
                        alt={formData.title}
                        className="w-full max-h-96 object-cover rounded-xl mb-4"
                    />
                )}

                <div className="text-gray-300 whitespace-pre-wrap">
                    {formData.content || 'No content yet...'}
                </div>

                {formData.tags && (
                    <div className="mt-4 flex gap-2 flex-wrap">
                        {formData.tags.split(',').map((tag, i) => (
                            <span key={i} className="text-sm text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                                #{tag.trim()}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPreview;