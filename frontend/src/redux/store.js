import { createStore} from "redux";


import rootReducer from "./rootReducer";


const store = createStore(rootReducer);
//const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

//store.subscribe(() => console.log(store.getState()));
//console.log(store);

export default store;
