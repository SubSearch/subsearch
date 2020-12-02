import React, { useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { SubtitleDisplay } from '../SubtitleDisplay';
import { SubtitleLoad } from '../SubtitleLoad';

import './App.css';

function App() {
  const [subtitlesLink, setSubtitlesLink] = useState<string>('');
  const [videoLink, setVideoLink] = useState<string>('');

  return (
    <Container>
      <Header size="huge">SubSearch</Header>

      <SubtitleLoad onChange={setVideoLink} onSelect={setSubtitlesLink} />
      <SubtitleDisplay subtitlesLink={subtitlesLink} videoLink={videoLink} />
    </Container>
  );
}

export default App;
