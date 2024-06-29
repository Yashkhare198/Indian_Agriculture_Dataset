// Assuming your data.json file is located at src/data.json

import React from 'react';
import jsonData from './India_Agro_Dataset.json' // Adjust the path as per your file location
import MaxMinProductionTable from './components/MaxMinProductionTable';
import CropStatisticsTable from './components/CropStatisticsTable';

const DataSet = () => {
  // Use 'jsonData' directly
  const  data = jsonData;
  return (
    <div>
     <MaxMinProductionTable data={data}/>
     <CropStatisticsTable data={data}/>
    </div>
  );
};

export default DataSet;
