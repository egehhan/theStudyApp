const labels = []
var data = []

const ctx = document.getElementById('dataChart');

var chartOptions = {
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'week'
            }
        },
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        zoom: {
            pan: {
                enabled: true,
                mode: 'x'
            },
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                mode: 'x',
            }
        }
    }
};

var chartData = {
    labels: labels,
    datasets: [{
        backgroundColor: 'rgb(75, 192, 192)',
        label: 'hours spent studying',
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
    }]
}

var myChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOptions
});

function changeGraph() {
    if (myChart.config.type === "line") {
        myChart.config.type = 'bar';
    } else {
        myChart.config.type = 'line';
    }
    myChart.update();
    console.log("Updated chart");
}