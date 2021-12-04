import axios from 'axios';
import React, { Component, Fragment } from 'react';
import Container from '@mui/material/Container';

//MUI stuff
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Student from './Student'

//TODO
//Convert the whole project form into the form to send the update function on the Edit button

class Main extends Component {
    state = {
        students: null
    }
    componentDidMount(){

        axios.get('https://www.hatchways.io/api/assessment/students')
            .then(res => {
                // console.log(res.data)
                this.setState({
                    students: res.data
                })
                // console.log(this.state.students);
            })
            // .catch(err => console.log(err));
    }

    render() {

        let recentStudentsMarkup = this.state.students ? (
            this.state.students.students.map(student => <Student key={student.id} student={student} />)
        ) : (
            // Show loading circle while getting data from json
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
        // let recentProjectsMarkup = this.state.projects ? (
        //     this.state.projects.map(project => <Project key={project.projectId} project={project}/>)
        // ) : (
        // <p>Loading...</p>
        // );
        return (
            <Container maxWidth="sm">
                {recentStudentsMarkup}
            </Container>
            // <Fragment>
            //     <h1>lol</h1>
            // </Fragment>
        )
    }
}

export default Main


// axios.get('/projects')
        //     .then(res => {
        //         console.log(res.data)
        //         this.setState({
        //             projects: res.data
        //         })
        //     })
        //     .catch(err => console.log(err));