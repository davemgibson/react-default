import {createStore} from 'redux'

const reducer=(state={tab:1, counter:5, text:'', list:[]},action) => {
  switch (action.type) {
    case 'TEST':
      return Object.assign({}, state, {
            text: 'hello!!'
      })
    case 'INC':
       return Object.assign({}, state, {
            counter: state.counter+1
      })
     case 'ADD':
       return Object.assign({}, state, {
            list: [action.text,...state.list]
      })
      case 'TABCHANGE':
       return Object.assign({}, state, {
            tab: action.tab
      })

    default:
      return state;
  }
}


var ReactStore = (function () {
    const store=createStore(reducer);     

    return {
        dispatch: store.dispatch,
        getState: store.getState,
        store: store,
        subscribe: function(renderer){
            store.subscribe(renderer);
        }
    };
})();

module.exports = ReactStore;