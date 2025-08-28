import React, { useState } from 'react'
import { Search, ShoppingCart, User, Menu, Heart, ChevronDown, X, Home, Tag } from 'lucide-react'
import { useStore } from '../store/useStore'
import { AuthModal } from './AuthModal'
import { CartModal } from './CartModal'
import { NavLink } from 'react-router-dom'

export const Header: React.FC = () => {
  const { cartItems, searchQuery, setSearchQuery, user, signOut } = useStore()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  const cartItemCount = cartItems.reduce((sum, item) => sum + (item.quantity ?? 0), 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + ((item.price ?? 0) * (item.quantity ?? 0)), 0)

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode)
    setShowAuthModal(true)
    setShowUserMenu(false)
  }

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
  }

  // Helper component for navigation links
  const NavLinkHelper = ({ to, text, icon }: { to: string, text: string, icon?: React.ReactNode }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-2 font-medium transition-colors duration-200 ${
          isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
        }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  )

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">EcomStore</h1>
                  <p className="text-xs text-gray-500">Modern Shopping</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              {/* Wishlist - Desktop */}
              <button className="hidden lg:flex flex-col items-center p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                <Heart className="h-6 w-6" />
                <span className="text-xs mt-1">Wishlist</span>
              </button>

              {/* Account */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="h-6 w-6" />
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium">{user ? 'Account' : 'Sign In'}</div>
                    {user && <div className="text-xs text-gray-500 truncate max-w-20">{user.full_name || 'User'}</div>}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="p-6">
                      {user ? (
                        <>
                          <div className="border-b border-gray-100 pb-4 mb-4">
                            <div className="font-semibold text-gray-900">{user.full_name || 'User'}</div>
                            <div className="text-sm text-gray-600 truncate">{user.email}</div>
                          </div>
                          <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg font-medium text-gray-700">My Orders</button>
                            <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg font-medium text-gray-700">Profile Settings</button>
                            <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg font-medium text-gray-700">Wishlist</button>
                            <hr className="my-3" />
                            <button 
                              onClick={handleSignOut}
                              className="w-full text-left px-3 py-2 hover:bg-red-50 rounded-lg text-red-600 font-medium"
                            >
                              Sign Out
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <button 
                            onClick={() => handleAuthClick('signin')}
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                          >
                            Sign In
                          </button>
                          <button 
                            onClick={() => handleAuthClick('signup')}
                            className="w-full border-2 border-indigo-600 text-indigo-600 py-3 px-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                          >
                            Create Account
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={() => setShowCartModal(true)}
                className="relative flex items-center space-x-2 p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium">Cart</div>
                  <div className="text-xs text-gray-500">${cartTotal.toFixed(2)}</div>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <div className="space-y-2">
                <NavLinkHelper to="/" text="Home" icon={<Home className="w-5 h-5" />} />
                <NavLinkHelper to="/deals" text="Deals" icon={<Tag className="w-5 h-5" />} />
                <NavLinkHelper to="/account" text="My Account" icon={<User className="w-5 h-5" />} />
              </div>
            </div>
          )}

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8 py-4 border-t border-gray-100">
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Categories</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Electronics</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Fashion</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Home & Garden</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Sports</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Beauty</a>
            <a href="#" className="text-indigo-600 font-semibold">Sale</a>
          </nav>
        </div>
      </header>

      {/* Modals */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}

      {showCartModal && (
        <CartModal onClose={() => setShowCartModal(false)} />
      )}
    </>
  )
}