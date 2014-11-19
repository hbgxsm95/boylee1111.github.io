$(function() {
	var username = "boylee1111",
		mailServer = "gmail.com",
		sendEmail = function(event) {
			event.preventDefault();
			window.open("mailto:" + username + "@" + mailServer);
		};

	$(".mailTo").click(sendEmail);
})