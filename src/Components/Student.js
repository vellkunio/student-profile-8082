import React, { Component, Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';

import MyButton from '../util/MyButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Grades from './Grades';
import TextField from '@mui/material/TextField';
import Tag from './Tag';

const styles = {
    text: {
        fontSize: 18,
        color: "black",
        opacity: "0.75"
    },
    largeText: {
        fontSize: 24
    },
    tags: {
        background: "#bababa",
        display: "inline-block"
    }
}


//Show each student component
class Student extends Component {

    //ALL STATES
    constructor(props){
        super(props)

        this.state ={
            isExpand: false,
            tag: "",
            tags: [],
            isShow: true
        }
    }

    //To calculate average func
    calculateAverage = (arr) => {
        let totalScore = 0;

        for(let x = 0; x < arr.length; x++){
            totalScore = totalScore + parseInt(arr[x], 10);
        }
        return totalScore/arr.length;
    }

    //Expand or Close 
    changeExpandState = e => {
        this.setState({
            isExpand: !this.state.isExpand
        })
    }

    //Change input states
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //On press Enter
    keyPress = (e) => {
        if(e.keyCode === 13){
            this.props.handler(this.state.tag, this.props.student.id);
        
            this.setState(prevState =>({
                tags: [...prevState.tags, this.state.tag]
            }))
            this.setState({
                tag: ""
            })
        }
    }

    
    render() {
        const {
            filteredTags,
            searchTag,
            classes,
            student: {
                id, company, email, firstName, grades, lastName,
                pic, skill }
        } = this.props;

        const average = this.calculateAverage(grades);
        
        //Filter using tags to show or hide component
        function compareStudentId (array, sid, searchTag)  {
            let isShow = true;
            if(array.length === 0 || searchTag === "") {
                isShow = true;
            } 
            else {
                isShow = false;
            }
            array.map(tag => {
                if(tag.id === sid){
                    isShow = true;
                }
            }
            )
            return isShow;
        }

        //Show Tags by calling Tag Component
        let showAllTags = this.state.tags ? (
            this.state.tags.map(tag => <Tag key={tag} tag={tag}/>)
        ) : (
            <div></div>
        )

    return (
        <div>

        { compareStudentId(filteredTags, id, searchTag) ? 
          <div>
            
            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar 
                        alt={`Avatar of ${firstName}`}
                        src={pic} 
                        sx={{ width: 75, height: 75 }}
                     />
                    </ListItemAvatar>
                    <ListItemText
                    disableTypography={true}
                    primary={
                    <Typography className={classes.largeText}>
                        {`${firstName} ${lastName}`}    
                    </Typography>
                    
                    }
                    secondary={
                        <Fragment>
                            <Typography className={classes.text}>Email: {email}</Typography>
                            <Typography className={classes.text}>Company: {company}</Typography>
                            <Typography className={classes.text}>Skill: {skill}</Typography>
                            <Typography className={classes.text}>Average: {average}%</Typography>
                            {this.state.isExpand ? (
                                <Grades grades={grades}/>
                            ) : (
                                <div></div>
                            )}
                        </Fragment>   
                    }
                    />
                    {this.state.isExpand ? (
                        <MyButton tip="Shrink" onClick={this.changeExpandState}>
                            <RemoveIcon />
                        </MyButton>
                    ) : (
                        <MyButton tip="Expand" onClick={this.changeExpandState}>
                            <AddIcon />
                        </MyButton>
                    )}
                    </ListItem>

                    
                    <TextField id="tag" name="tag"
                        label="Tag" variant="standard" size="small" 
                        onChange={this.handleChange} value={this.state.tag}
                        placeholder={"Add a tag"}
                        style={{marginBottom: '20px'}}
                        onKeyDown={this.keyPress}
                    />

                    {this.state.tags ? (
                        <div>
                            {showAllTags}
                        </div>
                    ) : (
                        <div></div>
                    )}


            <Divider variant="inset" component="li" />
            </List>

          </div> : null
        }
        </div>
    ); //end return
} //end render
} //end class

export default withStyles(styles)(Student);
