const ctx = document.getElementById('dataChart');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Hours studied/day',
            data: [0.746, 1.61, 2.52, 3.42, 3.5, 4.233, 4.233, 4.233, 4.233, 4.233, 4.233, 4.233],
            borderWidth: 10,
            borderColor: "#FFF500",
            backgroundColor: '#9BD0F5',
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});