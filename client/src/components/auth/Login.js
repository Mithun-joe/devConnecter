import React, {Fragment} from 'react';
import {Link , Redirect }from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {login} from "../../actions/auth";
// import axios from "axios";


const Login = ({login,isAuthenticated}) => {

    const [formData,setformData] = React.useState({
        email:'',
        password:'',
    });
    const [demoLoginData] = React.useState({
        emailDemo: 'demouser@gmail.com',
        passwordDemo: '123456'
    });
    const {email,password} = formData;
    const {emailDemo,passwordDemo} = demoLoginData;

    const onChange = e => setformData({...formData, [e.target.name]:e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
            login(email,password);
        };

    const onClick = async e => {
        e.preventDefault();
        login(emailDemo,passwordDemo)
    };
    //redirect if logged in
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }

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
                <input type="submit" onClick={e=>onClick(e)} className="btn btn-primary" value="Demo login"/>
            </form>
            <p className="my-1">
                you dont have an account? <Link to="/register">Sign up</Link>
            </p>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login)