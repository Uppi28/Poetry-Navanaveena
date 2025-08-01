import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import PoetryList from './components/PoetryList'
import PoetryForm from './components/PoetryForm'
import PoetryDetail from './components/PoetryDetail'
import { PoetryProvider } from './context/PoetryContext'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <PoetryProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<PoetryList />} />
                <Route path="/add" element={<PoetryForm />} />
                <Route path="/edit/:id" element={<PoetryForm />} />
                <Route path="/poem/:id" element={<PoetryDetail />} />
              </Routes>
            </main>
          </div>
        </Router>
      </PoetryProvider>
    </ThemeProvider>
  )
}

export default App 