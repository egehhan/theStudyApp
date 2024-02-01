const ctx = document.getElementById('dataChart');
/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */

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