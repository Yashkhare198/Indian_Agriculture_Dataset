import React from "react";
import { Table } from "@mantine/core";

const MaxMinProductionTable = (props) => {
  // Extract data from props
  const data = props.data;

  // Function to extract numerical year 
  const getNumericalYear = (yearString) => {
    const parts = yearString.split(",");
    return parts[1].trim(); // Extract and return numerical year
  };

  // Function to calculate max and min crop production for each numerical year
  const calculateMaxMinProduction = () => {
    if (!data || data.length === 0) {
      return {}; // Return empty object if data is undefined or empty
    }

    // Object to store max and min values by year
    const maxMinByYear = {};

    // Iterate through data to find max and min for each year
    data.forEach((item) => {
      const yearString = item.Year;
      const numericalYear = getNumericalYear(yearString); // Extract numerical year

      const cropName = item["Crop Name"];
      const production = parseFloat(item["Crop Production (UOM:t(Tonnes))"]);

      if (!isNaN(production)) {
        if (!maxMinByYear[numericalYear]) {
          maxMinByYear[numericalYear] = {
            max: { production: production, cropName: cropName },
            min: { production: production, cropName: cropName },
          };
        } else {
          if (production > maxMinByYear[numericalYear].max.production) {
            maxMinByYear[numericalYear].max = {
              production: production,
              cropName: cropName,
            };
          }
          if (production < maxMinByYear[numericalYear].min.production) {
            maxMinByYear[numericalYear].min = {
              production: production,
              cropName: cropName,
            };
          }
        }
      }
    });

    return maxMinByYear;
  };

  // Get max and min production data for each numerical year
  const maxMinByYear = calculateMaxMinProduction();

  // Render table rows based on maxMinByYear object
  const tableRows = Object.keys(maxMinByYear).map((numericalYear) => (
    <Table.Tr key={numericalYear}>
      <Table.Td style={{ border: "1px solid #ccc", textAlign: "center", padding: "8px" }}>{numericalYear}</Table.Td>
      <Table.Td style={{ border: "1px solid #ccc", textAlign: "center", padding: "8px" }}>{maxMinByYear[numericalYear].max.cropName}</Table.Td>
      <Table.Td style={{ border: "1px solid #ccc", textAlign: "center", padding: "8px" }}>{maxMinByYear[numericalYear].min.cropName}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Maximum and Minimum Crop Production by Year</h2>
      <Table
        striped
        style={{
          maxWidth: 800,
          margin: "auto",
          border: "1px solid #ccc", // Adding border to the table container
          borderCollapse: "collapse", // Ensure table borders collapse
        }}
      >
        <Table.Tbody>
          <Table.Tr>
            <Table.Th style={{ border: "1px solid #ccc", textAlign: "center", padding: "8px" }}>Year</Table.Th>
            <Table.Th style={{ border: "1px solid #ccc", textAlign: "center", padding: "8px" }}>Crop with Maximum Production</Table.Th>
            <Table.Th style={{ border: "1px solid #ccc", textAlign: "center", padding: "8px" }}>Crop with Minimum Production</Table.Th>
          </Table.Tr>
          {tableRows}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default MaxMinProductionTable;
