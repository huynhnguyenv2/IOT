$(document).ready(() => {
	$.ajax({
		url: "/getStatus",
		type: "POST",
		success: (res) => {
			updateUI(res.status)
			setTimeout(() => {
				hideLoading()
			}, 3000)
			
		},
		error: (err) => {
			console.log(err)
		}
	})
	setInterval(() => {
		$.ajax({
			url: "/getStatus",
			type: "POST",
			success: (res) => {
				updateUI(res.status)
			},
			error: (err) => {
				console.log(err)
			}
		})
	}, 2000)
	$(document).on('click', '.s-button', () => {
		$.ajax({
			url: "/toggleStatus",
			type: "POST",
			success: (res) => {
				updateUI(res.status)
			},
			error: (err) => {
				console.log(err)
			}
		})
	})
})
const hideLoading = () => {
	$('.loading').hide()
}
const updateUI = (status) => {
	if (status) {
		$('.wrapper').removeClass('off').addClass('on')
		$('.switch').html('<button class="s-button off-button">OFF</button>')
	} else {
		$('.wrapper').removeClass('on').addClass('off')
		$('.switch').html('<button class="s-button on-button">ON</button>')
	}
}