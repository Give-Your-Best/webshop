import * as React from 'react';
import { theme } from '../../../theme';
import { Bar } from 'react-chartjs-2';
import { StyledBar, StyledMobileBar } from './ItemsChart.styles';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


export const ItemsChart = ({ stats }) => {

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Items',
        color: theme.colorMappings.primary,
        font: {
          size: 24
        }
      },
    },
    responsive: true
  };

  const mobileOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Items',
        color: theme.colorMappings.primary,
        font: {
          size: 24
        }
      },
    },
    responsive: false,
    maintainAspectRatio: false
  };

  const labels = ['Donated', 'Shopped'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Total',
        data: (stats)? stats.map((i) => i.total): [],
        backgroundColor: 'rgb(255, 218, 252)',
      },
      {
        label: 'Today',
        data: (stats)? stats.map((i) => i.today): [],
        backgroundColor: 'rgb(253, 216, 0)',
      },
      {
        label: 'Last Seven Days',
        data: (stats)? stats.map((i) => i.thisWeek): [],
        backgroundColor: 'rgb(255, 99, 143)',
      },
      {
        label: 'Last 30 days',
        data: (stats)? stats.map((i) => i.thisMonth): [],
        backgroundColor: 'rgb(29, 189, 241)',
      },
    ],
  };

  return <>
  <StyledMobileBar><Bar options={mobileOptions} data={data} width={300} height={350}/></StyledMobileBar>
  <StyledBar><Bar options={options} data={data} /></StyledBar>
  </>;
};
