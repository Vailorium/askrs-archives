import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingPanel: React.FC<{ loading: boolean }> = (props: { loading: boolean }) => {
  const { loading } = props;
  return (
    <div
      className="loading-screen loading-screen-rounded"
      style={{ display: loading ? 'flex' : 'none' }}
    >
      <Spinner animation="border" variant="primary" role="status" />
    </div>
  );
};
export default LoadingPanel;
