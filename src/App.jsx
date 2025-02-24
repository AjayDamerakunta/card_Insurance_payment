import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // ✅ Import React Router
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import CategoryGrid from './components/CategoryGrid';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import PaymentForm from './components/PaymentForm';  // ✅ Import PaymentForm
import { categories, products } from './data/sampleData';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product, rentalDetails) => {
    setCartItems([...cartItems, { ...product, ...rentalDetails }]);
  };

  return (
    <Router> {/* ✅ Wrap everything inside Router */}
      <div className="min-h-screen bg-gray-50">
        <Navbar cartItemCount={cartItems.length} onCartClick={() => setShowCart(true)} />
        
        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes> {/* ✅ Define Routes */}
              {/* Home Route */}
              <Route path="/" element={
                showCart ? (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Cart 
                      items={cartItems} 
                      onClose={() => setShowCart(false)}
                      setCartItems={setCartItems}
                    />
                  </motion.div>
                ) : selectedProduct ? (
                  <motion.div
                    key="product-details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductDetails 
                      product={selectedProduct}
                      onBack={() => setSelectedProduct(null)}
                      onAddToCart={handleAddToCart}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="category-list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CategoryGrid 
                      categories={categories}
                      selectedCategory={selectedCategory}
                      onSelectCategory={setSelectedCategory}
                    />
                    {selectedCategory && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <ProductList 
                          products={products.filter(p => p.category === selectedCategory)}
                          onProductSelect={setSelectedProduct}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                )
              } />

              {/* ✅ Payment Page Route */}
              <Route path="/payment" element={<PaymentForm />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
