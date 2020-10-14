import React, { PropsWithChildren } from 'react';
import { Input, Table } from 'semantic-ui-react';

const mockSubtitleDate = {
  '00:00': 'Hello, world',
  '01:12': 'Bye, world',
};

function Emphasize(props: PropsWithChildren<{ children: string, text: string }>) {
  const parts: Array<any> = props.children.split(props.text);
  const len = parts.length;
  for (let i = 1; i < len; i++) {
    parts.splice(2 * i - 1, 0, <b>{props.text}</b>)
  }
  return <>{parts}</>;
}

function SubtitleDisplay() {
  return (
    <React.Fragment>
      <Input label="Subtitle search query" type="text" fluid />

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Timecode</Table.HeaderCell>
            <Table.HeaderCell>Text</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.entries(mockSubtitleDate).map(([timecode, text]) => (
            <Table.Row>
              <Table.Cell>
                <a href="https://yandex.ru">{timecode}</a>
              </Table.Cell>
              <Table.Cell>
                <Emphasize text="world">{text}</Emphasize>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
}

export default SubtitleDisplay;
