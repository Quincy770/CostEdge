export  default {
	namespaced: true,
    state:{
        inventoryItems:[],
        tempInventoryItem:[],
        accessToken:"",
        userId:""
    },
    mutations: {
        populateInventorym(state,item){
            state.inventoryItems=item;
        }
    },
    actions: {      
            populateInventory({commit},item){
            commit('populateInventorym',item)
        }
},
    getters: {   
         getInventory: state => itemId => {
             for(let i=0;i<state.inventoryItems.length;i++){
                 if(state.inventoryItems[i].inventoryId==itemId){
                    return state.inventoryItems[i];
                 }
             }
            
            
    },
    getInventoryItemPriceDetail: state => itemId => {
        
        // for(let i=0;i<state.inventoryItems.length;i++){
        //     if(state.inventoryItems[i].inventoryId==itemId){
        //         state.tempInventoryItem.inventoryItems[i];
        //         return state.tempInventoryItem[i];
        //     }
        // }
        return state.inventoryItems;
        
       
       
},
    
}
}