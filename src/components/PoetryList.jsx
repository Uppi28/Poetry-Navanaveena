import React, { useState } from 'react'
import { usePoetry } from '../context/PoetryContext'
import { Search, Filter, SortAsc, SortDesc, Grid, List } from 'lucide-react'
import PoetryCard from './PoetryCard'
import SearchFilters from './SearchFilters'
import LoadingSpinner from './LoadingSpinner'

const PoetryList = () => {
  const { getFilteredPoems, filters, setFilters, loading, error, poems } = usePoetry()
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false)

  const filteredPoems = getFilteredPoems()

  const handleSearch = (searchTerm) => {
    setFilters({ search: searchTerm })
  }

  const handleSort = (sortBy) => {
    const newSortOrder = filters.sortBy === sortBy && filters.sortOrder === 'asc' ? 'desc' : 'asc'
    setFilters({ sortBy, sortOrder: newSortOrder })
  }

  const handleCategoryFilter = (category) => {
    setFilters({ category })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold gradient-text">Your Poetry Collection</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {filteredPoems.length} poem{filteredPoems.length !== 1 ? 's' : ''} in your collection
          </p>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-primary-500 text-white'
                : 'bg-white/20 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-600/50'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === 'list'
                ? 'bg-primary-500 text-white'
                : 'bg-white/20 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-600/50'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search poems, authors, or tags..."
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-bar w-full pl-12 pr-4 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
            <button
              onClick={() => handleSort('title')}
              className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                filters.sortBy === 'title'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/20 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-600/50'
              }`}
            >
              Title
              {filters.sortBy === 'title' && (
                filters.sortOrder === 'asc' ? <SortAsc className="w-3 h-3 ml-1 inline" /> : <SortDesc className="w-3 h-3 ml-1 inline" />
              )}
            </button>
            <button
              onClick={() => handleSort('author')}
              className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                filters.sortBy === 'author'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/20 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-600/50'
              }`}
            >
              Author
              {filters.sortBy === 'author' && (
                filters.sortOrder === 'asc' ? <SortAsc className="w-3 h-3 ml-1 inline" /> : <SortDesc className="w-3 h-3 ml-1 inline" />
              )}
            </button>
            <button
              onClick={() => handleSort('date')}
              className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                filters.sortBy === 'date'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/20 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-600/50'
              }`}
            >
              Date
              {filters.sortBy === 'date' && (
                filters.sortOrder === 'asc' ? <SortAsc className="w-3 h-3 ml-1 inline" /> : <SortDesc className="w-3 h-3 ml-1 inline" />
              )}
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && <SearchFilters onCategoryFilter={handleCategoryFilter} />}
      </div>

      {/* Loading State */}
      {loading ? (
        <LoadingSpinner message="Loading your poetry collection..." />
      ) : error ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Error Loading Poems</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : filteredPoems.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No poems found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {filters.search || filters.category !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Start by adding your first poem to the collection'}
            </p>
            {!filters.search && filters.category === 'all' && (
              <button className="btn-primary">
                Add Your First Poem
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredPoems.map((poem) => (
            <PoetryCard key={poem.id} poem={poem} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PoetryList 