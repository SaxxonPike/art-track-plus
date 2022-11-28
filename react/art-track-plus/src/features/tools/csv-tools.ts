import Artist from "../../models/artist";

function exportArtists(artists: Artist[], excelMode: boolean) {
    let csv = '';

    // build CSV columns
    const csvColumns = [
        'name',
        'badgeNumber',
        'tableNumber',
        'roomNumber',
        'phone',
        'remarks',
        'seatedLast',
        'seatedDays',
        'standbyDays',
        'lotteryDays'
    ];

    csv += csvColumns.join(',') + '\r\n';

    // build CSV rows
    artists.forEach(function (artist) {
        const csvRow = [];
        csvColumns.forEach(function (column) {
            let columnValue = artist[column];
            if (columnValue === false) {
                columnValue = 'N';
            } else if (columnValue === true) {
                columnValue = 'Y';
            } else if (columnValue !== 0 && !columnValue) {
                columnValue = null;
            } else if (Array.isArray(columnValue)) {
                columnValue = columnValue.join('|');
            } else {
                columnValue = '' + columnValue;
            }
            if (columnValue !== null) {
                columnValue = '"' + columnValue.replace(/"/g, '""') + '"';
            } else {
                columnValue = '';
            }
            if (excelMode && columnValue.length > 0 && columnValue.indexOf(',') < 0) {
                columnValue = '=' + columnValue;
            }
            csvRow.push(columnValue);
        });
        csv += csvRow.join(',') + '\r\n';
    });

    // send file to user
    return csv;
}

const CsvTools = {
    exportArtists: exportArtists
};

export default CsvTools;