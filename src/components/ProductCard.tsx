import React from 'react'
import { Star, Heart, Plus, ShoppingCart } from 'lucide-react'
import { useStore } from '../store/useStore'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  rating: number
  review_count: number
  brand: string
  stock_quantity: number
}

interface ProductCardProps {
  product: Product
  onQuickAdd?: () => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickAdd }) => {
  const { addToCart } = useStore()

  const handleAddToCart = () => {
    addToCart(product, 1)
    if (onQuickAdd) onQuickAdd()
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const originalPrice = product.price * 1.25
  const savings = originalPrice - product.price
  const savingsPercent = Math.round((savings / originalPrice) * 100)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
      {/* Wishlist Button */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white">
        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
      </button>

      {/* Product Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-2xl">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Stock Status */}
        {product.stock_quantity < 10 && product.stock_quantity > 0 && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Only {product.stock_quantity} left
          </div>
        )}
        {product.stock_quantity === 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Out of Stock
          </div>
        )}
        {savingsPercent > 0 && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {savingsPercent}% OFF
          </div>
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
              product.stock_quantity === 0
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <div className="text-sm text-gray-500 font-medium">{product.brand}</div>
        
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500">
            ({product.review_count})
          </span>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {savingsPercent > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {savingsPercent > 0 && (
            <div className="text-sm text-green-600 font-semibold">
              Save ${savings.toFixed(2)}
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
            product.stock_quantity === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-md hover:shadow-lg'
          }`}
        >
          <Plus className="h-4 w-4" />
          <span>{product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>

        {/* Delivery Info */}
        <div className="text-center space-y-1">
          <div className="text-sm font-semibold text-green-600">✓ Free delivery</div>
          <div className="text-xs text-gray-500">Pickup available</div>
        </div>
      </div>
    </div>
  )
}