# AvaliadorIFCiencia

## Sobre o projeto

O projeto foi desenvolvido utilizando React Native nas seguintes versões:

- react-native-cli: 2.0.1
- react-native: 0.57.4

Para mais detalhes sobre versões dos pacotes, verifique no arquivo package.json.

## Por onde começar?

É extremamente recomendado conhecimentos nas seguintes bibliotecas do React Native, que são utilizadas neste projeto:

- react-redux
- redux
- redux-persist
- react-navigation

Para informações sobre os pacotes acima, consulte a documentação do react, disponível em: https://facebook.github.io/react-native/docs/getting-started.html

## Arquitetura e Organização de pastas

O aplicativo que é renderizado no arquivo index.js, consta na pasta src (scr/index.js).

A arquitetura de pastas (dentro da pasta src) está organizada da seguinte forma:

- actions (Redux)
- components (Componentes customizados para a aplicação, não os por padrão fornecidos pelo react)
- images (imagens utilizadas pelo sistema)
- reducers (Redux)
- screens (telas da aplicação)
- services (endpoint de api's)
- store (Redux)
- styles (estilos gerais do aplicativo, configuráveis)

Além disso, há o arquivo 'routes.js' que define as rotas para cada tela (react-navigation).

É de suma importância que o desenvolvimento prossiga seguindo este padrão.

## Futuras demandas

Para a continuação do desenvolvimento do aplicativo, é necessário:

- Fazer a funcionalidade do botão 'sincronizar', que deve enviar ao web-service um array contendo as avaliações realizadas no aplicativo. Após isso, limpar a 'storage' do redux-persist.

- Tratar os retornos do web-service e exibir o toast de acordo com o response recebido.

- Melhorar responsividade do aplicativo, modo paisagem necessita de atenção.

# Autores

- Cauê Rossi de Andrade. Responsável pelo inicio do projeto do aplicativo hibrido. Desenvolvimento de toda parte visual do aplicativo e fluxo de telas. 
Git: https://bitbucket.org/guitarrossi/ | Linkedin: https://www.linkedin.com/in/cau%C3%AA-andrade-1520b6b4/ 
