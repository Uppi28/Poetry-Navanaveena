import React from 'react'
import { usePoetry } from '../context/PoetryContext'
import { X } from 'lucide-react'

const SearchFilters = ({ onCategoryFilter }) => {
  const { getCategories, filters } = usePoetry()
  const categories = getCategories()

  return (
    <div className="glass-effect rounded-lg p-4 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Filter by Category</h3>
        <button
          onClick={() => onCategoryFilter('all')}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          Clear all
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryFilter('all')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            filters.category === 'all'
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-white/50 text-gray-700 hover:bg-white/70'
          }`}
        >
          All Categories
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryFilter(category)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filters.category === category
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white/50 text-gray-700 hover:bg-white/70'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchFilters 