import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { SubtitleDisplay } from '../SubtitleDisplay';
import { SubtitleLoad } from '../SubtitleLoad';

import './App.css';

function App() {
  return (
    <Container>
      <Header size="huge">SubSearch</Header>

      <SubtitleLoad />
      <SubtitleDisplay />
      
    </Container>
  );
}

export default App;
