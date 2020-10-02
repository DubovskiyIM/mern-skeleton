const signin = async user => {
	try {
		let response = await fetch('/auth/signin/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(user)
		});
		return await response.json();
	} catch (e) {
		console.error(e);
	}
};

const signout = async () => {
	try {
		let response = await fetch('/auth/signout/', { method: 'GET' });
		return await response.json();
	} catch (e) {
		console.error(e);
	}
};

export { signin, signout };
