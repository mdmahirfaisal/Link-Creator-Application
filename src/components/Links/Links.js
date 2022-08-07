import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Popover, Typography } from '@mui/material';
import { AiFillCaretDown } from 'react-icons/ai';
import { P } from '../styles/Headings.styles';
import { Flex } from '../styles/Container.styles';
import CreateLinkModal from '../CreateLinkModal/CreateLinkModal';
import { useSelector, useDispatch } from 'react-redux';
import SelectField from '../SelectField/SelectField';
import { handleDeleteLinkedData } from '../../redux/slices/linkEditorSlice';

const names = ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10'];

const borderStyle = { borderLeft: '1px solid #cbfe2c', fontSize: '15px', py: 0.2 }

const Links = () => {
    const { linkedData } = useSelector(state => state.linkEditor);
    const [anchorEl, setAnchorEl] = useState(null);
    const [linkModalOpen, setLinkModalOpen] = useState(false);
    // const [selectValue, setSelectValue] = useState("");
    const [actionData, setActionData] = useState(null)
    const dispatch = useDispatch();

    // link create modal
    const handleLinkModalOpen = () => {
        setLinkModalOpen(true);
    };

    // Action button 
    const handleOpenAction = (currentTarget, data) => {
        setAnchorEl(currentTarget);
        setActionData(data)
    };

    const handleCloseAction = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleSelectChange = data => {
        console.log(data);
        // setSelectValue(data)
    }
    console.log(linkedData[0]?.id, linkedData);

    return (
        <>
            <P color='gray' p='20px 0 0 10px' size='20px'>Create Links</P>
            <Flex items='center' justify='space-between' p='0 2%'>
                <SelectField handleSelectChange={handleSelectChange} options={names} label="Select Project" styles={{ width: '30%', my: 4, py: 0 }} inputStyle={{ fontSize: '14px' }} />

                <Button onClick={handleLinkModalOpen} sx={{ p: '15px 20px', bgcolor: '#6c767d', color: 'white', "&:hover": { bgcolor: '#434d54' } }}>New Link</Button>
            </Flex>
            {/* ----- Link creator modal ----- */}
            <CreateLinkModal linkModalOpen={linkModalOpen} setLinkModalOpen={setLinkModalOpen} actionData={actionData} />

            {/* ---- Table ---- */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead >
                        <TableRow sx={{ bgcolor: '#a7c942', }}>
                            <TableCell sx={{ ...borderStyle, color: 'white', py: 1 }} align='left'>Action</TableCell>
                            <TableCell sx={{ ...borderStyle, color: 'white', py: 1 }} align="left">Source</TableCell>
                            <TableCell sx={{ ...borderStyle, color: 'white', py: 1 }} align="left">Link type</TableCell>
                            <TableCell sx={{ ...borderStyle, color: 'white', py: 1 }} align="left">Target</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {linkedData?.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell sx={borderStyle} align="center" ><Button onClick={(e) => handleOpenAction(e.currentTarget, data)} sx={{ pl: 3, pr: 1 }} variant='contained'>Action <AiFillCaretDown style={{ marginLeft: '15px' }} /></Button></TableCell>
                                <TableCell sx={borderStyle} align="left">{data.source}</TableCell>
                                <TableCell sx={borderStyle} align="left">{data.linkType}</TableCell>
                                <TableCell sx={borderStyle} align="left">{data.target}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                    {/* --------- Action button --------- */}
                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleCloseAction}
                        anchorOrigin={{
                            vertical: 'bottom', horizontal: 'left',
                        }}>
                        <Typography sx={{ p: 1 }}>
                            {/* <Button variant='text' sx={{ color: 'gray', ml: '-8px' }}>Edit </Button> <br /> */}
                            <Button onClick={() => {
                                handleLinkModalOpen()
                                handleCloseAction()
                            }} variant='text' sx={{ color: 'gray' }}>Update</Button> <br />

                            <Button onClick={() => {
                                dispatch(handleDeleteLinkedData(actionData))
                                handleCloseAction()
                            }} variant='text' sx={{ color: 'gray' }}>Delete</Button> <br />

                            {/* <P borderB="1px solid lightgray" /> */}
                            <Button variant='text' sx={{ color: 'gray' }}>Separated link</Button>
                        </Typography>
                    </Popover>
                </Table>
            </TableContainer>

            {!linkedData?.length && <Typography sx={{ textAlign: 'center', color: 'lightgray', fontWeight: 'bold', mt: '10vw' }} variant='h5'>No Links Available Please Create Links</Typography>}
        </>
    );
};

export default Links;