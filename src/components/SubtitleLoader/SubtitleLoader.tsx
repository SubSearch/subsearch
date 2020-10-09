import React from 'react';
import { Input, InputOnChangeData } from 'semantic-ui-react';

import './SubtitleLoader.css';

type SubtitleLoaderProps = {
  loading?: boolean;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => void;
};

function SubtitleLoader({
  loading,
  disabled,
  onChange,
}: React.PropsWithChildren<SubtitleLoaderProps>) {
  return (
    <Input
      label="YouTube video link"
      type="text"
      fluid
      loading={loading}
      disabled={disabled}
      onChange={onChange}
    />
  );
}

export default SubtitleLoader;
