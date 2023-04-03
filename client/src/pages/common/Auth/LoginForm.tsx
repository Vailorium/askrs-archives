import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import AuthService from '../../../services/AuthService';

interface LoginFormProps {
  onSuccess: () => void,
  onSubmit: () => void,
  onDone: () => void,
}
const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const [loginError, setLoginError] = useState('');
  const { onSuccess, onSubmit, onDone } = props;

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values) => {
        onSubmit();
        setLoginError('');
        const result = await AuthService.signIn(values.email, values.password);
        if (result.success) {
          onSuccess();
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
                isInvalid={!!loginError}
              />
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
                isInvalid={!!loginError}
              />
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
