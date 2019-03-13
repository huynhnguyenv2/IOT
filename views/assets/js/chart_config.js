var ctx = $("#myChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '°C',
            data: [],
            borderWidth: 1,
            fill: false,
            borderColor: "#4bc0c0",
            pointBorderWidth: 1,
          	pointHoverRadius: 1,
         	pointHoverBorderWidth: 1,
          	pointRadius: 1,
        },
        {
            label: '%',
            data: [],
            borderWidth: 1,
            fill: false,
            borderColor: "#4d0000"
        },
        {
            label: 'lux',
            data: [],
            borderWidth: 1,
            fill: false,
            borderColor: "#0000ff"
        }]
    },
    options: {
       	responsive: true,
       	title: {
	      display: true,
	      text: 'Bản đồ theo dõi nhiệt độ, độ ẩm, cường độ ánh sáng thời gian thực'
	    },
	    layout: {
            padding: {
                left: 50,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
$(document).ready(() => {
    var src=$(this).attr('href');
	$.ajax({
		url: src,
		type: "POST",
		success: (res) => {
			setTimeout(() => {
				hideLoading()
			}, 4000)
            
			updateChart(myChart, res.key, res.temperature, res.humidity, res.light)
		},
		error: (err) => {
			console.log(err)
		}
	})
	setInterval(() => {
		$.ajax({
		url: src,
		type: "POST",
		success: (res) => {
			hideLoading()
			updateChart(myChart, res.key, res.temperature, res.humidity, res.light)
		},
		error: (err) => {
			console.log(err)
		}
	})
	}, 5000)
})

const updateChart = (chart, key, a, b, c) => {
	chart.data.labels = key.slice(-30)
	chart.data.datasets[0].data = a.slice(-30)
	chart.data.datasets[1].data = b.slice(-30)
	chart.data.datasets[2].data = c.slice(-30)
	chart.update()
}
const hideLoading = () => {
	$('.loading').hide();
}