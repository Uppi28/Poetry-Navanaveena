import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePoetry } from '../context/PoetryContext'
import { ArrowLeft, Save, Plus, X } from 'lucide-react'

const PoetryForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { poems, addPoem, updatePoem } = usePoetry()
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    category: '',
    tags: []
  })
  
  const [errors, setErrors] = useState({})
  const [newTag, setNewTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditing = !!id

  useEffect(() => {
    if (isEditing) {
      const poem = poems.find(p => p.id === id)
      if (poem) {
        setFormData({
          title: poem.title || '',
          author: poem.author || '',
          description: poem.description || '',
          category: poem.category || '',
          tags: [...(poem.tags || [])]
        })
      } else {
        navigate('/')
      }
    }
  }, [id, poems, navigate, isEditing])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Poem description is required'
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const poemData = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        tags: formData.tags.filter(tag => tag.trim())
      }
      
      if (isEditing) {
        await updatePoem(id, poemData)
      } else {
        await addPoem(poemData)
      }
      
      navigate('/')
    } catch (error) {
      console.error('Error saving poem:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const addTag = () => {
    const tag = newTag.trim().toLowerCase()
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const categories = [
    'Nature', 'Love', 'Life', 'Death', 'Spirituality', 'Politics', 
    'Social Issues', 'Personal', 'Philosophy', 'Humor', 'Other'
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/')}
          className="btn-secondary flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
                  <div>
            <h1 className="text-3xl font-bold gradient-text">
              {isEditing ? 'Edit Poem' : 'Add New Poem'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {isEditing ? 'Update your poem details' : 'Share your poetry with the world'}
            </p>
          </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="poetry-card p-8">
          {/* Title and Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`input-field w-full ${errors.title ? 'border-red-500' : ''}`}
                placeholder="Enter poem title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Author *
              </label>
              <input
                type="text"
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className={`input-field w-full ${errors.author ? 'border-red-500' : ''}`}
                placeholder="Enter author name"
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">{errors.author}</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Category *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`input-field w-full ${errors.category ? 'border-red-500' : ''}`}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Poem Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`input-field w-full h-64 resize-none poetry-text ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter your poem here... You can use HTML formatting like <strong>bold</strong>, <em>italic</em>, and line breaks."
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              💡 Tip: You can use HTML formatting like &lt;strong&gt;bold&lt;/strong&gt;, &lt;em&gt;italic&lt;/em&gt;, and line breaks for better formatting.
            </p>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-primary-900 dark:hover:text-primary-100 transition-colors duration-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input-field flex-1"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update Poem' : 'Save Poem')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PoetryForm 