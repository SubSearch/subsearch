import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Dropdown,
  Input,
  DropdownItemProps,
  DropdownProps,
} from 'semantic-ui-react';

import videoID from '../../util/videoID';
import debounce from '../../util/debounce';
import { getSubtitleURLs, Language } from '../../util/YouTube';

function LanguageDropdown(
  props: PropsWithChildren<{
    languages: Language[];
    loading?: boolean;
    disabled?: boolean;
    value?: boolean | number | string;
    onChange?: (
      event: React.SyntheticEvent<HTMLElement>,
      data: DropdownProps
    ) => void;
  }>
) {
  const languages: Array<DropdownItemProps> = props.languages.map(
    ({ name, url }) => ({ value: url, text: name, key: url })
  );
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

function SubtitleLoad({
  onSelect,
  onChange,
}: {
  onSelect?: (url: string) => void;
  onChange?: (link: string) => void;
}) {
  const [link, setLink] = useState<string>('');
  const dSetLink = useCallback(debounce(setLink, 500), []);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [language, setLanguage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      setLanguages([]);
      setLanguage('');
      const id = videoID(link);
      if (!link || !id) return;
      setLoading(true);
      const languages = await getSubtitleURLs(id);
      setLoading(false);
      setLanguages(languages ?? []);
    })();
    if (typeof onChange === 'function') onChange(link);
  }, [link, onChange]);

  useEffect(() => {
    if (typeof onSelect === 'function') onSelect(language);
  }, [language, onSelect]);

  return (
    <Input
      label="YouTube video link"
      type="text"
      onChange={(_, v) => dSetLink(v.value)}
      fluid
      action={
        <LanguageDropdown
          languages={languages}
          loading={loading}
          disabled={languages.length === 0}
          onChange={(_, v) => setLanguage(String(v.value ?? ''))}
        />
      }
    />
  );
}

export default SubtitleLoad;
