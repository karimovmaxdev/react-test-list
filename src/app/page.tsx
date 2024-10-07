'use client';
import React from 'react';
import { initialList } from './data';
import ListItem from './components/ListItem';
import styled from 'styled-components';

const App: React.FC = () => {
    return (
        <AppContainer>
            <Title>Вложенный список</Title>
            <ListItem item={initialList}  />
        </AppContainer>
    );
};

export default App;

// Стили
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;
