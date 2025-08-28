import React from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'

interface CartModalProps {
  onClose: () => void
}

export const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const { cartItems, updateCartQuantity, removeFromCart, user } = useStore()
  const navigate = useNavigate()

  const cartTotal = cartItems.reduce((sum, item) => sum + ((item.price ?? 0) * (item.quantity ?? 0)), 0)
  const cartItemCount = cartItems.reduce((sum, item) => sum + (item.quantity ?? 0), 0)

  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId)
    } else {
      updateCartQuantity(cartItemId, newQuantity)
    }
  }

  const handleCheckout = () => {
    if (!user) {
      alert('Please sign in to continue to checkout')
      return
    }
    onClose()
    navigate('/checkout')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl h-[80vh] max-h-screen flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Shopping Cart ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add items to get started</p>
              <button
                onClick={onClose}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.cart_item_id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-indigo-600">
                        ${((item.price ?? 0).toFixed(2))}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${(((item.price ?? 0) * 1.25).toFixed(2))}
                      </span>
                      <span className="text-sm text-green-600 font-semibold">
                        20% off
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.cart_item_id, (item.quantity ?? 0) - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 font-semibold">{item.quantity ?? 0}</span>
                      <button
                        onClick={() => handleQuantityChange(item.cart_item_id, (item.quantity ?? 0) + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.cart_item_id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Subtotal ({cartItemCount} items):</span>
              <span className="text-2xl font-bold text-indigo-600">${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                {user ? 'Continue to Checkout' : 'Sign in to Checkout'}
              </button>
              
              <button
                onClick={onClose}
                className="w-full border-2 border-indigo-600 text-indigo-600 py-3 px-4 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}