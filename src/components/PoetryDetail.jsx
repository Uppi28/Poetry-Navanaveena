import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { usePoetry } from '../context/PoetryContext'
import { ArrowLeft, Edit, Calendar, User, Tag, Heart, Trash2, Loader2 } from 'lucide-react'
import { format } from 'date-fns'

const PoetryDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { poems, deletePoem, loading } = usePoetry()
  const [isLoading, setIsLoading] = useState(true)
  
  const poem = poems.find(p => p.id === id)
  
  useEffect(() => {
    // Simulate loading time and check if poem exists
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [poem])

  // Show loading state
  if (loading || isLoading) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-cyan-100 to-pink-100 dark:from-cyan-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Loading Poem...</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Please wait while we fetch your poetry.
          </p>
        </div>
      </div>
    )
  }

  if (!poem) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center">
            <Heart className="w-12 h-12 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Poem not found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The poem you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Collection
          </button>
        </div>
      </div>
    )
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this poem?')) {
      await deletePoem(poem.id)
      navigate('/')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/')}
          className="btn-secondary flex items-center gap-2"
          title="Back to Collection"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Collection</span>
        </button>
        
        <div className="flex items-center gap-2">
          <Link
            to={`/edit/${poem.id}`}
            className="btn-primary flex items-center gap-2"
            title="Edit Poem"
          >
            <Edit className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            title="Delete Poem"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>

      {/* Poem Content */}
      <div className="poetry-card p-8 mb-8">
        {/* Poem Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4 poetry-text">
            {poem.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
            <User className="w-5 h-5" />
            by {poem.author}
          </p>
        </div>

        {/* Poem Description */}
        <div 
          className="poetry-text text-lg text-center max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: poem.description || '' }}
        />
      </div>

      {/* Poem Metadata */}
      <div className="poetry-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full">
                {poem.category}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                Added on {poem.createdAt ? format(new Date(poem.createdAt), 'MMMM d, yyyy') : 'Unknown date'}
              </span>
            </div>
            
            {poem.updatedAt && poem.createdAt && poem.updatedAt !== poem.createdAt && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  Updated on {format(new Date(poem.updatedAt), 'MMMM d, yyyy')}
                </span>
              </div>
            )}
          </div>

          {/* Right Column - Tags */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {(poem.tags || []).length > 0 ? (
                (poem.tags || []).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 dark:text-gray-400 text-sm italic">No tags added</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation to other poems */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Continue exploring my poetry collection
        </p>
        <Link
          to="/"
          className="btn-primary"
          title="Browse All Poems"
        >
          <span className="hidden sm:inline">Browse All Poems</span>
          <span className="sm:hidden">Browse</span>
        </Link>
      </div>
    </div>
  )
}

export default PoetryDetail 