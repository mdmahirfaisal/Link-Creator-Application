import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';

const tableStyle = { borderLeft: '1px solid #cbfe2c', fontSize: '14px', py: 0.8 }

const NewLinkTable = ({ headData, bodyData, selectedTestCaseData }) => {
    const [isSelected, setIsSelected] = useState(null)


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: '80vw', mx: 'auto' }} aria-label="simple table">
                <TableHead >
                    <TableRow sx={{ bgcolor: '#a7c942', }}>
                        {headData.map((hd, i) => <TableCell
                            key={i}
                            sx={{ ...tableStyle, color: '#fff' }} align='left'>{hd}</TableCell>
                        )}
                    </TableRow>
                </TableHead>

                <TableBody style={{ maxHeight: "100px" }}>
                    {bodyData?.map((data, index) => (
                        <TableRow sx={isSelected === index ? { bgcolor: '#bada5b', cursor: 'pointer', "&:hover": { bgcolor: '#e2f3b0' } } : { "&:hover": { bgcolor: '#e2f3b0', cursor: 'pointer' } }} onClick={() => {
                            selectedTestCaseData(data)
                            setIsSelected(index)
                        }} key={index}>
                            <TableCell sx={tableStyle} align="left">{index + 1}</TableCell>
                            <TableCell sx={tableStyle} align="left">{data?.title}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default NewLinkTable;