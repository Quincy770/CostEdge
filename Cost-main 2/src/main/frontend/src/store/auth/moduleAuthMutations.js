/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  
==========================================================================================*/


export default {
	UPDATE_AUTHENTICATED_USER(state, user) {
		localStorage.setItem('userInfo', JSON.stringify(user));
		localStorage.setItem('userRole', 'admin');
	},
	accessToken(){
		
	}
}