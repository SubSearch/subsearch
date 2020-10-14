import React from 'react';
import { Container, Header, Input, Table } from 'semantic-ui-react';
import SubtitleLoad from '../SubtitleLoad/SubtitleLoad';

import './App.css';

function App() {
  return (
    <Container>
      <Header size="huge">SubSearch</Header>

      <SubtitleLoad />

      <Input
        label="Subtitle search query"
        type="text"
        fluid
        
      />

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Timecode</Table.HeaderCell>
            <Table.HeaderCell>Text</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <a href="https://yandex.ru">00:00:00</a>
            </Table.Cell>
            <Table.Cell>
              Hello, <b>world</b>!
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <a href="https://yandex.ru">00:06:66</a>
            </Table.Cell>
            <Table.Cell>
              This <b>world</b> - is the most liked <b>world</b> by me
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <a href="https://yandex.ru">00:13:37</a>
            </Table.Cell>
            <Table.Cell>
              I just created a new <b>world</b> in Minecraft
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
}

export default App;
