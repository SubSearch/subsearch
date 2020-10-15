import React, { PropsWithChildren, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Table } from 'semantic-ui-react';

import secondsToTimeCode from '../../util/secondsToTimeCode';
import { State } from '../../store/types';

function Emphasize(
  props: PropsWithChildren<{ children: string; text: string }>
) {
  const parts: Array<any> = props.children.split(props.text);
  const len = parts.length;
  for (let i = 1; i < len; i++) {
    parts.splice(2 * i - 1, 0, <b>{props.text}</b>);
  }
  return <>{parts}</>;
}

function SubtitleDisplay() {
  const subtitles = useSelector((state: State) => state.subtitles);
  const videoID = useSelector((state: State) => state.videoID);
  const language = useSelector((state: State) => state.language);
  const noSubtitles = Object.keys(subtitles).length === 0;
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
          {Object.entries(subtitles).map(([timecode, text]) =>
            text.toLowerCase().includes(searchQuery.toLowerCase()) ? (
              <Table.Row>
                <Table.Cell>
                  <a href={`https://youtube.com/watch?v=${videoID}&t=${timecode}`}>{secondsToTimeCode(parseInt(timecode))}</a>
                </Table.Cell>
                <Table.Cell>
                  <Emphasize text={searchQuery.toLowerCase()}>{text.toLowerCase()}</Emphasize>
                </Table.Cell>
              </Table.Row>
            ) : null
          )}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
}

export default SubtitleDisplay;
