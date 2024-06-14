import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ip from "./config";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Graph() {
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Count',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    });
    const details = useSelector(state => state.objects.items[1]);

    useEffect(() => {
        const fetchData = async () => {
            if (details != null) {
                setLoading(true);
                try {
                    const response = await fetch(`${ip}/dns`);
                    const jsonData = await response.json();
                    prepareChartData(jsonData);
                } catch (error) {
                    console.error("Error in Fetching data: ", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [details]);

    const prepareChartData = (jsonData) => {
        const typeCount = {};
        jsonData.forEach(item => {
            typeCount[item.Type] = (typeCount[item.Type] || 0) + 1;
        });
        setChartData({
            labels: Object.keys(typeCount),
            datasets: [{
                label: 'Count',
                data: Object.values(typeCount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        });
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="chart">
            <Bar
                data={chartData}
                options={{
                    plugins: {
                        legend: {
                            display: true,
                        },
                        title: {
                            display: true,
                            text: 'Record Types Count'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }}
            />
        </div>
    );
}

export default Graph;
