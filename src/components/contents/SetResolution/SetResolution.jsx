import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getPhoneResolution, searchPhones } from './functions';
import { useDebounce, useStore } from '../../../customHooks';
import { useUpdateEffect } from 'react-use';
import { Or } from '../Or';
import { Box, Typography } from '@material-ui/core';
import { LoadingOverlay } from '../../reusables';

export const SetResolution = () => {
  const { resolution, setWidth, setHeight, selectedPhone, setSelectedPhone } = useStore();

  const [searchInput, setSearchInput] = useState('');
  const [options, setOptions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [fetchingResolution, setFetchingResolution] = useState(false);

  const searchQuery = useDebounce(searchInput, 200);


  useEffect(() => {
    setOptions([]);
    if (searchQuery?.length > 1) {
      setSearching(true);
      searchPhones(searchQuery)
        .then(setOptions)
        .finally(() => setSearching(false));
    }
  }, [searchQuery]);

  useUpdateEffect(() => {
    if (selectedPhone && selectedPhone.slug) {
      setFetchingResolution(true);
      getPhoneResolution(selectedPhone.slug)
        .then(({ width, height }) => {
          setHeight(height);
          setWidth(width);
        })
        .finally(() => setFetchingResolution(false));
    } else {
      setWidth('');
      setHeight('');
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
        loading={searching}
        getOptionLabel={({ name }) => name || ''}
        style={{ maxWidth: 300, width: '75%' }}
        renderInput={(params) => <TextField {...params} label="Search device" variant="outlined" />}
        getOptionSelected={(option, value) => option.name === value.name}
        filterOptions={(options, state) => options}
      />
      <Or />

      <LoadingOverlay loading={fetchingResolution}>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-end" style={{ maxWidth: "10rem"}}>
          <TextField
            type="number"
            label="Width"
            style={{ width: '40%' }}
            value={resolution.width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <Typography>X</Typography>
          <TextField
            type="number"
            label="Height"
            style={{ width: '40%' }}
            value={resolution.height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </Box>
      </LoadingOverlay>
    </>
  );
};

export default SetResolution;
