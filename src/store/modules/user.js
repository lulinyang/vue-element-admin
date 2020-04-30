import http from '@/http/server/api'
import VueCookies from 'vue-cookies'
const user = {
	getters: {
		access_token: state => { //例子， 可删
			return state.access_token;
		},
	},
	state: {
		access_token: VueCookies.get('access_token'),//例子， 可删
	},

	mutations: {
		setAccessToken: (state, access_token) => {//例子， 可删
			state.access_token = access_token
		},	
	},

	actions: {
		
		
	}
}

export default user