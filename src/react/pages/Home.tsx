import React from "react";
import styled from "@emotion/styled";

const Home: React.FC = () => {
  return <Content>Hello, welcome to the playground.</Content>;
};

export default Home;

const Content = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  flex-grow: 1;
`;
