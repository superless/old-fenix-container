import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
const Wrapper = styled.div`
  padding: 10px;
  color: red;
`;

export interface TestComponentProps {
  text?: string;
}

export const TestComponent: React.FC<TestComponentProps> = ({ text }) => (
  <Wrapper>{text ? text : 'Test Component'}
    <Button>Click Aquí</Button>
  </Wrapper>
);
