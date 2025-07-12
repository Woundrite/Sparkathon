import React from 'react';
const SignupButton = () => {
	const RequestSignIn = () => {
		console.log("Sign in Requested");
	};
	return (
		<button onClick={RequestSignIn} className="px-2 py-1 text-blue-500 text-xl rounded-xl border-blue-500 border-2 active:bg-blue-400 active:text-white active:border-blue hover:bg-blue-300 hover:text-white cursor-pointer hover:border-blue-400">
			Sign In
		</button>
	);
}

export default SignupButton;