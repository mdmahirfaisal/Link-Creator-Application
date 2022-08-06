import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, MenuItem, Popover, Select, Typography } from '@mui/material';
import { AiFillCaretDown } from 'react-icons/ai';
import { P } from '../styles/Headings.styles';
import { Flex } from '../styles/Container.styles';
import CreateLinkModal from '../CreateLinkModal/CreateLinkModal';
import { useSelector } from 'react-redux';


const borderStyle = { borderLeft: '1px solid #cbfe2c', fontSize: '20px' }


const Links = () => {
    const linkedData = useSelector(state => state.linkEditor.linkedData)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [project, setProject] = React.useState("");
    const [linkModalOpen, setLinkModalOpen] = React.useState(false);

    // link create modal
    const handleLinkModalOpen = () => {
        setLinkModalOpen(true);
    };


    // Action button 
    const handleOpenAction = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseAction = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    //// Handle select project 
    const handleSelectProject = (e) => {
        setProject(e.target.value)
    }
    console.log(linkedData);

    return (
        <>
            <P color='gray' p='20px 0 0 10px' size='20px'>Create Links</P>
            <Flex items='center' justify='space-between' p='0 1%'>

                <Box>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={project.LinkType}
                        label="Age"
                        onChange={handleSelectProject}>
                        {linkedData.slice(0, 4).map((data, i) => <MenuItem key={i} value={data.LinkType}>{data.LinkType}</MenuItem>)}
                    </Select>
                </Box>
                <Button onClick={handleLinkModalOpen} sx={{ bgcolor: '#6c767d', color: 'white', "&:hover": { bgcolor: '#434d54' } }}>New Link</Button>
            </Flex>
            {/* ----- Link creator modal ----- */}
            <CreateLinkModal linkModalOpen={linkModalOpen} setLinkModalOpen={setLinkModalOpen} />

            {/* ---- Table ---- */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead >
                        <TableRow sx={{ bgcolor: '#a7c942', }}>
                            <TableCell sx={{ ...borderStyle, color: 'white' }} align='left'>Action</TableCell>
                            <TableCell sx={{ ...borderStyle, color: 'white' }} align="left">Source</TableCell>
                            <TableCell sx={{ ...borderStyle, color: 'white' }} align="left">Link type</TableCell>
                            <TableCell sx={{ ...borderStyle, color: 'white' }} align="left">Target</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {linkedData?.slice(0, 4).map((row, index) => (
                            <TableRow key={row.id}>

                                <TableCell sx={borderStyle} align="center" ><Button onClick={handleOpenAction} sx={{ pl: 3, pr: 1, }} variant='contained'>Action <AiFillCaretDown style={{ marginLeft: '15px' }} /></Button></TableCell>
                                <TableCell sx={borderStyle} align="left">{row.Source}</TableCell>
                                <TableCell sx={borderStyle} align="left">{row.LinkType}</TableCell>
                                <TableCell sx={borderStyle} align="left">{row.Target}</TableCell>
                            </TableRow>
                        ))}
                        {/* --------- Action button --------- */}
                        <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleCloseAction}
                            anchorOrigin={{
                                vertical: 'bottom', horizontal: 'left',
                            }}>
                            <Typography sx={{ p: 1 }}>
                                <Button variant='text' sx={{ color: 'gray', ml: '-8px' }}>Edit </Button> <br />
                                <Button variant='text' sx={{ color: 'gray' }}>Update</Button> <br />
                                <Button variant='text' sx={{ color: 'gray' }}>Refresh</Button> <br />
                                <hr />
                                <Button variant='text' sx={{ color: 'gray' }}>Separated link</Button>
                            </Typography>
                        </Popover>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Links;