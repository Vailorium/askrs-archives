import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import AuthService from '../../../services/AuthService';
import { useGetUserProfileQuery } from '../../../services/UserProfileApi';

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
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values) => {
        onSubmit();
        const result = await AuthService.registerUser(values.email, values.password);
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
            <Form.Group as={Col} md="12" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!registerError}
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
                isInvalid={!!registerError}
              />
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
