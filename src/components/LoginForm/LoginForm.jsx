import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    // <div>
    //   <div className="form-container">
    //     <form autoComplete="off" onSubmit={handleSubmit}>
    //       <label>Email</label>
    //       <input type="text" name="email" value={credentials.email} placeholder='Email' onChange={handleChange} required />
    //       <label>Password</label>
    //       <input type="password" name="password" value={credentials.password} placeholder='Password' onChange={handleChange} required />
    //       <button type="submit">LOG IN</button>
    //     </form>
    //   </div>
    //   <p className="error-message">&nbsp;{error}</p>
    // </div>
    <div className='form-container col-8 offset-2'>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <FormGroup floating>
          <Input id="exampleEmail" type="text" name="email" value={credentials.email} placeholder='Email' onChange={handleChange} required />
          <Label for="exampleEmail">Email</Label>
        </FormGroup>
        {" "}
        <FormGroup floating>
          <Input type="password" name="password" value={credentials.password} placeholder='Password' onChange={handleChange} required />
          <Label>Password</Label>
        </FormGroup>
        {" "}
        <Button type="submit">Log in</Button>
      </Form>
    </div>
  );
}
