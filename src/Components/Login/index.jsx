import React, { useState, useEffect } from 'react';
import { Button, Input, InputContainer, LoginContainer, GlobalStyles } from './styledComponents';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Person2Icon from '@mui/icons-material/Person2';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Buttonspan } from './styledComponents';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate(); 

  const [icon, setIcon] = useState({ password: false, confirmPassword: false });
  const [authentication, setAuthentication] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
  });
  const [Login, setLogin] = useState(true);
  const [err, setError] = useState('');
  const [signup, setSignup] = useState(false);
  const [users1, setUsers] = useState([]);

  const togglePassword = (field) => {
    setIcon((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const Url1 = 'http://localhost:3000/users';
    try {
      const response = await fetch(Url1);
      const data = await response.json();
      console.log(data)
      setUsers(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const userDetails = {
      email: authentication.email,
      password: authentication.password,
    };

    const existingUser = users1.find((user) => user.email === authentication.email);

    if (existingUser) {
      setError('User already exists');
      return;
    }

    if (authentication.password === authentication.confirmPassword) {
      const Url2 = 'http://localhost:3000/users';
      try {
        const response = await fetch(Url2, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        });

        if (response.ok) {
          const data = await response.json();
          setUsers([...users1, data]);
          setSignup(true);
          setLogin((prev)=>!prev)
          setAuthentication({password: '',
            email: '',})

        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    } else {
      setError('Passwords do not match');
    }
  };

  const onSubmitSuccess = (accessToken) => {
    Cookies.set('accessToken', accessToken, { expires: 30 });
    navigate('/Home'); // Navigate to the homepage
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginDetails = {
      email: authentication.email,
      password: authentication.password,
    };

    const Url = 'http://localhost:3000/login';
    try {
      const response = await fetch(Url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDetails),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login Successful:', data);
        onSubmitSuccess(data.accessToken); // Pass the accessToken to onSubmitSuccess
      } else {
        setError(data.message || 'Login Failed');
      }
    } catch (error) {
      setError('Error during login');
      console.error(error);
    }
  };

  return (
    <>
      <GlobalStyles />
      {Login ? (
        <LoginContainer onSubmit={handleSubmit} height="400px">
          <AccountCircle sx={{ fontSize: '120px', color: 'dodgerblue' }} />
          <InputContainer>
            <Person2Icon
              sx={{
                fontSize: '30px',
                color: 'dodgerblue',
                position: 'absolute',
                left: '10px',
                top: '24px',
              }}
            />
            <Input
              required
              autoComplete="true"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={authentication.email}
              onChange={(e) =>
                setAuthentication({
                  ...authentication,
                  email: e.target.value,
                })
              }
            />
          </InputContainer>

          <InputContainer>
            <Input
              required
              type={icon.password ? 'text' : 'password'}
              name="password"
              id="password"
              value={authentication.password}
              placeholder="Password"
              onChange={(e) =>
                setAuthentication({
                  ...authentication,
                  password: e.target.value,
                })
              }
            />
            <LockIcon
              sx={{
                fontSize: '30px',
                color: 'dodgerblue',
                position: 'absolute',
                left: '10px',
                top: '24px',
              }}
            />
            <span role="button" onClick={() => togglePassword('password')}>
              {icon.password ? (
                <VisibilityIcon
                  sx={{
                    fontSize: '30px',
                    color: 'dodgerblue',
                    position: 'absolute',
                    right: '18px',
                    top: '28px',
                  }}
                />
              ) : (
                <VisibilityOffIcon
                  sx={{
                    fontSize: '30px',
                    color: 'dodgerblue',
                    position: 'absolute',
                    right: '18px',
                    top: '28px',
                  }}
                />
              )}
            </span>
          </InputContainer>
          <Button type="submit">Login</Button>
          <Buttonspan role="button" onClick={() => setLogin((prev) => !prev)}>
            Don&apos;t have an account? Signup
          </Buttonspan>
          {err && <p style={{ color: 'red' }}>{err}</p>}
        </LoginContainer>
      ) : (
        <LoginContainer onSubmit={submit} height="520px">
          <AccountCircle sx={{ fontSize: '120px', color: 'dodgerblue' }} />
          <InputContainer>
            <Person2Icon
              sx={{
                fontSize: "30px",
                color: "dodgerblue",
                position: "absolute",
                left: "10px",
                top: "24px",
              }}
            />
            <Input
              required
              autoComplete="true"
              type="text"
              name="username"
              id="username1"
              placeholder="Username"
              value={authentication.username}
              onChange={(e) =>
                setAuthentication({
                  ...authentication,
                  username: e.target.value,
                })
              }
            />
          </InputContainer>
          <InputContainer>
            <Person2Icon
              sx={{
                fontSize: '30px',
                color: 'dodgerblue',
                position: 'absolute',
                left: '10px',
                top: '24px',
              }}
            />
            <Input
              required
              type="text"
              name="email"
              id="email1"
              placeholder="Email"
              value={authentication.email}
              onChange={(e) =>
                setAuthentication({
                  ...authentication,
                  email: e.target.value,
                })
              }
            />
          </InputContainer>
          <InputContainer>
            <Input
              required
              type={icon.password ? 'text' : 'password'}
              name="password"
              id="password1"
              value={authentication.password}
              placeholder="Password"
              onChange={(e) =>
                setAuthentication({
                  ...authentication,
                  password: e.target.value,
                })
              }
            />
            <LockIcon
              sx={{
                fontSize: '30px',
                color: 'dodgerblue',
                position: 'absolute',
                left: '10px',
                top: '24px',
              }}
            />
            
            <span role="button" onClick={() => togglePassword('password')}>
              {icon.password ? (
                <VisibilityIcon
                  sx={{
                    fontSize: '30px',
                    color: 'dodgerblue',
                    position: 'absolute',
                    right: '18px',
                    top: '28px',
                  }}
                />
              ) : (
                <VisibilityOffIcon
                  sx={{
                    fontSize: '30px',
                    color: 'dodgerblue',
                    position: 'absolute',
                    right: '18px',
                    top: '28px',
                  }}
                />
              )}
            </span>
          </InputContainer>

          <InputContainer>
            <Input
              required
              type={icon.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={authentication.confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) =>
                setAuthentication({
                  ...authentication,
                  confirmPassword: e.target.value,
                })
              }
            />
            <LockIcon
              sx={{
                fontSize: "30px",
                color: "dodgerblue",
                position: "absolute",
                left: "10px",
                top: "24px",
              }}
            />
            <span
              role="button"
              onClick={() => togglePassword("confirmPassword")}
            >
              {icon.confirmPassword ? (
                <VisibilityIcon
                  sx={{
                    fontSize: "30px",
                    color: "dodgerblue",
                    position: "absolute",
                    right: "18px",
                    top: "28px",
                  }}
                />
              ) : (
                <VisibilityOffIcon
                  sx={{
                    fontSize: "30px",
                    color: "dodgerblue",
                    position: "absolute",
                    right: "18px",
                    top: "28px",
                  }}
                />
              )}
            </span>
          </InputContainer>



          <Button type="submit">Signup</Button>
          {signup ? (
            <p style={{ color: 'darkgreen' }}>Signup Successful</p>
          ) : (
            err && <p style={{ color: 'red' }}>{err}</p>
          )}
        </LoginContainer>
      )}
    </>
  );
}

export default Login;
