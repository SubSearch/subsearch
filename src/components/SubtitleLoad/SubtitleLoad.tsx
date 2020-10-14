import React, { PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Input, DropdownItemProps, DropdownProps } from 'semantic-ui-react';

import { loadLanguages, loadSubtitles } from '../../store/actions';
import { State } from '../../store/types';

function LanguageDropdown(
  props: PropsWithChildren<{
    languages: Record<string, string>;
    loading?: boolean;
    disabled?: boolean;
    value?: boolean | number | string;
    onChange?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void
  }>
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
    <Dropdown
      search
      selection
      placeholder="Language"
      options={languages}
      loading={props.loading}
      disabled={props.disabled}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

function SubtitleLoad() {
  const dispatch = useDispatch();
  const languages = useSelector((state: State) => state.languages);
  const language = useSelector((state: State) => state.language);
  const videoLink = useSelector((state: State) => state.videoLink);
  const noLanguages = Object.keys(languages).length === 0;
  const languagesLoading = Boolean(videoLink && noLanguages);
  return (
    <Input
      label="YouTube video link"
      type="text"
      onChange={(e) => dispatch(loadLanguages(e.target.value))}
      fluid
      action={
        <LanguageDropdown
          languages={languages}
          loading={languagesLoading}
          disabled={noLanguages}
          value={language}
          onChange={(_, v) => dispatch(loadSubtitles(String(v.value)))}
        />
      }
    />
  );
}

export default SubtitleLoad;
