import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        padding: theme.spacing.unit * 2,
        margin: theme.spacing.unit * 2,
    },
    paper: {
        padding: theme.spacing.unit * 2,
    },
    textfield_250: {
        width: '250px',
    },
    textfield_350: {
        width: '350px',
    },
    btn_style_addinfo: {

    }

});

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            summary: '',
            description: '',
            validate_summary: '',
            validate_description: '',
            messageText: '',
            progress: false,
        }
    }

    handleChange = (attr : string, e : SyntheticInputEvent<HTMLButtonElement>) => {
        var obj = {}
        obj[attr] = e.target.value
        this.setState(obj)
    }

    validateSummary = () => {
        if( this.state.summary === '' ){
            this.setState({
                validate_summary: 'summary cannot be empty.'
            })
            return false
        }
        this.setState({validate_summary: ''})
        return true
    }

    validateDesccription = () => {
        if( this.state.description === '' ){
            this.setState({
                validate_description: 'description cannot be empty.'
            })
            return false
        }
        this.setState({validate_description: ''})
        return true
    }

    handleSubmit = () => {
        let res_validate_summary = this.validateSummary()
        let res_validate_description = this.validateDesccription()
        if( res_validate_summary && res_validate_description ){
            this.setState({
                loading: true
            }, () => {
               var url = "/api/update";
                var formData = new FormData()
                formData.append('summary', this.state.summary )
                formData.append('description', this.state.description)

                fetch( url, {
                    method: 'POST',
                    body: formData
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    if( responseJson.errors.length > 0 ){
                        this.setState({
                            messageText: responseJson.errors,
                            loading: false,
                        })
                    } else {
                        this.setState({
                            loading: false,
                        })
                        window.location.reload();
                    }
                })
            })
        }

    }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper elevation={1} className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        Google Calendar API using Service Account Sample.
                    </Typography>
                    <div>
                        <div>
                           <TextField
                              id="summary"
                              label="Summary"
                              value={this.state.summary}
                              error={ this.state.validate_summary !== '' }
                              onChange={ (e) => { this.handleChange('summary', e) } }
                              margin="normal"
                              className={ classes.textfield_250 }
                            />
                        </div>
                        <div>
                           <TextField
                              id="description"
                              label="Description"
                              value={this.state.description}
                              error={ this.state.validate_description !== '' }
                              onChange={ (e) => { this.handleChange('description', e) } }
                              margin="normal"
                              className={ classes.textfield_250 }
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            variant="raised"
                            color="primary"
                            className={ classes.btn_style_addinfo }
                            onClick={ this.handleSubmit }
                        >
                            Push to Google Calendar
                        </Button>
                    </div>
                </Paper>

                <Dialog
                    open={ this.state.messageText !== '' }
                    fullWidth={ true }
                    maxWidth="md"
                >
                  <DialogTitle id="scroll-dialog-title">Message</DialogTitle>
                  <DialogContent>
                      { this.state.messageText }
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={ () => { this.setState({messageText: ''}) } } >
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.loading}
                    fullWidth={ true }
                    maxWidth="sm"
                >
                  <DialogTitle id="scroll-dialog-title">Loading</DialogTitle>
                  <DialogContent>
                      <div style={{textAlign: 'center'}}>
                        <CircularProgress className={classes.progress} />
                      </div>
                  </DialogContent>
                </Dialog>
            </div>
        );
    }

}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);