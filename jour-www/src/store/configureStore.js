// src/store/index.js

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './reducers'; // the value from combineReducers

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['account_info'],
};

const pReducer = persistReducer(persistConfig, reducer);

export const store = createStore(pReducer, composeWithDevTools());
export const persistor = persistStore(store);
