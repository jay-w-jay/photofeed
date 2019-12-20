import React from 'react';
import {
    FtatList, StyleSheet, Text, View, Image
 } from 'react-native';

 import {f, auth, database } from '../../config/config';

 class upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false
        }
    }

    componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function(user) {
            if (user) {
                //Logged in
                that.setState({
                    loggedin: true
                });
            } else {
                //Not logged in
                that.setState({
                    loggedin: false
                });
            }
        });
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            { this.state.loggedin == true ? (
                <Text>Upload</Text>
            ) : (
                <View>
                    <Text>You are not logged in</Text>
                    <Text>Please log in to upload content</Text>
                </View>                
            )} 
            
            </View>
        )
    }
 }

 export default upload;