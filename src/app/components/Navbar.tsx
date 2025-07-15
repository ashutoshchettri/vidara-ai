import React from 'react'
import { Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Vidara
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="/about" className="text-slate-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#testimonials" className="text-slate-600 hover:text-blue-600 transition-colors">Reviews</a>
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                <a href="/sign-in">Sign In</a>
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <a href="/sign-up">Get Started</a>
              </Button>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/50">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="/about" className="block text-slate-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#testimonials" className="block text-slate-600 hover:text-blue-600 transition-colors">Reviews</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  <a href="/sign-in">Sign In</a>
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <a href="/sign-up">Get Started</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
