import { Field } from 'formik';

const PersonalInfoForm = ({ errors, touched }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="form-label">Name</label>
        <Field
          id="name"
          name="name"
          className="form-input"
          placeholder="Enter your full name"
        />
        {errors.name && touched.name && (
          <div className="error-message">{errors.name}</div>
        )}
      </div>

      <div>
        <label htmlFor="email" className="form-label">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          className="form-input"
          placeholder="you@example.com"
        />
        {errors.email && touched.email && (
          <div className="error-message">{errors.email}</div>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="form-label">Phone</label>
        <Field
          id="phone"
          name="phone"
          className="form-input"
          placeholder="10-digit mobile number"
        />
        {errors.phone && touched.phone && (
          <div className="error-message">{errors.phone}</div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;