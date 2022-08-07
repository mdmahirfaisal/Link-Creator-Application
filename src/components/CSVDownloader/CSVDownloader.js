import React from 'react';
import CsvDownloader from 'react-csv-downloader';


const CSVDownloader = ({ columns, datas, fileName, styles }) => {
    return (
        <CsvDownloader style={styles}
            filename={fileName}
            extension=".csv"
            separator=";"
            wrapColumnChar="'"
            columns={columns}
            datas={datas}
            id="csvDownLoadBtn"
            text="DownLoad Links" />
    );
};

export default CSVDownloader;