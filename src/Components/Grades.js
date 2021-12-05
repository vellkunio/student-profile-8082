import React, { Component, Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';


const styles = {
    text: {
        fontSize: 12,
        color: "black",
        opacity: "0.75"
    },
    largeText: {
        fontSize: 24
    }
}



class Grades extends Component {

    //ALL STATES
    constructor(props){
        super(props);
        this.state ={
            
        }
    }
    
    render() {

        const {
            grades
        } = this.props;


    return (
        <div style={{marginLeft: "0"}}>
            <Typography>Test1: {grades[0]}</Typography>
            <Typography>Test2: {grades[1]}</Typography>
            <Typography>Test3: {grades[2]}</Typography>
            <Typography>Test4: {grades[3]}</Typography>
            <Typography>Test5: {grades[4]}</Typography>
            <Typography>Test6: {grades[5]}</Typography>
            <Typography>Test7: {grades[6]}</Typography>
            <Typography>Test8: {grades[7]}</Typography>



            {/* <List sx={{ width: '100%', maxWidth: 100, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemText
                        disablePadding
                    />
                    ss
                </ListItem>
            <Divider variant="inset" component="li" />
            </List> */}


        </div>
    ); //end return
} //end render
} //end class

export default withStyles(styles)(Grades);
