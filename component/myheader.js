import * as React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView,Image } from 'react-native';
import { TextInput, Appbar , Button} from 'react-native-paper';

const MyHeader = (props)=>{
    return(
        <View>
            <Appbar.Header
                style={{
                    backgroundColor: '#008b8b'
                }}
            >
                <Appbar.Content 
                    title="Weather Forecast" 
                    subtitle={props.title}
                    style={{alignItems: 'center'}}
                />
            </Appbar.Header>
        </View>
    )
}

export default MyHeader