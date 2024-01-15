import React, { useState , useEffect} from 'react';

function Login() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = async (email, password) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: formData
      });

      console.log('Login Response:', response);

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Login failed:", errorMessage);
        return;
      }

      const body = await response.json();
      setToken(body.access_token);
      return body.access_token;
      // determineUserRole(body.access_token);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };


  async function fetchTasks(token) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    const response = await fetch("http://localhost:4000/login", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    
   /* const body = await response.json();
    setTasks(body);
  }
*/
  // Use effect to only do this once when the component renders
  useEffect(() => {
    // First do login
    handleLogin()
    .then((token) => fetchTasks(token))
    .catch((e) => console.error("Something went wrong", e));
  }, []);


 /* const determineUserRole = (token) => {
    const decodedToken = parseJwt(token);
    if (decodedToken && decodedToken.role) {
      setCurrentUser(decodedToken.role);
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };*/

  const handleLogout = () => {

    setToken(null);
    setCurrentUser(null);
  };


  const renderUserUI = () => {
    if (currentUser === 'doctor') {
      return <h1>Welcome, Doctor!</h1>;
    } else if (currentUser === 'pet_owner') {
      
      return <h1>Welcome, Pet Owner!</h1>;
    } else {
      return (
        <div>
          <h1>Login</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.elements.email.value;
              const password = e.target.elements.password.value;
              handleLogin(email, password);
            }}
          >
            <label>Email:</label>
            <input type="text" name="email" required />
            <br />
            <label>Password:</label>
            <input type="password" name="password" required />
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      );
    }
  };

  return (
    <div>
      {renderUserUI()}
      {token && (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
}

export default Login;
 

 /* 
 const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submit = async e => {
        e.preventDefault();

        const {data} = await axios.post('login', {
            email, password
        }, {withCredentials: true});

        axios.defaults.headers.common['Authorization'] = `Bearer ${data['token']}`;

        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/"/>;
    }

    return <main className="form-signin w-100 m-auto">
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                       onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                       onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    </main>



const Login = ({ onLogin }) => {
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
};*/

//hello0