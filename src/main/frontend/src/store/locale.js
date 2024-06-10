export  default {
	namespaced: true,
    state:{
        locale: localStorage.getItem('locale') == null ? 'en' : localStorage.getItem('locale'),
    },
    mutations: {
        changeLocale(state,item){
            state.locale = item;
        }
    },
    actions: {      
     changeLocale({commit},item){
            commit('changeLocale',item)
        }
},
    getters: {   
         getLocale: state => {

          return state.locale;
             // for(let i=0;i<state.users.length;i++){
             //     if(state.users[i].userId==itemId){
             //        return state.users[i];
             //     }
             // }
            
            
    }
    
}
}