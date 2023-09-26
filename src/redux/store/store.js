import {createStore, combineReducers} from "redux";
import {CollapsedReducer} from "../reducers/CollapsedReducer";
import {LoadingReducer} from "../reducers/LoadingReducer";
import {persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer"; // defaults to localStorage for web


const reducer = combineReducers({
    CollapsedReducer,
    LoadingReducer
});
// 持久化，把reducer放入localStorage
const persistConfig = {
    key: "chen",
    storage,
    // 持久化黑名单
    blacklist: ["LoadingReducer"]
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);
export {
    store,
    persistor
};

