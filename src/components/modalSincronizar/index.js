import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Modal from 'react-native-modal';
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const ModalSinc = (props) => (
  <Modal
   isVisible={props.display}
   onBackdropPress={props.onBackdropPress} onBackButtonPress={props.onBackButtonPress}>
    <View style={styles.container}>
      <View style={styles.containerModal}>
        <Text style={styles.title}> Enviar Avaliações </Text>

        <Text style={styles.description}> Confirme suas credenciais</Text>

        <Text style={styles.label}> Prontuário</Text>

        <TextInput style={styles.inputs} maxLength={10} />

        <Text style={styles.label}> Senha</Text>

        <TextInput style={styles.inputs} secureTextEntry={true}/>

        <View style={styles.botoesContainer}>
                      <TouchableOpacity style={styles.botaoCancelar} onPress={props.onBackdropPress} >
                          <Text style={styles.textoBotao}> Cancelar </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.botaoSincronizar} onPress={props.sincronizar}>
                          <Text style={styles.textoBotao}> Sincronizar </Text>
                      </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    width: '100%',
    height: Dimensions.get('window').height / 2,
    margin: 5
  },
  containerModal:{
    minHeight: '100%'
  },
  title:{
    margin: 5,
    color: colors.titleFontColor,
    fontSize: fonts.title,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  description:{
    color: colors.fontColor,
    fontSize: fonts.text,
    fontWeight: 'bold',
    margin: 5
  },
  label:{
    color: colors.fontColor,
    fontSize: fonts.description,
    margin: 5
  },
  inputs:{
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderSecondaryColor,
    margin: 5
  },
  botoesContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    margin: 10
  },
  botaoCancelar:{
    borderColor: colors.borderPrimaryColor,
    minWidth: '30%',
    minHeight: 30,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.grayColor
  },
  botaoSincronizar:{
    borderColor: colors.borderPrimaryColor,
    minWidth: '30%',
    minHeight: 30,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.primary
  },
  textoBotao:{
    color: colors.titleFontColor,
    marginTop: 5,
    textAlign: 'center'
  }
});

export default ModalSinc
