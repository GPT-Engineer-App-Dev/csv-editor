import React, { useState } from 'react';
import { Button, Container, Table, Thead, Tbody, Tr, Th, Td, Input } from '@chakra-ui/react';
import Papa from 'papaparse';

const CSVUploadEditTool = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        setHeaders(result.data[0]);
        setData(result.data.slice(1));
      }
    });
  };

  const handleAddRow = () => {
    setData([...data, Array(headers.length).fill('')]);
  };

  const handleRemoveRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = data.map((row, i) => {
      if (i === rowIndex) {
        const newRow = [...row];
        newRow[colIndex] = value;
        return newRow;
      }
      return row;
    });
    setData(newData);
  };

  const handleDownload = () => {
    const csv = Papa.unparse([headers, ...data]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'edited_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container centerContent>
      <Input type="file" accept=".csv" onChange={handleFileUpload} mb={4} />
      <Button onClick={handleAddRow} mb={4}>Add Row</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <Td key={colIndex}>
                  <Input value={cell} onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)} />
                </Td>
              ))}
              <Td>
                <Button colorScheme="red" onClick={() => handleRemoveRow(rowIndex)}>Remove</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button onClick={handleDownload} mt={4}>Download CSV</Button>
    </Container>
  );
};

export default CSVUploadEditTool;