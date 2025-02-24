import { Field } from 'formik';
import { FaRegCreditCard } from 'react-icons/fa';

const DebitCardForm = ({ errors, touched }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="cardNumber" className="form-label">Debit Card Number</label>
        <div className="relative">
          <Field
            id="cardNumber"
            name="cardNumber"
            className="form-input pr-10"
            placeholder="1234 5678 9012 3456"
          />
          <FaRegCreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {errors.cardNumber && touched.cardNumber && (
          <div className="error-message">{errors.cardNumber}</div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
          <Field
            id="expiryDate"
            name="expiryDate"
            className="form-input"
            placeholder="MM/YY"
          />
          {errors.expiryDate && touched.expiryDate && (
            <div className="error-message">{errors.expiryDate}</div>
          )}
        </div>

        <div>
          <label htmlFor="cvv" className="form-label">CVV</label>
          <Field
            id="cvv"
            name="cvv"
            type="password"
            className="form-input"
            placeholder="123"
          />
          {errors.cvv && touched.cvv && (
            <div className="error-message">{errors.cvv}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebitCardForm;