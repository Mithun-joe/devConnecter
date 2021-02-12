import React, {Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getProfiles} from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfilesItem from "./ProfileItems";


const Profiles = ({getProfiles,profile:{profiles,loading}}) => {

    useEffect(()=>{
        getProfiles()
    },[getProfiles]);

    return (
        <Fragment>
            {loading ? <Spinner/> : <Fragment>
                <h1 className='large text-primary'>Developers</h1>
                <p className='lead'>
                    <i className='fab fa-connectdevelop'></i> Browse and connect with developers
                </p>
                <div className='profiles'>
                    {profiles ? (
                        profiles.map(pro=> (<ProfilesItem key={pro._id} profile={pro} />))
                    ) : <h4>No profile found</h4>}
                </div>
            </Fragment>}
        </Fragment>
    )
};

Profiles.propTypes ={
    getProfiles : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps,{getProfiles})(Profiles)

