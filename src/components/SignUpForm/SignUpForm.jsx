import { Component } from 'react'
import { signUp } from '../../utilities/users-service'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default class SignUpForm extends Component {
    state = {
        name: '',        
        email: '',        
        password: '',        
        confirm: '',        
        error: ''        
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
            error: ''
        })
    }

    handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            // We don't want to send the 'error' or 'confirm' property,
            //  so let's make a copy of the state object, then delete them
            const {name, email, password} = this.state;
            const formData = {name, email, password}
            const user = await signUp(formData)
            // baby step!
            this.props.setUser(user)
        } catch (error) {
            console.log(error)
            this.setState({ error: 'Sign Up Failed - Try Again' })
        }
    }

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
            // <div>
            //     <div className="form-container">
            //         <form autoComplete="off" onSubmit={this.handleSubmit}>
            //             <label>Name</label>
            //             <input type="text" name="name" value={this.state.name} placeholder='Name' onChange={this.handleChange} required />
            //             <label>Email</label>
            //             <input type="email" name="email" value={this.state.email} placeholder='Email' onChange={this.handleChange} required />
            //             <label>Password</label>
            //             <input type="password" name="password" value={this.state.password} placeholder='Password' onChange={this.handleChange} required />
            //             <label>Confirm</label>
            //             <input type="password" name="confirm" value={this.state.confirm} placeholder='Confirm Password' onChange={this.handleChange} required />
            //             <button type="submit" disabled={disable}>SIGN UP</button>
            //         </form>
            //     </div>
            //     <p className="error-message">&nbsp;{this.state.error}</p>
            // </div>
            <div>
                <div className="form-container col-8 offset-2">
                    <Form autoComplete="off" onSubmit={this.handleSubmit}>
                        <FormGroup floating>
                            <Input type="text" name="name" value={this.state.name} placeholder='Name' onChange={this.handleChange} required />
                            <Label>Name</Label>
                        </FormGroup>
                        {" "}
                        <FormGroup floating>
                            <Input type="email" name="email" value={this.state.email} placeholder='Email' onChange={this.handleChange} required />
                            <Label>Email</Label>
                        </FormGroup>
                        {" "}
                        <FormGroup floating>
                            <Input type="password" name="password" value={this.state.password} placeholder='Password' onChange={this.handleChange} required />
                            <Label>Password</Label>
                        </FormGroup>
                        {" "}
                        <FormGroup floating>
                            <Input type="password" name="confirm" value={this.state.confirm} placeholder='Confirm Password' onChange={this.handleChange} required />
                            <Label>Confirm</Label>
                        </FormGroup>
                        {" "}
                        <Button type="submit" disabled={disable}>Sign Up</Button>
                    </Form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        );
    }
      
}