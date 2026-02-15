import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const BlogSearch = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) => {
    return (
        <div className="flex gap-4 items-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4">
            <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-600 focus:outline-none focus:ring-2
                             focus:ring-blue-500/50 focus:bg-white/10 transition-all"
                />
            </div>
            <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50
                             focus:bg-white/10 transition-all appearance-none cursor-pointer"
                >
                    <option value="ALL">All Status</option>
                    <option value="DRAFT">Drafts</option>
                    <option value="PUBLISHED">Published</option>
                </select>
            </div>
        </div>
    );
};

export default BlogSearch;