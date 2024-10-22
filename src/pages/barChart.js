import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    console.log("data changed");
    console.log(data);
    if (chartRef.current && data) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      createChart();
    }
  }, [data]);

  const generateRandomColor = () => {
    // Generate a random dark and colorful RGB color
    const r = Math.floor(Math.random() * 96) + 160;
    const g = Math.floor(Math.random() * 96) + 160;
    const b = Math.floor(Math.random() * 96) + 160;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const createChart = () => {
    console.log("hello : ");
    console.log(data);
    const labels = data.map(item => item.x);
    const values = data.map(item => item.y);
    const backgroundColors = new Array(data.length).fill(null).map(() => generateRandomColor());

    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Current Device Readings',
          data: values,
          backgroundColor: backgroundColors,
        }],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true // To start the y-axis at 0
          }
        }
      }
    });
  };

  return <canvas ref={chartRef} />;
};

export default BarChart;
