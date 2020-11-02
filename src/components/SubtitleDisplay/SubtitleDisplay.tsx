import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Table } from 'semantic-ui-react';
import Highlighter from 'react-highlight-words';

import secondsToTimeCode from '../../util/secondsToTimeCode';
import { State } from '../../store/types';

function SubtitleDisplay() {
  const subtitles = useSelector((state: State) => state.subtitles);
  const videoID = useSelector((state: State) => state.videoID);
  const language = useSelector((state: State) => state.language);
  const noSubtitles = subtitles.size === 0;
  const subtitlesLoading = Boolean(language && noSubtitles);
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <React.Fragment>
      <Input
        label="Subtitle search query"
        type="text"
        fluid
        disabled={noSubtitles}
        loading={subtitlesLoading}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Timecode</Table.HeaderCell>
            <Table.HeaderCell>Text</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Array.from(subtitles.entries ? subtitles.entries() : []).map(([seconds, text]) => {
            if (!text.toLowerCase().includes(searchQuery.toLowerCase()))
              return null;
            const timecode = secondsToTimeCode(seconds);
            return (
              <Table.Row>
                <Table.Cell>
                  <a
                    href={`https://youtube.com/watch?v=${videoID}&t=${seconds}`}
					target="_blank"
                  >
                    {timecode}
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <Highlighter textToHighlight={text} searchWords={[searchQuery]} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
}

export default SubtitleDisplay;
