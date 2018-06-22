// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// -- Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [{
      label: "Revenue",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [4215, 5312, 6251, 7841, 9821, 14984],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
    },
    legend: {
      display: false
    }
  }
});

Pusher.logToConsole = true;

// Configure Pusher instance
var pusher = new Pusher('3a2a219040583d8ee1b4', {
  cluster: 'mt1',
  encrypted: true
});

// Subscribe to poll trigger
var orderChannel = pusher.subscribe('order');

// Listen to 'order placed' event
var order = document.getElementById('order-count')
orderChannel.bind('place', function(data) {
  myLineChart.data.datasets.forEach((dataset) => {
      dataset.data.fill(parseInt(data.units),-1);
  });
  myLineChart.update();
  order.innerText = parseInt(order.innerText)+1
});