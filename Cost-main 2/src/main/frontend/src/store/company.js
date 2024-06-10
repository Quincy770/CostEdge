export  default {
	namespaced: true,
    state:{
        company:[]
    },
    mutations: {
        populateCompany(state,item){
            state.company=item;
        }
    },
    actions: {      
            populateCompany({commit},item){
            commit('populateCompany',item)
        }
},
    getters: {   
         getCompany: state => itemId => {
             for(let i=0;i<state.company.length;i++){
                 if(state.company[i].companyId==itemId){
                    return state.company[i];
                 }
             }
            
            
    },
}
}