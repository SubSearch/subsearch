import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import SubtitleLoader from '../SubtitleLoader';
import SubtitleSearcher from '../SubtitleSearcher';

import './App.css';

function App() {
  return (
    <Container>
      <Header size="huge">SubSearch</Header>
      <SubtitleLoader />
      <SubtitleSearcher languages={{ 'ru-RU': 'Russian' }} />
    </Container>
  );
}

export default App;
