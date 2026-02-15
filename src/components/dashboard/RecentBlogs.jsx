import React from 'react';

const RecentBlogs = ({ recentBlogs, onViewAll }) => {
    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Recent Blogs</h3>
                <button
                    onClick={() => onViewAll('blogs')}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                    View All
                </button>
            </div>

            {recentBlogs.length > 0 ? (
                <div className="space-y-3">
                    {recentBlogs.map((blog) => (
                        <div key={blog.id}
                             className="flex items-center justify-between p-3 bg-white/5
                                      rounded-xl hover:bg-white/10 transition-all">
                            <div>
                                <h4 className="font-medium text-white">{blog.title}</h4>
                                <p className="text-xs text-gray-400">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <span className="text-xs text-gray-500">
                                {blog.views || 0} views
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 text-center py-8">
                    You haven't written any blogs yet.
                </p>
            )}
        </div>
    );
};

export default RecentBlogs;