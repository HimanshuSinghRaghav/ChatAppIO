import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersSlice from "../slices";
import authSlice from "../slices/authSlice";
import chatSlice from "../slices/chatSlice";
import messageSlice from "../slices/messageSlice";

const persistConfig = {
    key: "root",
    storage,
};

const reducer = combineReducers({
    users: usersSlice.reducer,
    auth: authSlice.reducer,
    currentChat: chatSlice.reducer,
    messages:messageSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { persistor };
export default store