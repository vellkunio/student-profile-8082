import axios from 'axios';
import React, { Component } from 'react';
import Container from '@mui/material/Container';

//MUI stuff
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Student from './Student'


class Main extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.handler = this.handler.bind(this)
        this.state = {
            students: null,
            searchName: "",
            searchTag: "",
            tags: [] //consists of objects(Id, Tag)
        }
    }

    //Populate Tags state from Student Component
    handler = (tag, id) => {
        this.setState(prevState => ({
            tags: [...prevState.tags, {"id": id, "tag": tag}]
          }))
    }

    //Get API
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

        let filteredTags = this.state.tags ? (
            this.state.tags.filter(
                tag => tag.tag.startsWith(this.state.searchTag)
            )
        ) : (
            <h3>Loading</h3>
        )

        let recentStudentsMarkup = this.state.students ? (
            this.state.students.students.filter(
                student => student.firstName.startsWith(this.state.searchName) || 
                student.lastName.startsWith(this.state.searchName) ||
                student.lastName.toLowerCase().startsWith(this.state.searchName) ||
                student.firstName.toLowerCase().startsWith(this.state.searchName) ||
                `${student.firstName} ${student.lastName}`.startsWith(this.state.searchName) ||
                `${student.firstName} ${student.lastName}`.toLowerCase().startsWith(this.state.searchName)
                )
            .map(student => <Student key={student.id} student={student} searchTag={this.state.searchTag}
                 ref= {this.myRef } handler = {this.handler} filteredTags = {filteredTags}/>)
            
        ) : (

            // Show loading circle while getting data from server
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

                {/* input */}
                <TextField id="searchTag" name="searchTag"
                label="Search by tag" variant="standard" size="small" 
                onChange={this.handleChange} value={this.state.searchTag}
                placeholder={"Please enter tag"}
                style={{marginBottom: '20px'}} fullWidth
                />

                {/* print results */}
                {recentStudentsMarkup}
            </Container>
        )
    }
}

export default Main