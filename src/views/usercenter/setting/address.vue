<template>
	<div>
		<div class="navbar flex flex-y-center">收货地址</div>
		<div class="main">
			<div class="address-wrap">
				<div class="no flex flex-x-center flex-y-center" v-if="AddressList.length==0">
					<div>
						<img src="../../../../static/img/noaddress.png" />
						<p>当前暂无收货地址</p>
						<div class="flex flex-x-center">
							<shop-btn @click.native="open('','add')" text="添加收货地址" width="114px" height="30px" bgcolor="#F0F9E9" border="1px #00C65D" fontsize="14px" marginR="0"></shop-btn>
						</div>
					</div>
				</div>
				<div class="address-list" v-else v-for="d in AddressList">
					<p>您当前收货地址</p>
					<div class="item">
						<strong>{{d.contacts}}</strong>
						<div class="item-group flex" style="margin-top: 15px;">
							<div>收货人：</div>
							<div>{{d.contacts}}</div>
						</div>
						<div class="item-group flex">
							<div>收货地址：</div>
							<div :style="{width: '88%'}">{{d.completeAddress}}</div>
						</div>
						<div class="item-group flex">
							<div>联系电话：</div>
							<div>{{d.phoneNumber}}</div>
						</div>
						<div class="flex flex-x-end btns">
							<span class="click-a" @click="open(d,'edit')">编辑</span>
							<!--<span>删除</span>-->
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--编辑新增地址-->
		<address-modal v-if="modalShow" :modal="modalShow" @close="modalClose" :params="modalParams" @updateAdd="updateAdd"></address-modal>
	</div>
</template>
<script>
	import ShopTop from '../../components/header.vue'
	import ShopFooter from '../../components/footer.vue'
	import btn from '../../components/shopbtn.vue'
	import addressModal from './addressModal.vue'
	import {
		Tabs,
		TabPane,
		Input,
		Dialog
	} from 'element-ui'
	import mixin from '../../../utils/mixin.js'

	export default {
		mixins: [mixin],
		components: {
			[ShopTop.name]: ShopTop,
			[ShopFooter.name]: ShopFooter,
			[btn.name]: btn,
			[addressModal.name]: addressModal,

			// element component
			[Tabs.name]: Tabs,
			[TabPane.name]: TabPane,
			[Input.name]: Input,
			[Dialog.name]: Dialog,
		},
		data() {
			return {
				activeName: "0",
				dialogTableVisible: false,
				form:{}
			}
		},
		created() {
			this.getAddress()
		},
		mounted() {

		},
		methods: {
			handleClick(tab, event) {
			},
			updateAdd() {
				this.getAddress()
			},
			open(d,type) {
				this.modalEdit({
					type: type,
					param: d,
				})
			},
			getForm(){
				return this.form
			}
		}
	}
</script>
<style lang="scss">
	.address-wrap {
		.no {
			width: 1080px;
			height: 584px;
			text-align: center;
			p {
				color: #999;
				padding: 24px 0 30px;
			}
		}
		.address-list {
			p {
				color: #999;
				margin-bottom: 20px;
			}
			.item {
				padding: 20px;
				min-height: 110px;
				width: 998px;
				border: 1px solid #E6E6E6;
				strong {
					margin-left: 0;
				}
				.btns {
					span {
						margin-left: 30px;
						color: #3B58B6;
						cursor: pointer;
					}
				}
				.item-group {
					color: #666;
					margin-bottom: 5px;
					div:first-child {
						width: 60px;
						text-align: right;
						color: #999;
					}
				}
			}
		}
	}
</style>