import { 
  ref, 
  push, 
  set, 
  remove, 
  get, 
  query, 
  orderByChild, 
  equalTo,
  serverTimestamp 
} from 'firebase/database'
import { db } from './config'

const POEMS_PATH = 'Poems'

// Test Realtime Database connection
export const testDatabaseConnection = async () => {
  try {
    console.log('Testing Realtime Database connection...')
    const testRef = ref(db, 'test')
    await get(testRef)
    console.log('Realtime Database connection successful')
    return true
  } catch (error) {
    console.error('Realtime Database connection failed:', error)
    return false
  }
}

// Add a new poem
export const addPoemToFirebase = async (poemData) => {
  try {
    console.log('Adding poem to Firebase:', poemData.title)
    const poemsRef = ref(db, POEMS_PATH)
    const newPoemRef = push(poemsRef)
    
    const poemWithTimestamp = {
      ...poemData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    
    await set(newPoemRef, poemWithTimestamp)
    console.log('Poem added with ID:', newPoemRef.key)
    return { id: newPoemRef.key, ...poemData }
  } catch (error) {
    console.error('Error adding poem:', error)
    throw error
  }
}

// Update an existing poem
export const updatePoemInFirebase = async (id, poemData) => {
  try {
    const poemRef = ref(db, `${POEMS_PATH}/${id}`)
    const poemWithTimestamp = {
      ...poemData,
      updatedAt: serverTimestamp()
    }
    await set(poemRef, poemWithTimestamp)
    return { id, ...poemData }
  } catch (error) {
    console.error('Error updating poem:', error)
    throw error
  }
}

// Delete a poem
export const deletePoemFromFirebase = async (id) => {
  try {
    const poemRef = ref(db, `${POEMS_PATH}/${id}`)
    await remove(poemRef)
    return id
  } catch (error) {
    console.error('Error deleting poem:', error)
    throw error
  }
}

// Get all poems
export const getPoemsFromFirebase = async () => {
  try {
    console.log('Getting poems from path:', POEMS_PATH)
    const poemsRef = ref(db, POEMS_PATH)
    const snapshot = await get(poemsRef)
    
    console.log('Snapshot exists:', snapshot.exists())
    
    const poems = []
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val()
        console.log('Poem data:', childSnapshot.key, data)
        poems.push({
          id: childSnapshot.key,
          title: data.title,
          author: data.author,
          description: data.description,
          category: data.category,
          tags: data.tags || [],
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt || new Date().toISOString()
        })
      })
    }
    
    // Sort by creation date (newest first)
    poems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    console.log('Returning poems:', poems.length)
    return poems
  } catch (error) {
    console.error('Error getting poems:', error)
    throw error
  }
}

// Search poems
export const searchPoemsInFirebase = async (searchTerm) => {
  try {
    const poemsRef = ref(db, POEMS_PATH)
    const snapshot = await get(poemsRef)
    
    const poems = []
    const searchLower = searchTerm.toLowerCase()
    
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val()
        const poem = {
          id: childSnapshot.key,
          title: data.title,
          author: data.author,
          description: data.description,
          category: data.category,
          tags: data.tags || [],
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt || new Date().toISOString()
        }
        
        // Search in title, author, description, and tags
        if (
          poem.title.toLowerCase().includes(searchLower) ||
          poem.author.toLowerCase().includes(searchLower) ||
          poem.description.toLowerCase().includes(searchLower) ||
          poem.tags.some(tag => tag.toLowerCase().includes(searchLower))
        ) {
          poems.push(poem)
        }
      })
    }
    
    return poems
  } catch (error) {
    console.error('Error searching poems:', error)
    throw error
  }
}

// Get poems by category
export const getPoemsByCategoryFromFirebase = async (category) => {
  try {
    const poemsRef = ref(db, POEMS_PATH)
    const categoryQuery = query(poemsRef, orderByChild('category'), equalTo(category))
    const snapshot = await get(categoryQuery)
    
    const poems = []
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val()
        poems.push({
          id: childSnapshot.key,
          title: data.title,
          author: data.author,
          description: data.description,
          category: data.category,
          tags: data.tags || [],
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt || new Date().toISOString()
        })
      })
    }
    
    return poems
  } catch (error) {
    console.error('Error getting poems by category:', error)
    throw error
  }
} 