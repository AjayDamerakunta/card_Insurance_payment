import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FaCreditCard, FaRegCreditCard } from 'react-icons/fa';
import { SiPaytm, SiGooglepay, SiPhonepe } from 'react-icons/si';
import Lottie from 'lottie-react';
// import successAnimation from '../assets/success.json';
// import CreditCardForm from './payment-methods/CreditCardForm';
// import DebitCardForm from './payment-methods/DebitCardForm';
// import UPIForm from './payment-methods/UPIForm';
// import PersonalInfoForm from './payment-methods/PersonalInfoForm';
import CreditCardForm from "./payment-methods/CreditCardForm";
import DebitCardForm from "./payment-methods/DebitCardForm";
import UPIForm from "./payment-methods/UPIForm";
import PersonalInfoForm from "./PersonalInfoForm";


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Phone number is required'),
  cardNumber: Yup.string().when('paymentMethod', {
    is: (val) => val === 'credit' || val === 'debit',
    then: () => Yup.string().matches(/^[0-9]{16}$/, 'Invalid card number').required('Card number is required'),
  }),
  cvv: Yup.string().when('paymentMethod', {
    is: (val) => val === 'credit' || val === 'debit',
    then: () => Yup.string().matches(/^[0-9]{3,4}$/, 'Invalid CVV').required('CVV is required'),
  }),
  expiryDate: Yup.string().when('paymentMethod', {
    is: (val) => val === 'credit' || val === 'debit',
    then: () => Yup.string().matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date (MM/YY)').required('Expiry date is required'),
  }),
  upiId: Yup.string().when('paymentMethod', {
    is: 'upi',
    then: () => Yup.string().matches(/^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/, 'Invalid UPI ID').required('UPI ID is required'),
  }),
});

const PaymentForm = ({ orderTotal = 0, onSuccess = () => {} }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit');

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      // ✅ Show an Alert Pop-up when Payment is Done
      window.alert("🎉 Payment Done Successfully!");
      
      setSubmitting(false);
      onSuccess(values);
    }, 1000);
  };
  
  if (showSuccess) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-64 mx-auto">
            <Lottie animationData={successAnimation} loop={false} />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mt-4">Payment Successful!</h2>
          <p className="text-gray-600 mt-2">Thank you for your payment</p>
          <button
            onClick={() => setShowSuccess(false)}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <div className="text-right">
              <p className="text-sm text-gray-500">Order Total</p>
              <p className="text-xl font-bold text-gray-900">₹{orderTotal.toFixed(2)}</p>
            </div>
          </div>
          
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              paymentMethod: selectedPaymentMethod,
              cardNumber: '',
              cvv: '',
              expiryDate: '',
              upiId: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="space-y-4">
                  <label className="form-label">Payment Method</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPaymentMethod('credit');
                        setFieldValue('paymentMethod', 'credit');
                      }}
                      className={`payment-method-button ${values.paymentMethod === 'credit' ? 'active' : ''}`}
                    >
                      <FaCreditCard className="text-2xl mr-2 text-blue-600" />
                      <span className="font-medium">Credit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPaymentMethod('debit');
                        setFieldValue('paymentMethod', 'debit');
                      }}
                      className={`payment-method-button ${values.paymentMethod === 'debit' ? 'active' : ''}`}
                    >
                      <FaRegCreditCard className="text-2xl mr-2 text-green-600" />
                      <span className="font-medium">Debit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPaymentMethod('upi');
                        setFieldValue('paymentMethod', 'upi');
                      }}
                      className={`payment-method-button ${values.paymentMethod === 'upi' ? 'active' : ''}`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="flex space-x-1">
                          <SiGooglepay className="text-xl text-blue-600" />
                          <SiPhonepe className="text-xl text-indigo-600" />
                          <SiPaytm className="text-xl text-blue-500" />
                        </div>
                        <span className="font-medium mt-1">UPI</span>
                      </div>
                    </button>
                  </div>
                </div>

                <PersonalInfoForm errors={errors} touched={touched} />

                {values.paymentMethod === 'credit' && (
                  <CreditCardForm errors={errors} touched={touched} />
                )}

                {values.paymentMethod === 'debit' && (
                  <DebitCardForm errors={errors} touched={touched} />
                )}

                {values.paymentMethod === 'upi' && (
                  <UPIForm errors={errors} touched={touched} />
                )}

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 mt-8"
                >
                  Pay ₹{orderTotal.toFixed(2)}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;