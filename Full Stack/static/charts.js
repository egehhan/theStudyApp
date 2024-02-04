const labels = []
const data = []

const ctx = document.getElementById('dataChart');

var chartOptions = {
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day'
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
        tension: 0.2
    }]
}

var myChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOptions
});

setTimeout(function() {
    console.log('Delayed execution!');
}, 3000);

function addDataToChart() {
    myChart.zoom({ x: 0.05 });
    var hours = document.getElementById('hours').value;
    var minutes = document.getElementById('minutes').value;
    var date = document.getElementById('date').value;

    let totalhours;
    totalhours = ((parseInt(hours) * 60) + parseInt(minutes)) / 60;

    data.push({ x: date, y: totalhours });

    console.log("Updated chart");
    myChart.update();

    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
}

function addDataToChartWithDelay() {
    setTimeout(addDataToChart, 2000);
}





function changeGraph() {
    if (myChart.config.type === "line") {
        myChart.config.type = 'bar';
    } else {
        myChart.config.type = 'line';
    }
    myChart.update();
    console.log("Updated chart");
}