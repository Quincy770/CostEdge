export  default {
	namespaced: true,
    state:{
        order:{},
        orders:{},
    },
    mutations: {
        insertOrder(state,item){
            state.order = item;
        },
        insertOrders(state,item){
            state.orders = item;
        }
    },
    actions: {      
     insertOrder({commit},item){
            commit('insertOrder',item)
        },
        insertOrders({commit},item){
            commit('insertOrders',item)
        }
},
    getters: {   
         getOrder: state => {

          return state.order;
             // for(let i=0;i<state.users.length;i++){
             //     if(state.users[i].userId==itemId){
             //        return state.users[i];
             //     }
             // }
            
            
    },
    getOrders:state => {
        return state.orders;
    }
    
}
}