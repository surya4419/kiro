import React from 'react'
import { ArrowRight, Truck, Shield, Headphones } from 'lucide-react'

export const HeroBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                🎉 New Collection Available
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Perfect </span>
                Style
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Shop the latest trends with our curated collection of premium products. 
                Quality meets affordability in every purchase.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200">
                View Collection
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Truck className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="text-sm font-semibold text-gray-900">Free Shipping</div>
                <div className="text-xs text-gray-600">On orders over $50</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-sm font-semibold text-gray-900">Secure Payment</div>
                <div className="text-xs text-gray-600">100% protected</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Headphones className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-sm font-semibold text-gray-900">24/7 Support</div>
                <div className="text-xs text-gray-600">Always here to help</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Fashion model"
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
              />
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-indigo-600">50%</div>
                <div className="text-sm text-gray-600">Off Today</div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="text-sm font-semibold text-gray-900">⭐ 4.9/5</div>
                <div className="text-xs text-gray-600">Customer Rating</div>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl transform rotate-3 scale-105 opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600">Discover our most popular categories</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Electronics', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'from-blue-500 to-cyan-500' },
            { name: 'Fashion', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'from-pink-500 to-rose-500' },
            { name: 'Home & Garden', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'from-green-500 to-emerald-500' },
            { name: 'Beauty', image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'from-purple-500 to-violet-500' }
          ].map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl aspect-square">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-bold text-lg text-center">{category.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Limited Time Offer
            </h2>
            <p className="text-xl mb-8 text-indigo-100">
              Get up to 70% off on selected items. Don't miss out!
            </p>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Shop Sale Items
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}