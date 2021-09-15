import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getPhoneResolution, searchPhones } from './functions';
import { useDebounce, useStore } from '../../../customHooks';
import { useUpdateEffect } from 'react-use';
import { Or } from '../Or';

export const SetResolution = () => {
  const { selectedPhone, setSelectedPhone } = useStore();

  const [searchInput, setSearchInput] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchQuery = useDebounce(searchInput, 200);

  useEffect(() => {
    setOptions([]);
    if (searchQuery?.length > 1) {
      setLoading(true);
      searchPhones(searchQuery)
        .then(setOptions)
        .finally(() => setLoading(false));
    }
  }, [searchQuery]);

  useUpdateEffect(() => {
    if (selectedPhone && selectedPhone.detail) {
      getPhoneResolution(selectedPhone.detail).then();
    }
  }, [selectedPhone]);

  return (
    <>
      <Autocomplete
        value={selectedPhone}
        onChange={(e, data) => {
          setSelectedPhone(data);
        }}
        inputValue={searchInput}
        onInputChange={(e, data) => setSearchInput(data)}
        options={options}
        loading={loading}
        getOptionLabel={({ name }) => name || ''}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select device" variant="outlined" />}
        getOptionSelected={(option, value) => option.name === value.name}
        filterOptions={(options, state) => options}
      />
      <Or />
      <TextField type="number" label="Width" />
      <TextField type="number" label="Height" />
    </>
  );
};

export default SetResolution;
