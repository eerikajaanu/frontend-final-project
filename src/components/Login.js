import React, { useState } from 'react';


export const Login = () => {
  return <main className="form-signin w-100 m-auto">
    <form>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      <div className="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
        <label for="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
        <label for="floatingPassword">Password</label>
      </div>
      <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    </form>
  </main>
  
}

 export default Login; 
/*const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });

      const accessToken = response.data.token;
      onLogin(accessToken); // Pass the token to the parent component
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
*/