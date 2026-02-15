import React from 'react';
import SubCategoryCard from './SubCategoryCard';

const SubCategoryList = ({ subcategories, allCategories, onEdit, onDelete }) => {
    const getCategoryName = (categoryId) => {
        const category = allCategories.find(c => c.id === categoryId);
        return category?.name || 'Unknown';
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories.map((sub) => (
                <SubCategoryCard
                    key={sub.id}
                    subcategory={sub}
                    categoryName={getCategoryName(sub.categoryId)}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default SubCategoryList;