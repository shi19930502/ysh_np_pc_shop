<template>
	<el-dialog title="选择地址" :visible="modal" :close-on-click-modal="false" :before-close="beforeClose" class="thispagea">
		<div id="addressModal">
			<div id="container"></div>
			<div id="pickerBox">
				<input id="pickerInput" v-model="inputValue" placeholder="输入关键字选取地点" />
				<!-- <div id="poiInfo"></div> -->
			</div>
		</div>
	</el-dialog>
</template>
<script>
	import btn from '../components/shopbtn.vue'
	import mixin from '../../utils/mixin.js'

	import {
		Input,
		Select,
		Option,
		Dialog,
		Form,
		FormItem,
	} from 'element-ui'
	export default {
		name: 'address-modal',
		mixins: [mixin],
		components: {
			[btn.name]: btn,
			[Input.name]: Input,
			[Select.name]: Select,
			[Option.name]: Option,
			[Dialog.name]: Dialog,
			[Form.name]: Form,
			[FormItem.name]: FormItem,

		},
		props: {
			modal: {
				default: false
			},
			params: {
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {
				// 插件
				map: null,
				geolocation: null,
				toolBar: null,
				autocomplete: null,
				placeSearch: null,
				// 
				inputValue: '九洲',
				detaileAddress: '',
				cityName: '',
				getAddr: {},
				mapStyle: {
					height: '100%'
				},
				addStyle: {
					height: 0
				},
			}
		},
		created() {

		},
		mounted() {
			this.$nextTick(() => {
				this.map = new AMap.Map('container', {
					resizeEnable: true,
					zoom: 12,
					keyboardEnable: false
				});
				// 定位当前位置
				this.map.plugin('AMap.Geolocation', () => {
					this.geolocation = new AMap.Geolocation({
						//是否使用高精度定位，默认:true
						enableHighAccuracy: true,
						//超过10秒后停止定位，默认：无穷大
						timeout: 10000,
						//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
						buttonOffset: new AMap.Pixel(10, 20),
						//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
						zoomToAccuracy: true,
						buttonPosition: 'RB',
						useNative: true
					});
					this.map.addControl(this.geolocation);
					this.geolocation.getCurrentPosition();
					AMap.event.addListener(this.geolocation, 'complete', this.onComplete); //返回定位信息
					AMap.event.addListener(this.geolocation, 'error', this.onError); //返回定位出错信息
				})

			})
		},
		methods: {
			/**
			 * 关键字搜索
			 */
			searchByKeyWord() {
				// cons
				this.map.plugin('AMap.Autocomplete', () => {
					// 实例化Autocomplete
					var autoOptions = {
						input: 'pickerInput',
						city: this.cityName
					}
					var autoComplete = new AMap.Autocomplete(autoOptions);

					autoComplete.search(this.inputValue, function(status, result) {
						// 搜索成功时，result即是对应的匹配数据
					})
				})
			},
			close() {
				this.$emit('close')
			},
			beforeClose(done) {
				this.close()
				done()
			},
			onComplete(data) {
				this.cityName = data.addressComponent.city
				this.searchByKeyWord()
			},
			onError(data) {
				console.log(data)
			},
		}
	}
</script>
<style lang="scss">
	.thispagea {
		.el-dialog__body {
			padding: 0;
		}
	}

	#addressModal {
		width: 100%;
		height: 500px;
		position: relative;

		#container {
			width: 100%;
			height: 500px;
			margin: 0px;
			font-size: 13px;
		}

		#pickerBox {
			position: absolute;
			z-index: 9999;
			top: 50px;
			right: 30px;
			width: 300px;
		}

		#pickerInput {
			width: 200px;
			padding: 5px 5px;
		}

		#poiInfo {
			background: #fff;
		}

		.amap_lib_placeSearch .poibox.highlight {
			background-color: #CAE1FF;
		}

		.amap_lib_placeSearch .poi-more {
			display: none !important;
		}
	}
</style>
