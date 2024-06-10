export  default {
	namespaced: true,
    state:{
        users:[],
    },
    mutations: {
        populateUser(state,item){
            state.users=item;
        }
    },
    actions: {      
        populateUser({commit},item){
            commit('populateUser',item)
        }
},
    getters: {   
         getUser: state => itemId => {
             for(let i=0;i<state.users.length;i++){
                 if(state.users[i].userId==itemId){
                    return state.users[i];
                 }
             }
            
            
    }
    
}
}