import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePoetry } from '../context/PoetryContext'
import { Edit, Trash2, Calendar, User, Tag, MoreVertical } from 'lucide-react'
import { format } from 'date-fns'

const PoetryCard = ({ poem, viewMode }) => {
  const { deletePoem } = usePoetry()
  const [showMenu, setShowMenu] = useState(false)

  // Safety check for poem object
  if (!poem) {
    return (
      <div className="poetry-card p-6">
        <div className="text-center text-gray-500">
          <p>Loading poem...</p>
        </div>
      </div>
    )
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete this poem?')) {
      await deletePoem(poem.id)
    }
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const getPreviewText = () => {
    if (!poem.description) return ''
    // Remove HTML tags for preview
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = poem.description
    const textContent = tempDiv.textContent || tempDiv.innerText || ''
    const lines = textContent.split('\n').filter(line => line.trim())
    return lines.slice(0, 3).join('\n')
  }

  if (viewMode === 'list') {
    return (
      <div className="poetry-card p-6 hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                {poem.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {poem.createdAt ? format(new Date(poem.createdAt), 'MMM d, yyyy') : 'Unknown date'}
              </span>
            </div>
            
            <Link to={`/poem/${poem.id}`} className="block group">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 mb-2">
                {poem.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-1">
                <User className="w-4 h-4" />
                {poem.author}
              </p>
            </Link>
            
            <div 
              className="poetry-text mb-4"
              dangerouslySetInnerHTML={{ __html: truncateText(getPreviewText(), 200) }}
            />
            
            <div className="flex items-center gap-2">
              {(poem.tags || []).slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {(poem.tags || []).length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{(poem.tags || []).length - 3} more
                </span>
              )}
            </div>
          </div>
          
          <div className="relative ml-4">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 animate-slide-up">
                <Link
                  to={`/edit/${poem.id}`}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setShowMenu(false)}
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div className="poetry-card p-6 hover:scale-[1.02] transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
            {poem.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {poem.createdAt ? format(new Date(poem.createdAt), 'MMM d') : 'Unknown date'}
          </span>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 animate-slide-up">
              <Link
                to={`/edit/${poem.id}`}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setShowMenu(false)}
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Link to={`/poem/${poem.id}`} className="block">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 mb-2 line-clamp-2">
          {poem.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex items-center gap-1">
          <User className="w-4 h-4" />
          {poem.author}
        </p>
      </Link>
      
      <div 
        className="poetry-text text-sm mb-4 line-clamp-4"
        dangerouslySetInnerHTML={{ __html: truncateText(getPreviewText(), 150) }}
      />
      
      <div className="flex flex-wrap gap-1">
        {(poem.tags || []).slice(0, 2).map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
          >
            <Tag className="w-3 h-3" />
            {tag}
          </span>
        ))}
        {(poem.tags || []).length > 2 && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            +{(poem.tags || []).length - 2} more
          </span>
        )}
      </div>
    </div>
  )
}

export default PoetryCard 