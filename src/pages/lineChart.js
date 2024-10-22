// LineChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
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
    const labels = data.map(item => item.label); // Adjust based on your data structure
    const counts = data.map(item => item.value); // Adjust based on your data structure

    const backgroundColor = generateRandomColor();
    const borderColor = generateRandomColor();

    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Line Dataset',
          data: counts,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          fill: false,
          tension: 0.1, // Adjust tension for curve effect
        }],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Labels',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Values',
            },
            beginAtZero: true,
          },
        },
      },
    });
  };

  return <canvas ref={chartRef} />;
};

export default LineChart;
