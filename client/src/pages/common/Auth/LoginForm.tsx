import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import AuthService from '../../../services/AuthService';
import { useGetUserProfileQuery } from '../../../services/UserProfileApi';
import loginSchema from '../../../lib/LoginSchema';

interface LoginFormProps {
  onSuccess: () => void,
  onSubmit: () => void,
  onDone: () => void,
}
const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const [loginError, setLoginError] = useState('');
  const { refetch } = useGetUserProfileQuery();
  const { onSuccess, onSubmit, onDone } = props;

  return (
    <Formik
      validationSchema={loginSchema}
      validateOnChange={false}
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values) => {
        onSubmit();
        setLoginError('');
        const result = await AuthService.signIn(values.email, values.password);
        if (result.success) {
          onSuccess();
          refetch();
        } else {
          setLoginError(result.message);
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
            <Form.Group as={Col} md="12" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!loginError || !!errors.email}
              />
              { !!errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> }
              { !!loginError && <Form.Control.Feedback type="invalid">{loginError}</Form.Control.Feedback> }
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!loginError || !!errors.password}
              />
              { !!errors.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback> }
              { !!loginError && <Form.Control.Feedback type="invalid">{loginError}</Form.Control.Feedback> }
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Button
              type="submit"
              variant="primary"
            >
              Login
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
export default LoginForm;
