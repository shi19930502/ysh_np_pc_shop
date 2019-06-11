<template>
	<div id="feedback">
		<div class="navbar flex flex-y-center">意见反馈</div>
		<div class="main">
			<div class="title-text">欢迎向银川公益农产反馈</div>
			<div class="group">
				<strong>1.反馈标题</strong>
				<div class="sinput">
					<el-input size="small" placeholder="请输入内容"></el-input>
				</div>
			</div>
			<div class="group">
				<strong>2.反馈内容</strong>
				<div class="sinput">
					<el-input type="textarea" :rows="3" placeholder="请输入内容">
					</el-input>
				</div>
			</div>
			<div class="group">
				<strong>3.联系方式(推荐手机)</strong>
				<div class="sinput">
					<el-input size="small" placeholder="请输入内容"></el-input>
				</div>
			</div>
			<div class="sbtn">
				<shop-btn height="30px" bgcolor="#00C65D" border="1px #00C65D" color="#fff" fontsize="14px" text="提交"></shop-btn>
			</div>
		</div>
	</div>
</template>

<script>
	import ShopTop from '../../components/header.vue'
	import ShopFooter from '../../components/footer.vue'
	import btn from '../../components/shopbtn.vue'
	import {
		Input,
	} from 'element-ui'

	export default {
		components: {
			[ShopTop.name]: ShopTop,
			[ShopFooter.name]: ShopFooter,
			[btn.name]: btn,

			// element component
			[Input.name]: Input,

		},
		data() {
			return {

			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			handleClick(tab, event) {
			}
		}
	}
</script>

<style lang="scss">
	.main {
		.sbtn {
			margin-top: 60px;
			padding-left: 18px;
			.shopbtn {
				border-radius: 3px;
			}
		}
		.sinput {
			padding-left: 18px;
		}
		.title-text {
			color: #999;
		}
		.group {
			strong {
				display: block;
				font-size: 14px;
				margin-bottom: 20px;
				margin-top: 30px;
			}
		}
	}
</style>