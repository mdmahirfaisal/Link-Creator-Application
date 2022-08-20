import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, CircularProgress, Popover, Typography } from '@mui/material';
import { AiFillCaretDown } from 'react-icons/ai';
import { P } from '../styles/Headings.styles';
import { Flex } from '../styles/Container.styles';
import CreateLinkModal from '../CreateLinkModal/CreateLinkModal';
import { useSelector, useDispatch } from 'react-redux';
import SelectField from '../SelectField/SelectField';
import { handleLinkedData } from '../../redux/slices/linkEditorSlice';
import { Neo4jContext, useReadCypher } from 'use-neo4j';
import Swal from 'sweetalert2';

const tableStyle = { borderLeft: '1px solid #cbfe2c', fontSize: '15px', py: 0.2 }

const Links = () => {
    const loadLinks = useReadCypher(`MATCH (n:Links ) RETURN n`)
    const dispatch = useDispatch();
    const { linkedData } = useSelector(state => state.linkEditor);
    const [anchorEl, setAnchorEl] = useState(null);
    const [linkModalOpen, setLinkModalOpen] = useState(false);
    const [actionData, setActionData] = useState(null);
    const { driver } = useContext(Neo4jContext);
    const session = driver?.session();

    useEffect(() => {
        if (loadLinks?.records?.length) dispatch(handleLinkedData(loadLinks.records?.map(d => d._fields[0].properties)))
    }, [loadLinks?.records, dispatch])

    // link create modal
    const handleLinkModalOpen = () => setLinkModalOpen(true);

    // Action buttons dropdown 
    const handleOpenAction = (currentTarget, data) => {
        setAnchorEl(currentTarget);
        setActionData(data)
    };
    const handleCloseAction = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleSelectChange = data => {
        // console.log(data);
    };

    // Delete Link
    const handleDeleteLink = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonColor: '#d33'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await session?.run(`MATCH (n:Links {Identifier: '${actionData.Identifier}'}) DETACH DELETE n`)
                if (res?.summary?.updateStatistics?._stats?.nodesDeleted > 0) {
                    Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
                    loadLinks.run()
                }
                else {
                    Swal.fire('Field!', 'Your file has been not deleted.', 'error')
                }
            }
        })
    };

    return (
        <>
            <P color='gray' p='20px 0 0 10px' size='20px'>Create Links</P>
            <Flex items='center' justify='space-between' p='0 2%'>
                <SelectField handleSelectChange={handleSelectChange} options={['Project 1', 'Project 2', 'Project 3']} label="Select Project" styles={{ width: '30%', my: 4, py: 0 }} inputStyle={{ fontSize: '14px' }} />
                <Button onClick={handleLinkModalOpen} sx={{ ml: 2, p: '11px 15px', bgcolor: '#6c767d', color: 'white', "&:hover": { bgcolor: '#434d54' } }}>New Link</Button>
            </Flex>
            {/* ----- Link creator modal ----- */}
            <CreateLinkModal linkModalOpen={linkModalOpen} setLinkModalOpen={setLinkModalOpen} actionData={actionData} setActionData={setActionData} loadLinks={loadLinks} />

            {/* ---- Table ---- */}
            <TableContainer component={Paper} sx={{ maxHeight: '420px' }}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead >
                        <TableRow sx={{ bgcolor: '#a7c942', }}>
                            <TableCell sx={{ ...tableStyle, color: 'white', py: 1 }} align='left'>Action</TableCell>
                            <TableCell sx={{ ...tableStyle, color: 'white', py: 1 }} align="left">Source</TableCell>
                            <TableCell sx={{ ...tableStyle, color: 'white', py: 1 }} align="left">Link type</TableCell>
                            <TableCell sx={{ ...tableStyle, color: 'white', py: 1 }} align="left">Target</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {linkedData?.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell sx={tableStyle} align="center" ><Button onClick={(e) => handleOpenAction(e.currentTarget, data)} sx={{ pl: 2, pr: 0.5 }} variant='contained'>Action <AiFillCaretDown style={{ marginLeft: '15px' }} /></Button></TableCell>
                                <TableCell sx={tableStyle} align="left">{data.Source}</TableCell>
                                <TableCell sx={tableStyle} align="left">{data.LinkType}</TableCell>
                                <TableCell sx={tableStyle} align="left">{data.Target}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                    {/* --------- Action button --------- */}
                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleCloseAction}
                        anchorOrigin={{
                            vertical: 'bottom', horizontal: 'left',
                        }}>
                        <Box sx={{ p: 1 }}>
                            <Button onClick={() => {
                                handleLinkModalOpen()
                                handleCloseAction()
                            }} variant='text' sx={{ color: 'gray' }}>Update</Button> <br />

                            <Button onClick={() => {
                                handleDeleteLink()
                                handleCloseAction()
                            }} variant='text' sx={{ color: 'gray' }}>Delete</Button> <br />

                            <Button variant='text' sx={{ color: 'gray' }}>Separated link</Button>
                        </Box>
                    </Popover>
                </Table>
            </TableContainer>

            {loadLinks?.loading && <Typography variant='h5' sx={{ textAlign: 'center', mt: 3 }} > <CircularProgress /> </Typography>}
            {!linkedData?.length && <Typography sx={{ textAlign: 'center', color: 'lightgray', fontWeight: 'bold', mt: '10vw' }} variant='h5'>No Links Available Please Create Links</Typography>}
        </>
    );
};

export default Links;