import React, {Fragment} from 'react';
import {Link }from "react-router-dom";
// import axios from "axios";


const Login = () => {

    const [formData,setformData] = React.useState({
        email:'',
        password:'',
    });

    const {email,password} = formData;

    const onChange = e => setformData({...formData, [e.target.name]:e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
            console.log('success');

            //Important Code for User register
            // const newUser = {
            //     name,
            //     email,
            //     password
            // };
            //
            // try{
            //   const config ={
            //       headers:{
            //           'Content-Type':'application/json'
            //       }
            //   };
            //
            //   const body = JSON.stringify(newUser);
            //   const res = await axios.post('/api/users',body,config);
            //   console.log(res.data)
            // }catch (err) {
            //     console.error(err.response.data);
            // }
        };

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign In Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        minLength="6"
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="LogIn"/>
            </form>
            <p className="my-1">
                you dont have an account? <Link to="/register">Sign up</Link>
            </p>
        </Fragment>
    );
};

export default Login