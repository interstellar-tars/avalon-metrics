import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const App = () => {
    const [metrics, setMetrics] = useState([]);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            const response = await fetch("https://your-cloudflare-worker-url/api/metrics");
            const data = await response.json();
            setMetrics(data);

            // Prepare data for the chart
            const labels = data.map((item) => item.model_id);
            const eventCounts = data.map((item) => item.count);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: "Model Usage Events",
                        data: eventCounts,
                        backgroundColor: "#36A2EB",
                    },
                ],
            });
        } catch (error) {
            console.error("Error fetching metrics:", error);
        }
    };

    return (
        <div className="App">
            <h1>Roblox Model Metrics</h1>
            <div style={{ width: "600px", margin: "0 auto" }}>
                {chartData.labels ? (
                    <Bar data={chartData} />
                ) : (
                    <p>Loading chart...</p>
                )}
            </div>
        </div>
    );
};

export default App;
