function getRandomString(length) {
	var text = '';
	var pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += pool.charAt(Math.floor(Math.random() * pool.length));
	}
	return text;
}
