import React from 'react';
import { Table } from "@mantine/core";

const CropStatisticsTable = (props) => {
  //Extract data from props
  const { data } = props;

  // Object to store aggregated data by crop name
  const cropStats = {};

  // Iterate through the data to aggregate by crop name
  data.forEach((item) => {
    const cropName = item["Crop Name"];
    const yieldOfCrops = parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]);
    const areaUnderCultivation = parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]);

    if (!cropStats[cropName]) {
      cropStats[cropName] = {
        totalYield: 0,
        totalArea: 0,
        numYears: 0,
      };
    }
    cropStats[cropName].numYears++;

    if (!isNaN(yieldOfCrops) && !isNaN(areaUnderCultivation)) {
      cropStats[cropName].totalYield += yieldOfCrops;
      cropStats[cropName].totalArea += areaUnderCultivation;
      
    }
  });

  // Array to store JSX for table rows
  const tableRows = [];

  // Calculate averages and generate table rows
  Object.keys(cropStats).forEach((cropName) => {
    const avgYield = cropStats[cropName].totalYield / cropStats[cropName].numYears;
    const avgArea = cropStats[cropName].totalArea / cropStats[cropName].numYears;

    tableRows.push(
      <Table.Tr key={cropName}>
        <Table.Td style={{ border: "1px solid #ccc", textAlign: "center", padding: "8px" }}>{cropName}</Table.Td>
        <Table.Td style={{ border: "1px solid #ccc", textAlign: "center", padding: "8px" }}>{avgYield.toFixed(3)}</Table.Td>
        <Table.Td style={{ border: "1px solid #ccc", textAlign: "center", padding: "8px" }}>{avgArea.toFixed(3)}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Crop Statistics: Average Yield and Cultivation Area (1950-2020)</h2>
      <Table striped
        style={{
          maxWidth: 800,
          margin: "auto",
          border: "1px solid #ccc", // Adding border to the table container
          borderCollapse: "collapse", // Ensure table borders collapse
        }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th  style={{ border: "1px solid #ccc", textAlign: "center", padding: "8px" }}>Crop Name</Table.Th>
            <Table.Th  style={{ border: "1px solid #ccc", textAlign: "center", padding: "8px" }}>Average Yield (Kg/Ha)</Table.Th>
            <Table.Th  style={{ border: "1px solid #ccc", textAlign: "center", padding: "8px" }}>Average Cultivation Area (Ha)</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tableRows}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default CropStatisticsTable;
