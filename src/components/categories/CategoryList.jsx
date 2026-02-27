import React from 'react';
import CategoryCard from './CategoryCard';

const CategoryList = ({ categories, onEdit, onDelete, onView }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    category={category}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                />
            ))}
        </div>
    );
};

export default CategoryList;