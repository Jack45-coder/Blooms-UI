import React from 'react';
import BlogCard from './BlogCard';

const BlogList = ({ blogs, allCategories, onEdit, onDelete, onUpdate }) => {
    const getCategoryName = (blog) => {
        // Mapping blog by id
        const catId = blog.categoryId || blog.categoryMappings?.[0]?.categoryId;
        const category = allCategories.find(c => c.id === catId);
        return category?.name || 'Unknown';
    };

    return (
        <div className="space-y-4">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    categoryName={getCategoryName(blog)}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
};

export default BlogList;