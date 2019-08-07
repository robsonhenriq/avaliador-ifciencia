import React, { Component } from "react";
import { connect } from 'react-redux';
import { Alert, Text, FlatList, View, StyleSheet } from "react-native";
import colors from '../styles/colors'
import fonts from "../styles/fonts";

class ScreenAvaliacoes extends Component{

    static navigationOptions = {
        title: "Posters Avaliados",
        headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.titleFontColor,
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
    }
    
    render(){
        return(
            <View style={styles.viewContainer}>
                
                {this.props.avaliacoes.avaliacoesList.length > 0 ? 
                
                 <FlatList
                 contentContainerStyle={styles.list}
                 data={this.props.avaliacoes.avaliacoesList}
                 keyExtractor={(item) => item.Id}
                 renderItem={({item}) => <View style={styles.container}>
                                             <Text style={styles.listItem}>{item.tituloPoster}</Text>
                                         </View>}
                 /> 
                :
                <Text style={styles.noPoster}> Não há posters avaliados.</Text>             
            }
            </View>
            
           
          );
    }
}

const styles = StyleSheet.create({
    viewContainer:{
        backgroundColor: colors.background,
        flex: 1
    },
    container:{
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.borderSecondaryColor,
        borderRadius: 5,
        padding: 10,
        margin: 5,
    },
    listItem:{
        fontSize: fonts.text,
        color: colors.fontColor,
        marginBottom: 10
    },
    list:{
        padding: 20,
    },
    noPoster:{
        fontSize: fonts.title,
        color: colors.fontColor,
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10
    }
})


const mapStateToProps = (state) => {
    const { avaliacoes } = state
    return { avaliacoes }
  };

export default connect(mapStateToProps)(ScreenAvaliacoes);