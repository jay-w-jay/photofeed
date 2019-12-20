import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image
 } from 'react-native';

 import { f, auth, database } from '../../config/config';
 import firebase from 'firebase';

 class feed extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             photo_feed: [],
             refresh: false,
             loading: true,
         }
     }

     componentDidMount = () => {
         //Load the feed from the db
         this.loadFeed();
     }

     loadFeed = () => {
         this.setState({
             refresh: true,
             photo_feed: []
         });

         var that = this;

         firebase.database().ref('photos').orderByChild('posted').once('value').then(function(snapshot) {
             const exists = (snapshot.val() !== null);
             if (exists) data = snapshot.val();
             var photo_feed = that.state.photo_feed;
             for (var photo in data) {
                 var photoObj = data[photo];
                 firebase.database().ref('users').child(photoObj.author).once('value').then(function(snapshot) {
                    const exists = (snapshot.val() !== null);
                    if (exists) data = snapshot.val();
                        photo_feed.push({
                            id: photo,
                            url: photoObj.url,
                            caption: photoObj.caption,
                            posted: photoObj.posted,
                            author: data.username
                        });

                        that.setState({
                            refresh: false,
                            loading: false,
                        });
                 }).catch(error => console.log(error));
             }
         }).catch(error => console.log(error));
     }

     loadNew = () => {
        this.loadFeed();
     }

     render() {
         return ( 
             <View style={{flex: 1}}>
             <View style={{height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightGrey', borderBottomWidth: 0.5, justifyContent: "center", alignItems: "center"}}>
                <Text>Feed</Text>
             </View>
             {this.state.loading == true ? (
                 <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                 <Text>Loading...</Text>
                 </View>
             ) : (
             <FlatList
                refreshing={this.state.refresh}
                onRefresh={this.loadFeed}
                data={this.state.photo_feed}
                keyExtractor={(item, index) => index.toString()}
                style={{flex:1, backgroundColor:'#eee'}}
                renderItem={({item, index}) => (
                    <View key={index} style={{width: '100%', overflow: "hidden", marginBottom: 5, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'grey'}}>
                        <View style={{padding: 5, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>{item.posted}</Text>
                            <Text>{item.author}</Text>
                        </View>
                        <View>
                            <Image source={{uri: item.url}}
                            style={{resizeMode: 'cover', width: '100%', height: 275}}
                            />                    
                        </View>
                        <View style={{padding: 5}}>
                            <Text>{item.caption}</Text>
                            <Text style={{marginTop: 10, textAlign: 'center'}}>View Comments</Text>
                        </View>
                    </View>
                )}
             />
             )}

             </View>
         )
     }
 }
 export default feed;