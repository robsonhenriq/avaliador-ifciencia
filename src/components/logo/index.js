import React, { Component } from "react";
import {StyleSheet, Image, View} from "react-native";
import images from "../../images/logo";

export default class Logo extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Image
                style={styles.image}
                source={images.logo}
                >
                </Image>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 5
    },
    image:{
        height: 200,
        width: 200,
    }
}
);