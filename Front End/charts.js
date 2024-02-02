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
        label: 'hours studied/day',
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

function addDataToChart() {
    var hours = document.getElementById('hours').value;
    var minutes = document.getElementById('minutes').value;
    var date = document.getElementById('date').value;

    let totalhours;
    totalhours = ((parseInt(hours) * 60) + parseInt(minutes)) / 60;

    console.log(date);
    myChart.data.labels.push(date);
    data.push({ x: date, y: totalhours });

    console.log("Updated chart");
    myChart.update();

    // Clear the input fields
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
}

function logtheshit() {
    console.log(data)
}