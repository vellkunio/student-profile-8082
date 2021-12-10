import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';

const styles = {
    tags: {
        background: "#bababa",
        display: "inline-block",
        padding: "4px",
        borderRadius: "3px"
    }
}


//TAG COMPONENT TO SHOW EACH TAG INDIVIDUATELY
class Tag extends Component {

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

    
    render() {
        const {
            classes,
            tag
        } = this.props;
        
        

    return (
        <div>
            
            <Typography 
                className={classes.tags}
                gutterBottom={true}
                >
                    {tag}
            </Typography>

        </div>
    ); //end return
} //end render
} //end class

export default withStyles(styles)(Tag);
