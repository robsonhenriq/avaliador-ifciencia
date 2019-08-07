import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity, Dimensions} from "react-native";
import images from '../../images/mainCard';
import colors from '../../styles/colors';

export default class MainCard extends Component {

    render(){
        const { textoCard, tipoCard, acaoBotao } = this.props;
        let imagem;

        switch (tipoCard) {
            case "1":
                imagem = images.avaliar;
                break;
        
            case "2":
                imagem = images.avaliacoes;
                break;
            
            case "3":
                imagem = images.sincronizar;
                break;
            default:
                break;
        }

        return(
            <TouchableOpacity 
                style={styles.card}
                onPress={acaoBotao}
                >
                <Image 
                style={styles.imageCard}
                source={imagem} />
                <Text style={styles.texto}>
                 {textoCard}
                </Text>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    card:{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#a6e29c',
        borderRadius: 4,
        minWidth: Dimensions.get('window').width / 3.5,
        minHeight: 130,
        backgroundColor: colors.primary,
        margin: 10
    },
    imageCard:{
        justifyContent: 'center',
        width: 40,
        height: 40,
        marginVertical: 10,
        marginHorizontal: 10
    },
    texto: {
        borderTopWidth: 1,
        borderColor: '#cecece',
        fontSize: 14,
        color: "#02330c"
    }
});