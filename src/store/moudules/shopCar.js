// initial state
const state = {
	shippingcarCount: 0, // 购物车商品数量
}

// getters
const getters = {
	shippingcarCount: state => state.shippingcarCount
}

// actions
const actions = {
	getCount_AC({
		commit
	}, count) {
		commit('getCount_MU', count)
	}
}

// mutations
const mutations = {
	getCount_MU(state, count) {
		state.shippingcarCount = count
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}