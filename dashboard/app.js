document.addEventListener("DOMContentLoaded", async () => {
    const ctx = document.getElementById("metricsChart").getContext("2d");
    const loadingMessage = document.getElementById("loading");

    try {
        // Fetch metrics from the Cloudflare Workers API
        const response = await fetch("https://your-cloudflare-worker-url/api/metrics");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const metrics = await response.json();

        // Prepare data for Chart.js
        const labels = metrics.map(item => item.model_id);
        const dataCounts = metrics.map(item => item.count);

        // Create a bar chart
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Model Usage",
                    data: dataCounts,
                    backgroundColor: "#36A2EB",
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Model Usage Metrics"
                    }
                }
            }
        });

        // Remove loading message
        loadingMessage.style.display = "none";
    } catch (error) {
        console.error("Error loading metrics:", error);
        loadingMessage.textContent = "Failed to load data.";
    }
});
