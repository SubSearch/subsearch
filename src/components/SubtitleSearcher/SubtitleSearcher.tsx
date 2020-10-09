import React from 'react';
import { Input, InputOnChangeData, DropdownProps } from 'semantic-ui-react';

import LanguageDropdown from '../LanguageDropdown';

import './SubtitleSearcher.css';

type SubtitleSearcherProps = {
  disabled?: boolean;
  loading?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => void;
  onSelect?: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => void;
  languages: Record<string, string>;
};

function SubtitleSearcher({
  disabled,
  loading,
  onChange,
  languages,
  onSelect,
}: React.PropsWithChildren<SubtitleSearcherProps>) {
  const dropdown = (
    <LanguageDropdown
      disabled={false}
      loading={false}
      languages={languages}
      onChange={onSelect}
    />
  );
  return (
    <Input
      label="Subtitle search query"
      type="text"
      fluid
      action={dropdown}
      disabled={disabled}
      loading={loading}
      onChange={onChange}
    />
  );
}

export default SubtitleSearcher;
