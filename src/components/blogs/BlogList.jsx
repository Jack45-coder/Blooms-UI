import React from 'react';
import BlogCard from './BlogCard';

const BlogList = ({ blogs, allCategories, availableSubcategories, onEdit, onDelete, onUpdate }) => {
    const getCategoryName = (categoryId) => {
        const category = allCategories.find(c => c.id === categoryId);
        return category?.name || 'Unknown';
    };

    return (
        <div className="space-y-4">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    categoryName={getCategoryName(blog.categoryId)}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
};

export default BlogList;