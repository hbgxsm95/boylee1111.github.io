$(function() {
	var username = "boylee1111",
		mailServer = "163.com",
		sendEmail = function(event) {
			event.preventDefault();
			window.open("mailto:" + username + "@" + mailServer);
		};

	$(".mailTo").click(sendEmail);
})