import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { handleRequirementsData, handleTestCaseData } from '../../redux/slices/linkEditorSlice';
import { Box, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button, TableBody } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '0',
    boxShadow: 5,
    pt: 2,
    px: 2,
    pb: 3,
};

const tableStyle = { borderLeft: '1px solid #cbfe2c', fontSize: '16px', py: 0.7 }

const CreateLinkModal = ({ linkModalOpen, setLinkModalOpen }) => {
    const { requirementsData, testCaseData } = useSelector((state => state.linkEditor))
    const dispatch = useDispatch();
    const handleImportModalClose = () => setLinkModalOpen(false);

    return (
        <div>
            <Modal
                open={linkModalOpen}
                onClose={handleImportModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={modalStyle}>
                    <Typography variant="h6" sx={{ my: 1 }}>New Link</Typography>

                    {/* --- Modal Body --- */}

                    {/* ---- Requirement Data Table ---- */}
                    <Typography variant="subtitle1" sx={{ color: 'gray', mt: 1 }}>Source</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: '90vw', mx: 'auto' }} aria-label="simple table">
                            <TableHead >
                                <TableRow sx={{ bgcolor: '#a7c942', }}>
                                    <TableCell sx={{ ...tableStyle, color: 'white' }} align='left'>ID</TableCell>
                                    <TableCell sx={{ ...tableStyle, color: 'white' }} align="left">Resource</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {requirementsData?.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell sx={tableStyle} align="left">{row?.id}</TableCell>
                                        <TableCell sx={tableStyle} align="left">{row?.resource}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* ---- TestCase Data Table ---- */}
                    <Typography variant="subtitle1" sx={{ color: 'gray', mt: 1 }}>Target</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                            <TableHead >
                                <TableRow sx={{ bgcolor: '#a7c942', }}>
                                    <TableCell sx={{ ...tableStyle, color: 'white' }} align='left'>ID</TableCell>
                                    <TableCell sx={{ ...tableStyle, color: 'white' }} align="left">Resource</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {testCaseData?.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell sx={tableStyle} align="left">{row?.id}</TableCell>
                                        <TableCell sx={tableStyle} align="left">{row?.resource}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>
            </Modal>
        </div>
    );
};

export default CreateLinkModal;