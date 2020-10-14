import React from 'react';
import { Container, Header } from 'semantic-ui-react';
// import SubtitleDisplay from '../SubtitleDisplay/SubtitleDisplay';
import SubtitleLoad from '../SubtitleLoad/SubtitleLoad';

import './App.css';

function App() {
  return (
    <Container>
      <Header size="huge">SubSearch</Header>

      <SubtitleLoad />
      {/* <SubtitleDisplay /> */}
      
    </Container>
  );
}

export default App;
