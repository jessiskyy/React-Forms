import { useState } from 'react';



export default function SignUpForm({ token, setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [signedUpUsername, setSignedUpUsername] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup",
            {
                method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username,
						password
					})
				}
			);
                
            const result = await response.json();
            console.log('Result: ', result);
            setToken(result.token);
            setSignedUpUsername(result.username);
            
        } catch (error) {
          setError(error.message);
        }
    }

    return (
        <div>
			{error && <p>{error}</p>}

			<form onSubmit={handleSubmit}>
				<h2>Display the Token</h2>
				<p>
					Sign up successfull! Token received below!
				</p>
				{token && (
					<label>
						Token:{' '}
						<textarea
							onChange={(e) => setToken(e.target.value)}
							rows={5}
							cols={50}
							value={token}
						/>
					</label>
				)}
				<br />

				{!token && (
					<>
						<h2>Sign Up</h2>
						<p>
							<label>
								Username:{' '}
								<input
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
								/>
							</label>
						</p>

						<p>
							<label>
								Password:{' '}
								<input
									type='password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</label>
						</p>
						<button>Sign Up</button>

                        <label>

                        {signedUpUsername && (
                        <p className="signed-up-username">Signed Up Username: {signedUpUsername}</p>
                    )}
                    </label>
					</>
				)}
			</form>
		</div>
	);
}