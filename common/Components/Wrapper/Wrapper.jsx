import React from 'react';
import styled from '@emotion/styled';

const Wrapper = ({ children }) => {
  return <WrapperStyle>{children}</WrapperStyle>;
};

const WrapperStyle = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Wrapper;
