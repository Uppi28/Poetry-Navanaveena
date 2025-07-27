import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { 
  addPoemToFirebase, 
  updatePoemInFirebase, 
  deletePoemFromFirebase, 
  getPoemsFromFirebase,
  testDatabaseConnection
} from '../firebase/poetryService'

const PoetryContext = createContext()

const initialState = {
  poems: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    category: 'all',
    sortBy: 'date',
    sortOrder: 'desc'
  }
}

const poetryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    
    case 'LOAD_POEMS':
      return { ...state, poems: action.payload, loading: false }
    
    case 'ADD_POEM':
      return { 
        ...state, 
        poems: [action.payload, ...state.poems],
        loading: false 
      }
    
    case 'UPDATE_POEM':
      return {
        ...state,
        poems: state.poems.map(poem => 
          poem.id === action.payload.id ? action.payload : poem
        ),
        loading: false
      }
    
    case 'DELETE_POEM':
      return {
        ...state,
        poems: state.poems.filter(poem => poem.id !== action.payload),
        loading: false
      }
    
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      }
    
    default:
      return state
  }
}

export const PoetryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(poetryReducer, initialState)

    // Load poems from Firebase with localStorage fallback
  useEffect(() => {
    const loadPoems = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        // Test Firebase connection first
        const connectionTest = await testDatabaseConnection()
        if (connectionTest) {
          console.log('Loading poems from Firebase...')
          const poems = await getPoemsFromFirebase()
          
          if (poems.length === 0) {
            // Add sample poems to Firebase if none exist
                          const samplePoems = [
                {
                  title: 'The Road Not Taken',
                  author: 'Robert Frost',
                  description: `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,

And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back.

I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.`,
                  category: 'Nature',
                  tags: ['choices', 'life', 'nature']
                },
                {
                  title: 'Sonnet 18',
                  author: 'William Shakespeare',
                  description: `Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date:
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm'd;
And every fair from fair sometime declines,
By chance or nature's changing course untrimm'd;
But thy eternal summer shall not fade
Nor lose possession of that fair thou owest;
Nor shall Death brag thou wander'st in his shade,
When in eternal lines to time thou growest:
   So long as men can breathe or eyes can see,
   So long lives this, and this gives life to thee.`,
                  category: 'Love',
                  tags: ['love', 'beauty', 'eternity']
                }
              ]
            
            // Add sample poems to Firebase
            for (const poem of samplePoems) {
              await addPoemToFirebase(poem)
            }
            
            // Reload poems after adding samples
            const updatedPoems = await getPoemsFromFirebase()
            dispatch({ type: 'LOAD_POEMS', payload: updatedPoems })
          } else {
            dispatch({ type: 'LOAD_POEMS', payload: poems })
          }
        } else {
          throw new Error('Firebase connection failed')
        }
      } catch (error) {
        console.error('Error loading poems from Firebase:', error)
        
        // Fallback to localStorage
        console.log('Falling back to localStorage...')
        const savedPoems = localStorage.getItem('poetry-app-poems')
        if (savedPoems) {
          try {
            const poems = JSON.parse(savedPoems)
            dispatch({ type: 'LOAD_POEMS', payload: poems })
          } catch (localError) {
            console.error('Error loading from localStorage:', localError)
            dispatch({ type: 'SET_ERROR', payload: 'Failed to load poems' })
          }
        } else {
          // Add sample poems to localStorage as fallback
          const samplePoems = [
            {
              id: '1',
              title: 'The Road Not Taken',
              author: 'Robert Frost',
              description: `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,

And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back.

I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.`,
              category: 'Nature',
              tags: ['choices', 'life', 'nature'],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            {
              id: '2',
              title: 'Sonnet 18',
              author: 'William Shakespeare',
              description: `Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date:
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm'd;
And every fair from fair sometime declines,
By chance or nature's changing course untrimm'd;
But thy eternal summer shall not fade
Nor lose possession of that fair thou owest;
Nor shall Death brag thou wander'st in his shade,
When in eternal lines to time thou growest:
   So long as men can breathe or eyes can see,
   So long lives this, and this gives life to thee.`,
              category: 'Love',
              tags: ['love', 'beauty', 'eternity'],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          ]
          localStorage.setItem('poetry-app-poems', JSON.stringify(samplePoems))
          dispatch({ type: 'LOAD_POEMS', payload: samplePoems })
        }
      }
    }
    
    loadPoems()
  }, [])

  // Save poems to localStorage as backup whenever poems change
  useEffect(() => {
    if (state.poems.length > 0) {
      localStorage.setItem('poetry-app-poems', JSON.stringify(state.poems))
    }
  }, [state.poems])

  const addPoem = async (poem) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const newPoem = await addPoemToFirebase(poem)
      dispatch({ type: 'ADD_POEM', payload: newPoem })
    } catch (error) {
      console.error('Error adding poem to Firebase:', error)
      // Fallback to localStorage
      const fallbackPoem = {
        ...poem,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      dispatch({ type: 'ADD_POEM', payload: fallbackPoem })
    }
  }

  const updatePoem = async (id, updates) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const updatedPoem = await updatePoemInFirebase(id, updates)
      dispatch({ type: 'UPDATE_POEM', payload: updatedPoem })
    } catch (error) {
      console.error('Error updating poem in Firebase:', error)
      // Fallback to localStorage
      const fallbackPoem = {
        ...updates,
        id,
        updatedAt: new Date().toISOString()
      }
      dispatch({ type: 'UPDATE_POEM', payload: fallbackPoem })
    }
  }

  const deletePoem = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      await deletePoemFromFirebase(id)
      dispatch({ type: 'DELETE_POEM', payload: id })
    } catch (error) {
      console.error('Error deleting poem from Firebase:', error)
      // Fallback to localStorage
      dispatch({ type: 'DELETE_POEM', payload: id })
    }
  }

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters })
  }

  const getFilteredPoems = () => {
    let filtered = [...state.poems]

    // Filter by search
    if (state.filters.search) {
      const searchTerm = state.filters.search.toLowerCase()
      filtered = filtered.filter(poem =>
        (poem.title || '').toLowerCase().includes(searchTerm) ||
        (poem.author || '').toLowerCase().includes(searchTerm) ||
        (poem.description || '').toLowerCase().includes(searchTerm) ||
        (poem.tags || []).some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    // Filter by category
    if (state.filters.category !== 'all') {
      filtered = filtered.filter(poem => poem.category === state.filters.category)
    }

    // Sort poems
    filtered.sort((a, b) => {
      let aValue, bValue
      
      switch (state.filters.sortBy) {
        case 'title':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case 'author':
          aValue = a.author.toLowerCase()
          bValue = b.author.toLowerCase()
          break
        case 'date':
        default:
          aValue = new Date(a.createdAt)
          bValue = new Date(b.createdAt)
          break
      }

      if (state.filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }

  const getCategories = () => {
    const categories = [...new Set(state.poems.map(poem => poem.category))]
    return categories.sort()
  }

  const value = {
    ...state,
    addPoem,
    updatePoem,
    deletePoem,
    setFilters,
    getFilteredPoems,
    getCategories
  }

  return (
    <PoetryContext.Provider value={value}>
      {children}
    </PoetryContext.Provider>
  )
}

export const usePoetry = () => {
  const context = useContext(PoetryContext)
  if (!context) {
    throw new Error('usePoetry must be used within a PoetryProvider')
  }
  return context
} 