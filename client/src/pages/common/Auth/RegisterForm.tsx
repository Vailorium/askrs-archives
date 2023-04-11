/* eslint-disable @typescript-eslint/no-unused-vars */
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import PasswordStrengthBar from 'react-password-strength-bar';
import AuthService from '../../../services/AuthService';
import { useGetUserProfileQuery } from '../../../services/UserProfileApi';
import registerSchema from '../../../lib/RegisterSchema';

interface RegisterFormProps {
  onSuccess: () => void,
  onSubmit: () => void,
  onDone: () => void,
}
const RegisterForm: React.FC<RegisterFormProps> = (props: RegisterFormProps) => {
  const { onSuccess, onSubmit, onDone } = props;
  const { refetch } = useGetUserProfileQuery();
  const [registerError, setRegisterError] = useState('');

  return (
    <Formik
      validationSchema={registerSchema}
      initialValues={{
        username: '', email: '', password: '', confirmPassword: '',
      }}
      validateOnChange={false}
      onSubmit={async (values) => {
        onSubmit();
        const result = await AuthService.registerUser(
          values.username, values.email, values.password,
        );
        if (result.success) {
          onSuccess();
          refetch();
        } else {
          setRegisterError(result.message);
        }
        onDone();
      }}
    >
      {({
        handleSubmit,
        handleChange,
        // handleBlur,
        values,
        touched,
        // isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                isValid={touched.username && !errors.username}
                isInvalid={!!registerError || !!errors.username}
              />
              { !!errors.username && <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback> }
              { !!registerError && <Form.Control.Feedback type="invalid">{registerError}</Form.Control.Feedback> }
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!registerError || !!errors.email}
              />
              { !!errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> }
              { !!registerError && <Form.Control.Feedback type="invalid">{registerError}</Form.Control.Feedback> }
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                autoComplete="new-password"
                isValid={touched.password && !errors.password}
                isInvalid={!!registerError || !!errors.password}
              />
              <PasswordStrengthBar password={values.password} minLength={8} />
              { !!errors.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback> }
              { !!registerError && <Form.Control.Feedback type="invalid">{registerError}</Form.Control.Feedback> }
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                isValid={touched.confirmPassword && !errors.confirmPassword}
                isInvalid={!!registerError || !!errors.confirmPassword}
              />
              { !!errors.confirmPassword && <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback> }
              { !!registerError && <Form.Control.Feedback type="invalid">{registerError}</Form.Control.Feedback> }
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Button
              type="submit"
              variant="primary"
            >
              Register
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
export default RegisterForm;
