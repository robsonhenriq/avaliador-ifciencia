import React from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import configureStore from './store';
import { PersistGate } from 'redux-persist/integration/react'

const { persistor, store } = configureStore();

const App = () => (<Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <Routes />
                        </PersistGate>
                    </Provider>
                );

export default App;