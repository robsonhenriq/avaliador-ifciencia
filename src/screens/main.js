import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import MainCard from '../components/mainCard';
import Logo from '../components/logo';
import ModalSinc from '../components/modalSincronizar';
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import colors from '../styles/colors';
import { limparAvaliacoes } from '../actions';
import { purgeStoredState } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import api from '../services/api';

class ScreenMain extends Component {
  static navigationOptions = {
    title: `IFCIÊNCIA ${new Date().getFullYear()}`,
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.titleFontColor,
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center'
    }
  };

  componentDidMount() {
    this.setState({ display: false });
  }

  componentWillReceiveProps() {
    const { navigation } = this.props;
    const message = navigation.getParam('message', '');
    if (message) {
      this.setState({ message });
    }
  }

  componentDidUpdate() {
    this.renderFeedback(this);
    if (this.state.message) {
      this.setState({ message: '' });
    }
  }

  state = {
    display: false,
    message: ''
  };

  toggleModalSinc() {
    const { display } = this.state;

    this.setState(prevState => {
      return {
        display: !display,
        message: ''
      };
    });
  }

  renderFeedback(context) {
    const message = context.props.navigation.getParam('message', '');
    if (message) {
      context.refs.toast.show(message, 2500);
    }
  }

  handleSincronizar() {
    const persistConfig = {
      key: 'root',
      storage
    };

    // dados = this.props.avaliacoes.avaliacoesList;
    // // this.state
    // api
    //   .post('/per/per_avalia.php', dados)
    //   .then(response => console.log(response));
    purgeStoredState(persistConfig);
    limparAvaliacoes();
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Logo />
          <ModalSinc
            data="modal"
            display={this.state.display}
            sincronizar={() => {
              this.handleSincronizar(),
                navigation.navigate('Home', {
                  message: 'Sincronização realizada com sucesso!'
                }),
                this.toggleModalSinc();
            }}
            onBackdropPress={() => {
              navigation.setParams({ message: '' });
              this.toggleModalSinc();
            }}
            onBackButtonPress={() => {
              navigation.setParams({ message: '' });
              this.toggleModalSinc();
            }}
          />
        </View>
        <View style={styles.cards}>
          <MainCard
            textoCard="Avaliar"
            tipoCard="1"
            acaoBotao={() => this.props.navigation.navigate('Avaliar')}
          />
          <MainCard
            textoCard="Avaliações"
            tipoCard="2"
            acaoBotao={() => this.props.navigation.navigate('Avaliacoes')}
          />
          <MainCard
            textoCard="Sincronizar"
            tipoCard="3"
            acaoBotao={() => {
              navigation.setParams({ message: '' });
              this.toggleModalSinc();
            }}
          />
        </View>
        {/* {this.renderFeedback(this)} */}
        <Toast
          ref="toast"
          style={styles.toast}
          textStyle={styles.toastText}
          position="top"
          positionValue={200}
          fadeInDuration={700}
          fadeOutDuration={1500}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: colors.background
  },
  cards: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  toast: {
    backgroundColor: colors.primary,
    borderColor: colors.borderPrimaryColor,
    borderWidth: 1,
    borderRadius: 5
  },
  toastText: {
    color: colors.titleFontColor,
    fontSize: 14
  }
});

const mapStateToProps = state => {
  const { avaliacoes } = state;
  return { avaliacoes };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      limparAvaliacoes
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMain);
