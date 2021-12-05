import axios from 'axios';
import React, { Component } from 'react';
import Container from '@mui/material/Container';

//MUI stuff
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import Student from './Student'

//TODO
//Convert the whole project form into the form to send the update function on the Edit button

class Main extends Component {
    state = {
        students: null,
        searchName: ""
    }

    componentDidMount(){

        axios.get('https://www.hatchways.io/api/assessment/students')
            .then(res => {
                this.setState({
                    students: res.data
                })
            })
    }

    handleChange = (event) => {
    
        this.setState({
            [event.target.name]: event.target.value
        });

}

    render() {

        let recentStudentsMarkup = this.state.students ? (
            this.state.students.students.filter(
                student => student.firstName.startsWith(this.state.searchName) || 
                student.lastName.startsWith(this.state.searchName) ||
                student.lastName.toLowerCase().startsWith(this.state.searchName) ||
                student.firstName.toLowerCase().startsWith(this.state.searchName) ||
                `${student.firstName} ${student.lastName}`.startsWith(this.state.searchName) ||
                `${student.firstName} ${student.lastName}`.toLowerCase().startsWith(this.state.searchName)
                )
            .map(student => <Student key={student.id} student={student} />)

        ) : (

            // Show loading circle while getting data from json
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )

        return (
            <Container maxWidth="sm">
                {/* input */}
                <TextField id="searchName" name="searchName"
                label="Search by name" variant="standard" size="small" 
                onChange={this.handleChange} value={this.state.searchName}
                placeholder={"Please enter name starting with capital or lower case"}
                style={{marginBottom: '20px'}} fullWidth
            />

                {/* print results */}
                {recentStudentsMarkup}
            </Container>
        )
    }
}

export default Main