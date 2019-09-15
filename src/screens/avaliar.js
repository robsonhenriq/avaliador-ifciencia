import React, { Component } from "react";
import colors from "../styles/colors";
import { connect } from "react-redux";

import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";

class ScreenAvaliar extends Component {
  static navigationOptions = {
    title: "Scanear Poster",
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.titleFontColor,
    headerTitleStyle: {
      fontWeight: "bold",
      textAlign: "center"
    }
  };
  onSuccess(e) {
    const data = JSON.parse(e.data);
    const { navigation } = this.props;
    const { avaliacoesList } = this.props.avaliacoes;

    let avaliacaoJaRealizada = avaliacoesList.find(avaliacao => {
      return avaliacao.posterId === data.Id;
    });

    if (avaliacaoJaRealizada) {
      Alert.alert("Este Poster já foi avaliado", "", [
        {
          text: "Ok. Irei scanear outro.",
          onPress: () => this.scanner.reactivate()
        }
      ]);
    } else {
      Alert.alert("Deseja avaliar este Poster?", `Titulo: ${data.titulo}`, [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Confirmar",
          onPress: () => navigation.navigate("Questionario", { data: data })
        }
      ]);
    }
  }

  render() {
    return (
      <QRCodeScanner
        ref={node => {
          this.scanner = node;
        }}
        onRead={e => this.onSuccess(e)}
        topContent={
          <Text style={styles.centerText}>Scaneie o poster e avalie</Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>Scaneie o poster</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777"
  },
  textBold: {
    fontWeight: "500",
    color: "#000"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    padding: 16
  }
});

const mapStateToProps = state => {
  const { avaliacoes } = state;
  return { avaliacoes };
};

export default connect(mapStateToProps)(ScreenAvaliar);
