import styled from 'styled-components';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <Title>My page ATUA</Title>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
        neque, ab eligendi natus nostrum optio.
      </p>
    </>
  );
};

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default Home;
