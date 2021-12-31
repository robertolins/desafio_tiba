import {Routes, Route } from 'react-router-dom';

import Dashboard from './pages/dashboard'
import ListProducts from './pages/products'
import ListCategories from './pages/categories'

export default function Routas () {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="products" element={<ListProducts />} />
            <Route path="categories" element={<ListCategories />} />
        </Routes>
    )
}