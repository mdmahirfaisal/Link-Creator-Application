import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect({ handleSelectChange, options, label, styles, inputStyle }) {
    const theme = useTheme();
    const [selectValue, setSelectValue] = React.useState("");

    return (
        <FormControl sx={styles}>
            <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={selectValue}
                onChange={e => {
                    handleSelectChange(e.target.value)
                    setSelectValue(e.target.value)
                }}
                input={<OutlinedInput label={label} />}
                MenuProps={MenuProps}
                sx={inputStyle}
            >
                {options?.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, selectValue, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}