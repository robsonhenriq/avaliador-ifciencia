import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Alert, Navigator, Text, FlatList, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Slider } from "react-native-elements";
import { salvarAvaliacao } from "../actions";
import colors from "../styles/colors";
import fonts from "../styles/fonts";


class ScreenQuestionario extends Component{

    static navigationOptions = {
        title: "Avalie o Poster",
        headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.titleFontColor,
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
    }

    state = {
        PosterId: "",
        PosterTitulo: "",
        perguntas:[]
    }

    componentDidMount(){
        this.prepareQuestions();
    }

    prepareQuestions(){
        let i = 0;
        const data = this.props.navigation.getParam("data", "");
        const PosterId = data.Id;
        this.setState({PosterTitulo: data.Titulo});
        this.setState({PosterId: data.Id });
        let prontuario = Math.random();
        let dados = [
            {
                Id: i++,
                Texto: "Pertinência do título e qualidade do painel",
                Nota: 0,
                PosterId: PosterId,
                Prontuario: prontuario
            },
            {
                Id: i++,
                Texto: "Atualidade e originalidade do trabalho e relevância",
                Nota: 0,
                PosterId: PosterId,
                Prontuario: prontuario
            },
            {
                Id: i++,
                Texto: "Consistência teórica do trabalho",
                Nota: 0,
                PosterId: PosterId,
                Prontuario: prontuario
            },
            {
                Id: i++,
                Texto: "Metodologia utilizada (Adequação e qualidade)",
                Nota: 0,
                PosterId: PosterId,
                Prontuario: prontuario
            },
            {
                Id: i++,
                Texto: "Análise de dados e resultados: articulação teórica e metodológica da interpretação.Conclusões: coerência e alcance.",
                Nota: 0,
                PosterId: PosterId,
                Prontuario: prontuario
            },
            {
                Id: i++,
                Texto: "Domínio do aluno sobre o tema",
                Nota: 0,
                PosterId: PosterId,
                Prontuario: prontuario
            }
        ];   

        this.setState({perguntas: dados});
    }
    handleSliderValueChange(value, perguntaId){

        let perguntasCopy = JSON.parse(JSON.stringify(this.state.perguntas));

        perguntasCopy[perguntaId].Nota = value;

        this.setState({
            perguntas: perguntasCopy
        });
    };

    clearState(){

        let perguntasCopy = JSON.parse(JSON.stringify(this.state.perguntas))

        perguntasCopy.forEach(element => {
            element.Nota = 0
        });

        this.setState({
            perguntas: perguntasCopy
        });
    }

    confirmSave(){

        const { PosterTitulo, PosterId, perguntas} = this.state;
        const { salvarAvaliacao, navigation } = this.props;

        let retorno = {
            tituloPoster: PosterTitulo,
            data: perguntas,
            posterId: PosterId
        };

        Alert.alert("Confirmar Avaliação", `Deseja confirmar sua avaliação para o poster '${PosterTitulo}'?`, [
            {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => {
                salvarAvaliacao(retorno)
                navigation.navigate("Home", {
                    message: "Poster Avaliado com sucesso!"
                })
            }}
        ]);

    }

    render(){
        
        return(
            <ScrollView>
                <Text style={styles.tituloPoster}> {this.state.PosterTitulo}</Text>
                <FlatList
                contentContainerStyle={styles.list}
                data={this.state.perguntas}
                keyExtractor={(item) => item.Id}
                renderItem={({item}) =>
                <View style={styles.container}>
                    <Text style={styles.listItem}>{item.Texto}</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={10}
                        animateTransitions={true}
                        step={0.5}
                        thumbStyle={styles.thumb}
                        trackStyle={styles.track}
                        thumbTintColor='#42f445'
                        value={item.Nota}
                        onValueChange={(value) => this.handleSliderValueChange(value, item.Id)} />
                    <Text styles={styles.nota}> Nota: {item.Nota} </Text>
                </View>}
                />
                <View style={styles.botoesContainer}>
                    <TouchableOpacity style={styles.botaoLimpar} onPress={() => this.clearState()}>
                        <Text style={styles.textoBotao}> Limpar </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoSalvar} onPress={() => this.confirmSave()} >
                        <Text style={styles.textoBotao}> Salvar </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
           
          );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: colors.borderSecondaryColor,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        flex: 1
    },
    tituloPoster:{
        color: colors.titleFontColor,
        fontSize: fonts.title,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10
    },
    listItem:{
        fontSize: fonts.description,
        color: fonts.fontColor,
        marginBottom: 10
    },
    list:{
        padding: 20,
    },
    thumb:{
        backgroundColor: colors.primary
    },
    track:{
        backgroundColor:  '#9cce9c'
    },
    nota:{
        justifyContent: 'flex-end',
        alignItems: "flex-end"
    },
    botoesContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginHorizontal: 50,
        marginBottom: 20
    },
    botaoLimpar:{
        minWidth: '30%',
        minHeight: 40,
        borderColor: colors.borderSecondaryColor,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: colors.grayColor,
    },
    botaoSalvar:{
        minWidth: '30%',
        minHeight: 40,
        borderColor: colors.borderPrimaryColor,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: colors.primary
    },
    textoBotao:{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: colors.titleFontColor,
        paddingTop: 8
    }
})

const mapStateToProps = (state) => {
    const { avaliacoes } = state
    return { avaliacoes }
  };

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      salvarAvaliacao,
    }, dispatch)
  );

export default connect(mapStateToProps, mapDispatchToProps)(ScreenQuestionario);