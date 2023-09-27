import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { country_list } from '../../Administrator/Payment/countrynames';
import languages from '../../assets/js/languages';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const specializations = [
  "Cognitive Behavioral Therapy (CBT)",
  "Rational Emotive Behavioral Therapy (REBT)",
  "Behavioral",
  "Psychoanalytical/Psychodynamic",
  "Positive Psychology",
  "Humanistic",
  "Acceptance and Commitment Therapy (ACT)",
  "Mindfulness",
  "Person-centered Therapy (PCT)",
  "Hypnotherapy",
  "Systemic Therapy",
  "Dialectical Behavioral Therapy (DBT)",
"Compassion Therapy",
 "Forgiveness Therapy",
  "Cognitive Therapy",
  "Reality Therapy",
  
];
const expertise=[
  "Work",
"Relationship",
"Family",
"Emotional Control",
"Loneliness",
"Anxiety",
"Social",

]

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({profile,setProfile,type}) {
  const theme = useTheme();
  console.log(profile);
  const [personName, setPersonName] = React.useState([]);
  const [personName1, setPersonName1] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProfile(
      // On autofill we get a stringified value.
   {...profile,specializations:   typeof value === 'string' ? value.split(',') : value,}
    );
  };
  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setProfile(
        // On autofill we get a stringified value.
     {...profile,expertise:   typeof value === 'string' ? value.split(',') : value,}
      );
  };
  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setProfile(
        // On autofill we get a stringified value.
     {...profile,languages:   typeof value === 'string' ? value.split(',') : value,}
      );
  };
  return (
    <div>
     {type==="cp"&& <div>
         <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Specializations<span style={{color:"red"}}>*</span></label>
      <FormControl sx={{ width:"100%"}}>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={profile.specializations}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          sx={{display:"block",textAlign:"start",backgroundColor:"white",width:"100%", borderRadius:"10px", color:"black",marginBottom:"20px",border: '1px solid black',}}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {specializations.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Expertise<span style={{color:"red"}}>*</span></label>

      <FormControl sx={{ width:"100%" }}>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={profile.expertise}
          onChange={handleChange1}
          sx={{display:"block",textAlign:"start",backgroundColor:"white",width:"100%", borderRadius:"10px", color:"black",marginBottom:"20px",border: '1px solid black',}}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {expertise.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>}
      <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Languages<span style={{color:"red"}}>*</span></label>

<FormControl sx={{ width:"100%" }}>
  <Select
    labelId="demo-multiple-chip-label"
    id="demo-multiple-chip"
    multiple
    value={profile.languages}
    onChange={handleChange2}
    sx={{display:"block",textAlign:"start",backgroundColor:"white",width:"100%", borderRadius:"10px", color:"black",marginBottom:"20px",border: '1px solid black',}}
    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
    renderValue={(selected) => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {selected.map((value) => (
          <Chip key={value} label={value} />
        ))}
      </Box>
    )}
    MenuProps={MenuProps}
  >
    {Object.values(languages()).map((name) => (
      <MenuItem
        key={name}
        value={name.name}
        style={getStyles(name, personName, theme)}
      >
        {name.nativeName}
      </MenuItem>
    ))}
  </Select>
</FormControl>
    </div>
  );
}