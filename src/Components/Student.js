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


const styles = {
    text: {
        fontSize: 18,
        color: "black",
        opacity: "0.75"
    },
    largeText: {
        fontSize: 24
    }
}



class Student extends Component {

    //ALL STATES
    constructor(props){
        super(props);
        this.state ={
            isExpand: false
        }
    }

    calculateAverage = (arr) => {
        let totalScore = 0;

        for(let x = 0; x < arr.length; x++){
            totalScore = totalScore + parseInt(arr[x], 10);
        }
        return totalScore/arr.length;
    }

    changeExpandState = e => {
        this.setState({
            isExpand: !this.state.isExpand
        })
    }

    
    render() {
        const {
            classes,
            student: {
                id, city, company, email, firstName, grades, lastName,
                pic, skill }
        } = this.props;

        const average = this.calculateAverage(grades);

    return (
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
                        <MyButton tip="Expand" onClick={this.changeExpandState}>
                            <RemoveIcon />
                        </MyButton>
                    ) : (
                        <MyButton tip="Expand" onClick={this.changeExpandState}>
                            <AddIcon />
                        </MyButton>
                    )}

                    {/* <MyButton tip="Expand" onClick={this.changeExpandState}>
                        <AddIcon />
                    </MyButton> */}
                </ListItem>
                
                
                
            <Divider variant="inset" component="li" />
            </List>


        </div>
    ); //end return
} //end render
} //end class

export default withStyles(styles)(Student);
