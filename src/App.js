import React from "react";
import IndexRouter from "./router/IndexRouter";
import "./App.css";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store/store";
import {PersistGate} from "redux-persist/integration/react";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <IndexRouter/>
            </PersistGate>
        </Provider>
    );
}

export default App;
