import React from 'react';
import { Dropdown, DropdownItemProps, DropdownProps } from 'semantic-ui-react';

type LanguageDropdownProps = {
  languages: Record<string, string>;
  loading?: boolean;
  disabled?: boolean;
  onChange?: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => void;
};

function LanguageDropdown({
  languages,
  loading,
  disabled,
  onChange,
}: React.PropsWithChildren<LanguageDropdownProps>) {
  let conversedLanguages: Array<DropdownItemProps> = [];
  for (let language in languages) {
    conversedLanguages.push({
      key: language,
      text: languages[language],
      value: language,
    });
  }
  return (
    <Dropdown
      search
      selection
      placeholder="Language"
      options={conversedLanguages}
      loading={loading}
      disabled={disabled}
      onChange={onChange}
    />
  );
}

export default LanguageDropdown;
