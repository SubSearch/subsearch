import React, { PropsWithChildren } from 'react';
import { Dropdown, Input, DropdownItemProps } from 'semantic-ui-react';

function LanguageDropdown(
  props: PropsWithChildren<{ languages: Record<string, string> }>
) {
  const languages: Array<DropdownItemProps> = [];
  for (const [code, name] of Object.entries(props.languages || {})) {
    languages.push({
      key: code,
      value: code,
      text: name,
    });
  }
  return (
    <Dropdown search selection placeholder="Language" options={languages} />
  );
}

function SubtitleLoad() {
  return (
    <Input
      label="YouTube video link"
      type="text"
      fluid
      action={<LanguageDropdown languages={{ 'ru-RU': 'Russian' }} />}
    />
  );
}

export default SubtitleLoad;
