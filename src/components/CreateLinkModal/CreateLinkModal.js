import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import CSVReader from 'react-csv-reader';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import SelectField from '../SelectField/SelectField';
import { handleRequirementsData, handleTestCaseData, handleGetCsvData, handleLinkedData } from '../../redux/slices/linkEditorSlice';
import NewLinkTable from '../NewLInkTable/NewLinkTable';
import { P } from '../styles/Headings.styles';
import { Flex } from '../styles/Container.styles';
import { Select } from '../styles/Inputs.styles';

// modal style
const modalStyle = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', border: '0', boxShadow: 5, minHeight: '50vh', maxHeight: '80vh', pt: 1, px: 2, pb: 5, borderRadius: 5, overflowY: 'scroll',
};
//////// U Uid 
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
        return v.toString(16);
    });
}

const linkTypeOptions = ['affectedBy', 'validatedBy', 'satisfiedBy', 'validateRequirement'];

const CreateLinkModal = ({ linkModalOpen, setLinkModalOpen, actionData }) => {
    const { requirementsData, testCaseData } = useSelector((state => state.linkEditor))
    const [reqData, setReqData] = useState(null);
    const [targetData, setTargetData] = useState(null);
    const [linkType, setLinkType] = useState("")
    const [isValidData, setIsValidData] = useState(false);
    const dispatch = useDispatch();
    const linkModalClose = () => setLinkModalOpen(false);

    const loadRequirementData = (data, { name }) => {
        console.log(data);
        console.log(name);
        dispatch(handleGetCsvData(data))
        dispatch(handleRequirementsData(data))
    };
    const loadTestCaseData = (data, { name }) => {
        // console.log(data, name);
        dispatch(handleTestCaseData(data))
    };

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header =>
            header.toLowerCase().replace(/\W/g, '_')
    }
    const handleError = (err) => {
        console.log(err);
    }

    ///////// Selected data
    const selectRequirementData = (data) => {
        console.log(data);
        setReqData(data)
    }
    const selectTestCaseData = (data) => {
        console.log(data);
        setTargetData(data)
    }

    const handleLinkTypeChange = data => {
        setLinkType(data)
    }

    // Save change modal data
    useEffect(() => {
        if (reqData?.identifier && linkType && targetData?.identifier) {
            setIsValidData(true);
        }
    }, [reqData, targetData, linkType])

    const handleNewLinkLoaded = () => {
        const data = { id: uuid(), source: reqData.identifier, linkType, target: targetData.identifier }
        if (actionData) {
            dispatch(handleLinkedData({ data, actionData }))
        } else {
            dispatch(handleLinkedData(data))
        }
        linkModalClose()
        setIsValidData(false)
        setReqData(null)
        setTargetData(null)
        setLinkType("")
    }

    // const index = linkedData.indexOf(actionData.source);
    // console.log(index, linkedData.length)

    // Csv Opener
    const handleOpenCSV = (id) => document.getElementById(id).click();
    return (
        <Box>
            <Modal
                open={linkModalOpen}
                onClose={linkModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={modalStyle}>
                    {/* --- Modal Header --- */}
                    <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid lightgray', borderHeight: '90%', justifyContent: 'space-between', my: 1 }}>
                        <Typography variant="h6" sx={{}}>New Link</Typography>
                        <Typography onClick={linkModalClose} variant="h5" sx={{ cursor: 'pointer' }}><AiOutlineClose /></Typography>
                    </Box>

                    <Typography variant="subtitle2" sx={{ color: 'gray', mt: 2 }}>Select Project</Typography>
                    <Flex items="center" m="0 0 40px 0" >
                        {/* <P w="100%" rounded="6px 0 0 6px" p="10px 0" color='gray' border="1px solid lightgray">Project abg</P> */}
                        <Select w="100%" rounded="6px 0 0 6px" p="10px 0" color='gray' border="1px solid lightgray">
                            <option value="">Project abc</option>
                        </Select>
                        <P p="8px 10px" rounded="0 6px 6px 0" border="2px solid lightgray" style={{ flex: 'none', cursor: 'pointer' }}>Load</P>
                    </Flex>

                    {/* --- Modal Body --- */}

                    {/* ---- Requirement Data Source ---- */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: 'gray', mt: 1 }}>Source</Typography>
                        <CSVReader
                            onFileLoaded={loadRequirementData}
                            onError={handleError}
                            parserOptions={papaparseOptions}
                            inputId="reqCsv"
                            inputStyle={{ display: 'none' }} />
                        <Button variant='outlined' sx={{ color: 'gray', fontSize: '12px', mb: '-8px', py: '2px' }} onClick={() => handleOpenCSV("reqCsv")}>Load CSV Data</Button>
                    </Box>

                    <NewLinkTable headData={["ID", "Resource"]} bodyData={requirementsData} selectedTestCaseData={selectRequirementData} />

                    {/* ---- Link type ---- */}
                    <SelectField handleSelectChange={handleLinkTypeChange} options={linkTypeOptions} label="Link Type" styles={{ mt: 3, mb: 5, width: "30%" }} />

                    {/* ---- TestCase Data Source ---- */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: 'gray', mt: 1, }}>Target</Typography>
                        <CSVReader
                            onFileLoaded={loadTestCaseData}
                            onError={handleError}
                            parserOptions={papaparseOptions}
                            inputId="testCsv"
                            inputStyle={{ display: 'none' }} />
                        <Button variant='outlined' sx={{ color: 'gray', fontSize: '12px', mb: '-8px', py: '2px' }} onClick={() => handleOpenCSV("testCsv")}>Load CSV Data</Button>
                    </Box>

                    <NewLinkTable headData={["ID", "Resource"]} bodyData={testCaseData} selectedTestCaseData={selectTestCaseData} />

                    {/* --- Modal Footer --- */}

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', py: 5 }}>
                        <Button onClick={linkModalClose} sx={{ bgcolor: '#6c767d', color: 'white', "&:hover": { bgcolor: '#434d54' } }}>Close</Button>
                        <Button variant='contained' sx={{ ml: 2 }} onClick={isValidData ? handleNewLinkLoaded : null} disabled={isValidData ? false : true}>Save Changes</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default CreateLinkModal;