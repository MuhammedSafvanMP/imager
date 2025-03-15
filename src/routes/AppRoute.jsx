import ImageGallery from '@/components/gallery/ImageGallery'
import VideoGallery from '@/components/gallery/VideoGallery'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export default function AppRoute() {
  return (
    <Routes>
        <Route  path='/' element={ <ImageGallery />} />
        <Route  path='/videos' element={ <VideoGallery /> } />
    </Routes>
  )
}
