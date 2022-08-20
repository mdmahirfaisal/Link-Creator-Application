import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import SelectField from '../SelectField/SelectField';
import { handleRequirementsData, handleTestCaseData } from '../../redux/slices/linkEditorSlice';
import NewLinkTable from '../NewLInkTable/NewLinkTable';
import { P } from '../styles/Headings.styles';
import { Flex } from '../styles/Container.styles';
import { Neo4jContext, useReadCypher } from 'use-neo4j';
import Swal from 'sweetalert2';

// UUID
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 || 0x8);
        return v.toString(16);
    });
}

// modal style
const modalStyle = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', border: '0', boxShadow: 5, minHeight: '50vh', maxHeight: '80vh', pt: 1, px: 2, pb: 5, borderRadius: 5, overflowY: 'scroll',
};

const CreateLinkModal = ({ linkModalOpen, setLinkModalOpen, actionData, setActionData, loadLinks }) => {
    const { driver } = useContext(Neo4jContext);
    const session = driver?.session();
    const { requirementsData, testCaseData } = useSelector((state => state.linkEditor))
    const [reqData, setReqData] = useState(null);
    const [targetData, setTargetData] = useState(null);
    const [linkType, setLinkType] = useState("")
    const [isValidData, setIsValidData] = useState(false);
    const dispatch = useDispatch();

    const linkModalClose = () => {
        setLinkModalOpen(false)
        setIsValidData(false)
        setReqData(null)
        setTargetData(null)
        setLinkType("")
        setActionData(null)
    };
    //// Load Tables data////
    const Requirements = useReadCypher(`MATCH (n:Requirements) RETURN n`);
    const TestCases = useReadCypher(`MATCH (n:TestCases) RETURN n`);

    useEffect(() => {
        if (Requirements.records?.length) {
            dispatch(handleRequirementsData(Requirements.records?.map(d => d._fields[0].properties)))
        }
        if (TestCases.records?.length) {
            dispatch(handleTestCaseData(TestCases.records?.map(d => d._fields[0].properties)))
        }
    }, [Requirements.records, TestCases.records, dispatch])

    // Selected data
    const selectRequirementData = (data) => {
        setReqData(data)
    };
    const selectTargetData = (data) => {
        setTargetData(data)
    };

    const handleLinkTypeChange = data => {
        setLinkType(data)
    };

    // Save change modal data
    useEffect(() => {
        if (reqData?.Identifier && linkType && targetData?.Identifier) {
            setIsValidData(true);
        }
    }, [reqData, targetData, linkType])

    // New link Create and Old link update
    const handleNewLinkLoaded = async () => {
        const UID = uuid();
        const data = { Identifier: `http://api.example.com/link/${Math.floor(Math.random() * 99999999)}`, Source: reqData.Identifier, LinkType: linkType, Target: targetData.Identifier };
        /// Link Update
        if (actionData?.Id) {
            await session?.run(`MATCH (n:Links) WHERE n.Id = $Id SET n+= $updates`, { Id: actionData.Id, updates: { ...data, Id: `${actionData.Id}` } })
                .then(res => {
                    if (res?.summary?.updateStatistics?._containsUpdates) {
                        loadLinks.run()
                        Swal.fire({
                            icon: 'success',
                            title: 'Link Update success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Link Update field!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    };
                })
                .catch(err => console.log(err))
        }
        // Link Create
        else {
            await session?.run(`MERGE (n:Links {Id: '${UID}', Identifier: '${data.Identifier}', Source: '${data.Source}', LinkType: '${data.LinkType}', Target: '${data.Target}'})`)
                .then(res => {
                    if (res?.summary?.updateStatistics?._stats?.nodesCreated > 0) {
                        loadLinks.run()
                        Swal.fire({
                            icon: 'success',
                            title: 'New link create success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Link create field!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    };
                })
                .catch(err => console.log(err))
        };
        linkModalClose()
    };
    return (
        <Box>
            <Modal
                open={linkModalOpen}
                onClose={linkModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>

                    {/* --- Modal Header --- */}
                    <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid lightgray', borderHeight: '90%', justifyContent: 'space-between', my: 1 }}>
                        <Typography variant="h6" sx={{}}>New Link</Typography>
                        <Typography onClick={linkModalClose} variant="h5" sx={{ cursor: 'pointer' }}><AiOutlineClose /></Typography>
                    </Box>

                    <Typography variant="subtitle2" sx={{ color: 'gray', mt: 2 }}>Select Project</Typography>
                    <Flex items="center" m="0 0 40px 0" >
                        <SelectField handleSelectChange={handleLinkTypeChange} options={["Project 1", "Project 2", "Project 3"]} label="Select Project" styles={{ width: "100%" }} />
                        <P p="14px 25px" size="18px" weight="500" rounded="0 6px 6px 0" border="2px solid lightgray" color='gray' style={{ flex: 'none', cursor: 'pointer' }}>Load</P>
                    </Flex>

                    {/* --- Modal Body --- */}
                    {/* ---- Requirement Data Source ---- */}
                    <Typography variant="subtitle2" sx={{ color: 'gray', mt: 1 }}>Source</Typography>
                    <NewLinkTable headData={["ID", "Resource"]} bodyData={requirementsData} selectedTestCaseData={selectRequirementData} />

                    {/* ---- Link type ---- */}
                    <SelectField handleSelectChange={handleLinkTypeChange} options={['affectedBy', 'validatedBy', 'satisfiedBy', 'validateRequirement']} label="Link Type" styles={{ mt: 3, mb: 5, width: "30%" }} />

                    {/* ---- TestCase Data Source ---- */}
                    <Typography variant="subtitle2" sx={{ color: 'gray', mt: 1, }}>Target</Typography>
                    <NewLinkTable headData={["ID", "Resource"]} bodyData={testCaseData ? testCaseData : []} selectedTestCaseData={selectTargetData} />

                    {/* --- Modal Footer --- */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', py: 5 }}>
                        <Button onClick={linkModalClose} sx={{ bgcolor: '#6c767d', color: 'white', "&:hover": { bgcolor: '#434d54' } }}>Close</Button>
                        <Button variant='contained' sx={{ ml: 2 }} onClick={handleNewLinkLoaded} disabled={isValidData ? false : true} >Save Changes</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default CreateLinkModal;