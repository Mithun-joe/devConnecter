import axios from 'axios';
import {setAlert} from "./alert";
import {
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from "./types";

//Get the current users profile
export const getCurrentProfile = () => async dispatch => {
    try{
        const res = await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    }catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg : err.response.statusText,status:err.response.status}
        })
    }
};

//update a profile
export const createProfile = (formData,history,edit=false)=> async dispatch =>{
    try{
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };

        const res = await axios.post('/api/profile',formData,config);

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        dispatch(setAlert(edit? 'Profile updated' : 'Profile created','success'));
            history.push('/dashboard');
    }catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
};

// Add experience
export const addExperience = (formData,history) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };

        const res = await axios.put('/api/profile/experience',formData,config);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Experience Added','success'));
        history.push('/dashboard')
    }catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
};

//add education
// Add experience
export const addEducation = (formData,history) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };

        const res = await axios.put('/api/profile/education',formData,config);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Education Added','success'));
        history.push('/dashboard')
    }catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
};

//delete experience
export const deleteExperience = id =>  dispatch =>{

    axios.delete(`api/profile/experience/${id}`)
        .then(res=>{
            dispatch({
                type:UPDATE_PROFILE,
                payload:res.data
            })
        })
        .then(()=>{
            dispatch(setAlert('Experience Removed','success'))
        })
        .catch(err=>{
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg:err.response.statusText , error: err.response.status}
            })
        })
};


//delete education
export const deleteEducation = id =>  dispatch =>{

    axios.delete(`api/profile/education/${id}`)
        .then(res=>{
            dispatch({
                type:UPDATE_PROFILE,
                payload:res.data
            })
        })
        .then(()=>{
            dispatch(setAlert('Education Removed','success'))
        })
        .catch(err=>{
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg:err.response.statusText , error: err.response.status}
            })
        })
};


//delete Account and profile
export const deleteAccount = () =>  dispatch =>{

    if(window.confirm('Are your sure')){
        axios.delete(`api/profile`)
            .then(res=>{
                dispatch({
                    type:CLEAR_PROFILE,
                });
                dispatch({type:ACCOUNT_DELETED})
            })
            .then(()=>{
                dispatch(setAlert('Your account has been succesfully deleted','success'))
            })
            .catch(err=>{
                dispatch({
                    type: PROFILE_ERROR,
                    payload: {msg:err.response.statusText , error: err.response.status}
                })
            })
    }

};


















