import React, { lazy, useEffect } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router';
import Chart from 'react-apexcharts';



const Dashboard = () => {

  const history = useHistory();
  
  useEffect(() => {
    let flag = localStorage.getItem(`LoginProcess`)
    if(flag != "true"){
      history.push(`/Login`);
    }
}, );

const chartData = {
  options: {
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  },
  series: [
    {
      name: 'Series 1',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 200, 250]
    }
  ]
};


  return (
    <>
     
     <CCard>
      <CCardBody>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={400}
        />
      </CCardBody>
    </CCard>
    </>
  )
}

export default Dashboard;
