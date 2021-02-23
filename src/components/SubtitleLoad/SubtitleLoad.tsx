import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
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

import { Language } from '../../util/getLanguages';
import { videoId, debounce, getLanguages } from '../../util';
import { clearSubtitles, loadSubtitles, setVideo } from '../../store/actions';
import { State } from '../../store/types';

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

function SubtitleLoad() {
  const link = useSelector<State>((state) => state.video) as string;
  const setLink = (link: string) => dispatch(setVideo(link));
  const dSetLink = useCallback(debounce(setLink, 500), []);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [language, setLanguage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      setLanguages([]);
      setLanguage('');
      const id = videoId(link);
      if (!id) return;
      setLoading(true);
      const languages = await getLanguages(id).catch((v) => []);
      setLoading(false);
      setLanguages(languages ?? []);
    })();
  }, [link, dispatch]);

  useEffect(() => {
    dispatch(clearSubtitles());
    const id = videoId(link);
    if (language && id) dispatch(loadSubtitles(language, id));
  }, [language, link, dispatch]);

  return (
    <Input
      label={!isMobile ? "YouTube video link" : undefined}
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
