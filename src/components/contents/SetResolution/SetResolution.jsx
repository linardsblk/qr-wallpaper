import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getPhoneResolution, searchPhones } from './functions';
import { useDebounce, useStore } from '../../../customHooks';
import { useUpdateEffect } from 'react-use';
import { Or } from '../Or';
import { Box, Typography, Button } from '@material-ui/core';
import { LoadingOverlay } from '../../reusables';
import { getDeviceResolution } from '../../../functions';

export const SetResolution = () => {
  const { resolution, setWidth, setHeight, selectedPhone, setSelectedPhone, setResolution, setActiveStep } = useStore();

  const [searchInput, setSearchInput] = useState('');
  const [options, setOptions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [fetchingResolution, setFetchingResolution] = useState(false);

  const searchQuery = useDebounce(searchInput, 350);

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
          setResolution({ width, height });
        })
        .finally(() => setFetchingResolution(false));
    } else {
      setResolution({ width: '', height: '' });
    }
  }, [selectedPhone]);

  const handleCurrentDeviceResolutionButton = () => {
    setResolution(getDeviceResolution());
    setActiveStep(2);
  };

  return (
    <>
      <Button variant="contained" color="primary" component="label" onClick={handleCurrentDeviceResolutionButton}>
        Current device's resolution
      </Button>

      <Or />

      <Autocomplete
        value={selectedPhone}
        onChange={(e, data) => {
          setSelectedPhone(data);
        }}
        inputValue={searchInput}
        onInputChange={(e, data) => setSearchInput(data)}
        options={options || []}
        loading={searching}
        getOptionLabel={({ name }) => name || ''}
        style={{ maxWidth: 300, width: '75%' }}
        renderInput={(params) => <TextField {...params} label="Search device" variant="outlined" />}
        getOptionSelected={(option, value) => option.name === value.name}
        filterOptions={(options, state) => options}
      />

      <LoadingOverlay loading={fetchingResolution}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
          style={{ maxWidth: '10rem' }}
        >
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
            style={{ width: '40%', marginTop: '3rem' }}
            value={resolution.height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </Box>
      </LoadingOverlay>
    </>
  );
};

export default SetResolution;
