import React, { useEffect, useState } from 'react';
import { Input, Table } from 'semantic-ui-react';
import Highlighter from 'react-highlight-words';

import { getSubtitles, Subtitle } from '../../util/YouTube';

function SubtitleDisplay({
  videoLink,
  subtitlesLink,
}: {
  videoLink?: string;
  subtitlesLink?: string;
}) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);

  useEffect(() => {
    (async function () {
      setSubtitles([]);
      if (!subtitlesLink) return;
      setLoading(true);
      const subtitles = await getSubtitles(subtitlesLink);
      setLoading(false);
      setSubtitles(subtitles);
    })();
  }, [subtitlesLink]);

  return (
    <React.Fragment>
      <Input
        label="Subtitle search query"
        type="text"
        loading={loading}
        fluid
        disabled={subtitles.length === 0}
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
          {subtitles.map(({ seconds, timecode, text }) => {
            if (!text.toLowerCase().includes(searchQuery.toLowerCase()))
              return null;
            return (
              <Table.Row key={`${seconds}:${text}`}>
                <Table.Cell>
                  <a
                    href={`https://youtube.com/watch?v=${videoLink}&t=${seconds}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {timecode}
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <Highlighter
                    textToHighlight={text}
                    searchWords={[searchQuery]}
                  />
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
