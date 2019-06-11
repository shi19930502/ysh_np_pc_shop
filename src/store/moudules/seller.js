// initial state
const state = {
	sellerId: '', // 供应商id
	sellerName: '', // 供应商名称
	storeName : '',
	productList:[]
}

// getters
const getters = {
	selecedSellerInfo: state => { // 选择的供应商
		return {
			sellerId: state.sellerId,
			sellerName: state.sellerName,
			storeName: state.storeName
		}
	},
	productList: state => state.productList
}

// actions
const actions = {
	setSelecedSeller_AC({
		commit
	}, sellerInfo) {
		commit('setSelecedSeller_MU', sellerInfo)
	},
	setProductList_AC({
		commit
	}, productList) {
		commit('setProductList_MU', productList)
	}
}

// mutations
const mutations = {
	setSelecedSeller_MU(state, sellerInfo) {
		state.sellerId = sellerInfo.sellerId
		state.sellerName = sellerInfo.sellerName
	},
	setProductList_MU(state, productList) {
		state.productList = productList
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}