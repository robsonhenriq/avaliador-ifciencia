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
    // Para pegar do modal de sincronizazr
    // cod_avaliador : '',
    // senha : ''
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

    dados = this.props.avaliacoes.avaliacoesList;

    api
      .post('/per/per_avalia.php', this.formataJsonNotasCorretamente(dados))
      .then(response => console.log(response));
    purgeStoredState(persistConfig);
    limparAvaliacoes();
  }

  formataJsonNotasCorretamente(todasAvaliacoes) {
    let avaliacoesJsonCorreto = {};
    // Acrescentando o ARRAY de "avaliacao" (chave), no objeto referido
    avaliacoesJsonCorreto.avaliacao = [];
    // Declarando OBJETO DE AVALIACOES (formato esperado pelo per_avalia.php)
    let objAvaliacoes = {
      cod_poster: 0,
      cod_avaliador: '1750399',
      nota1: 0,
      nota2: 0,
      nota3: 0,
      nota4: 0,
      nota5: 0,
      nota6: 0,
      senha: '1750399'
    };

    // IRÁ SE INICIAR COM 0, colocado um valor estatico aqui para teste
    let posterIdAtual = 0;
    let contadorNota = 0;

    for (let i in todasAvaliacoes) {
      // Inserindo uma avaliacao, dps de montar o objeto
      if (contadorNota >= 5) {
        contadorNota = 0;

        let newObjAvaliacoes = { ...objAvaliacoes };
        avaliacoesJsonCorreto.avaliacao.push(newObjAvaliacoes);
      }

      todasAvaliacoes[i].data.map(avaliacoes => {
        // Se for um POSTER diferente do anterior faz um push do obj montando
        if (posterIdAtual !== avaliacoes.PosterId && contadorNota <= 5) {
          // Chamando a fn que tem o switch, para setar as notas
          this.setaNotaCorretamente(avaliacoes.Id, avaliacoes, objAvaliacoes);
          contadorNota++;
        } else {
          contadorNota = 0;
          // novo objCom as TODAS as notas de UM POSTER
          let newObjAvaliacoes = { ...objAvaliacoes };
          // Quando for a avaliação de um poster diferente, faz um push do Obj
          avaliacoesJsonCorreto.avaliacao.push(newObjAvaliacoes);
          this.setaNotaCorretamente(
            avaliacoes.Id,
            avaliacoes.Nota,
            objAvaliacoes
          );
          contadorNota++;
        }
      });
    }

    // Inserindo a ultima avaliação
    avaliacoesJsonCorreto.avaliacao.push(objAvaliacoes);

    // ==== JSON que é para retornar e ser enviado na API
    console.log('avaliacoesJsonCorreto: ', avaliacoesJsonCorreto);
    console.log(
      'JSON avaliacoesJsonCorreto: ',
      JSON.stringify(avaliacoesJsonCorreto)
    );

    return JSON.stringify(avaliacoesJsonCorreto);
  }

  /** Para ser chamada quando ITERA no array com todas as avaliações,
   * e for setar as notas corretamente, no JSON esperado pela API
   */
  setaNotaCorretamente(avaliacaoId, avaliacoes, objAvaliacoes) {
    objAvaliacoes.cod_poster = avaliacoes.PosterId;
    switch (parseInt(avaliacaoId)) {
      case 0:
        objAvaliacoes.nota1 = avaliacoes.Nota;
        break;
      case 1:
        objAvaliacoes.nota2 = avaliacoes.Nota;
        break;
      case 2:
        objAvaliacoes.nota3 = avaliacoes.Nota;
        break;
      case 3:
        objAvaliacoes.nota4 = avaliacoes.Nota;
        break;
      case 4:
        objAvaliacoes.nota5 = avaliacoes.Nota;
        break;
      case 5:
        objAvaliacoes.nota6 = avaliacoes.Nota;
        break;
    }
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
