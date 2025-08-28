import React from 'react'
import { ProductCard } from './ProductCard'
import { useStore } from '../store/useStore'
import { Filter, Grid, List } from 'lucide-react'

export const ProductGrid: React.FC = () => {
  const { products, isLoading, searchQuery, selectedCategory } = useStore()

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === '' || product.category_id === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 animate-pulse overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No products found</h2>
          <p className="text-gray-600 mb-6">
            {searchQuery ? `No results for "${searchQuery}"` : 'No products available in this category'}
          </p>
          <p className="text-sm text-gray-500">
            Try adjusting your search or browse our categories
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
          </h2>
          <p className="text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        {/* Filters and View Options */}
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button className="p-2 text-indigo-600 bg-indigo-50 rounded-l-lg">
              <Grid className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-r-lg">
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      {filteredProducts.length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
            Load More Products
          </button>
        </div>
      )}
    </div>
  )
}