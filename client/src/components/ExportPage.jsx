import React from 'react';
import { Button } from 'react-bootstrap';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const data = [
    {
        organization_number: '123',
        organization_name: 'Organization 1',
        training_program: 'Program 1',
        // Другие поля...
    },
    {
        organization_number: '456',
        organization_name: 'Organization 2',
        training_program: 'Program 2',
        // Другие поля...
    },
    // Другие объекты...
];


const exportToXLSX = (data) => {
    const headers = Object.keys(data[0]);
    const sheetData = [];

    data.forEach((item) => {
        const row = headers.map((header) => item[header]);
        sheetData.push(row);
    });

    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // Calculate column widths based on content length
    const colWidths = sheetData.reduce((acc, row) => {
        row.forEach((cell, colIndex) => {
            const cellLength = String(cell).length;
            acc[colIndex] = Math.max(acc[colIndex] || 0, cellLength);
        });
        return acc;
    }, []);

    // Apply column widths to the worksheet
    ws['!cols'] = colWidths.map((width) => ({ wch: width }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    // Use XLSX.write to create an array buffer
    const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Convert the array buffer to a Blob
    const blob = new Blob([arrayBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Use file-saver's saveAs method to save the Blob
    saveAs(blob, 'exported_data.xlsx');
};


export const ExportPage = ({ data }) => {
    return (
        <button
            className="bg-[#8b6afd] rounded-md px-3 py-0.5 mt-5 duration-200 hover:bg-opacity-80 ml-auto"
            onClick={(e) => exportToXLSX(data)}
        >
            Export XLSX
        </button>
    );
};
