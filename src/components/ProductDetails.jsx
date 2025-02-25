import React, { useState } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetails = ({ product, onBack, onAddToCart }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedInsurance, setSelectedInsurance] = useState(null);

  const calculateTotalHours = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate the difference in hours
    const diffInHours = (end - start) / (1000 * 60 * 60);
    
    // Round up to the nearest hour and ensure minimum of 1 hour
    return Math.max(1, Math.round(diffInHours));
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.floor(diffInDays));
  };

  const calculateTotal = () => {
    const hours = calculateTotalHours();
    const rentAmount = hours * product.pricePerHour;
    const insuranceAmount = selectedInsurance ? selectedInsurance.price : 0;
    return rentAmount + insuranceAmount;
  };

  const handleSubmit = () => {
    onAddToCart(product, {
      startDate,
      endDate,
      insurance: selectedInsurance,
      totalAmount: calculateTotal(),
      hours: calculateTotalHours()
    });
    window.alert("✅ Item added to the cart successfully!");
    onBack();
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 mb-6 hover:text-gray-800"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg"
          />
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Features:</h3>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Rental Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1  h-[50px] block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date & Time</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 h-[50px] block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {startDate && endDate && (
              <div className="mt-4 text-sm text-gray-600">
                Duration: {calculateDays()} days and {calculateTotalHours() % 24} hours
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Insurance Plans</h3>
              <div className="space-y-3">
                {product.insurancePlans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`border rounded-lg p-4 cursor-pointer ${
                      selectedInsurance?.id === plan.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                    onClick={() => setSelectedInsurance(plan)}
                  >
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-indigo-600 mr-2" />
                      <div>
                        <h4 className="font-medium">{plan.name}</h4>
                        <p className="text-sm text-gray-600">{plan.description}</p>
                        <p className="text-indigo-600 font-medium mt-1">₹{plan.price}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Rental Amount ({calculateTotalHours()} hours)</span>
                <span>₹{calculateTotalHours() * product.pricePerHour}</span>
              </div>
              {selectedInsurance && (
                <div className="flex justify-between text-sm mb-2">
                  <span>Insurance ({selectedInsurance.name})</span>
                  <span>₹{selectedInsurance.price}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg mt-4">
                <span>Total Amount</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={!startDate || !endDate}
              className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProductDetails;