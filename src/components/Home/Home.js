import React, { useCallback, useState } from 'react';
import { Div, Container, Flex, Grid, GridItem, Table } from '../styles/Container.styles';
import { AiOutlineClose } from "react-icons/ai";
import { H3, H4, P } from '../styles/Headings.styles';
import { Select } from '../styles/Inputs.styles';
import CSVReader from 'react-csv-reader';



const Home = () => {
    const [csvData, setCsvData] = useState([])

    const handleLoadCsvFileData = useCallback((data) => {
        console.log(data);
        setCsvData(data)
    }, [setCsvData])

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

    const handleOpenCSV = () => {
        document.getElementById("ObiWan").click()
    }
    return (
        <>
            <Container>
                <Div p="0 1% 50px" position="relative" border="1px solid lightgray" m="50px 0">

                    <H4 w="30px" h="30px" style={{ position: 'absolute', top: 15, right: 5, cursor: "pointer" }} ><AiOutlineClose /></H4>

                    <Div w="95%">
                        <H3 borderB="1px solid lightgray" p="10px 5px">New Link </H3>

                        <P color='gray' m="20px 0 0 0">Select Project</P>
                        <Flex items="center" >

                            {/* <P w="100%" rounded="6px 0 0 6px" p="10px 0" color='gray' border="1px solid lightgray">Project abg</P> */}
                            <Select w="100%" rounded="6px 0 0 6px" p="10px 0" color='gray' border="1px solid lightgray">
                                <option value="">Project abc</option>
                            </Select>
                            <P p="8px 10px" rounded="0 6px 6px 0" border="2px solid lightgray" style={{ flex: 'none', cursor: 'pointer' }}>Load</P>
                            {/* ----------------------------------------------- */}

                            <CSVReader
                                cssClass="csv-reader-input"
                                onFileLoaded={handleLoadCsvFileData}
                                onError={handleError}
                                parserOptions={papaparseOptions}
                                inputId="ObiWan"
                                inputName="ObiWan"
                                inputStyle={{ display: 'none' }}
                            />

                        </Flex>
                        <button onClick={handleOpenCSV}>Open CSV</button>


                        <P color='gray' m="20px 0 0 0">Source</P>
                        <Div border="1px solid #a7c942">
                            <Flex bg='#a7c942'>
                                <P w="100px" p="5px 0 5px 10px">ID</P>
                                <P p="5px 0">Resource</P>
                            </Flex>
                            {
                                csvData?.slice(0, 4)?.map((data, i) => <Flex
                                    key={i} p='5px 10px' position='relative'
                                    style={{ borderBottom: '1px solid gray' }}
                                >
                                    <P borderR='1px solid gray' h='32px' style={{ position: 'absolute', top: 0, left: 105 }} />
                                    <P style={{ width: "100px", textAlign: 'start' }}>{data.title && i + 1}</P>
                                    <P>{data.title}</P>
                                </Flex>)
                            }
                        </Div>
                    </Div>
                </Div>
            </Container>
        </>
    );
};

export default Home;