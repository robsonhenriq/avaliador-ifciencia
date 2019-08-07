import { createStackNavigator, createAppContainer } from "react-navigation";

import ScreenMain from './screens/main';
import ScreenAvaliar from './screens/avaliar';
import ScreenAvaliacoes from './screens/avaliacoes';
import ScreenQuestionario from "./screens/questionario";

const stackNavigator =  createStackNavigator(
    {
        Home: {
            screen: ScreenMain,
        },
        Avaliar: {
            screen: ScreenAvaliar
        },
        Avaliacoes: {
            screen: ScreenAvaliacoes
        },
        Questionario:{
            screen: ScreenQuestionario
        }
    },
    {
        initialRouteName: 'Home',
    });

export default createAppContainer(stackNavigator);