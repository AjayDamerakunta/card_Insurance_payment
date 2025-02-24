import { Field } from 'formik';

const UPIForm = ({ errors, touched }) => {
  return (
    <div>
      <label htmlFor="upiId" className="form-label">UPI ID</label>
      <Field
        id="upiId"
        name="upiId"
        className="form-input"
        placeholder="username@upi"
      />
      {errors.upiId && touched.upiId && (
        <div className="error-message">{errors.upiId}</div>
      )}
    </div>
  );
};

export default UPIForm;