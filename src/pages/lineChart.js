import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function LineChart({ timeSeriesData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const data = {
      labels: timeSeriesData.map(data => new Date(data.x).toLocaleString()), // Format timestamp if needed
      datasets: [{
        label: 'Device Readings',
        data: timeSeriesData.map(data => data.y), // Extract the y values
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        fill: false,
      }]
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false, // Disable aspect ratio to fill the canvas
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    const chart = new Chart(ctx, config);

    return () => {
      chart.destroy();
    };
  }, [timeSeriesData]);

  return (
    <div style={{ width: '400px', height: '350px' }}>
      <canvas ref={chartRef} style={{ display: 'block' }} />
    </div>
  );
}

export default LineChart;
