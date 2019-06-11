<template>
	<div id="selectAddr">
		<div name='top' class="search_input">
			<input v-model='inputValue' @focus='inputFocus' class="input" type="text" name="keyword" id='keywordId' placeholder="输入关键字选取地点" />
			<div class="detaile_address_father">
				<div class="detaile_address" v-show='detaileAddress'>
					<span>所选地址为：{{detaileAddress}}</span>
					<p class="btn_span">
						<span @click='btnSpan'>确&nbsp;定</span>
					</p>
				</div>
			</div>
		</div>
		<div class="map" :style='mapStyle' id='container' ref='container'></div>
		<div name='bottom' class="addr_result" :style='addStyle' id="addrResult"></div>
	</div>
</template>

<script>
	var map, geolocation, toolBar, autocomplete, placeSearch;
	export default {
		data() {
			return {
				inputValue: '',
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
		created() {},
		mounted() {
			var vm = this
			map = new AMap.Map('container', {
				resizeEnable: true,
				zoom: 20,
				keyboardEnable: false
			});
			map.plugin('AMap.Geolocation', function() {
				geolocation = new AMap.Geolocation({
					enableHighAccuracy: true, //是否使用高精度定位，默认:true
					timeout: 10000, //超过10秒后停止定位，默认：无穷大
					buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
					zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
					buttonPosition: 'RB',
					useNative: true,
				});
				map.addControl(geolocation);
				geolocation.getCurrentPosition();
				AMap.event.addListener(geolocation, 'complete', vm.onComplete); //返回定位信息
				AMap.event.addListener(geolocation, 'error', vm.onError); //返回定位出错信息
			});
		},
		methods: {
			searchInput() {
				var vm = this
				this.$nextTick(() => {
					map.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
						var auto = new AMap.Autocomplete({
							input: 'keywordId',
							citylimit: true,
							city: vm.cityName
						});
						placeSearch = new AMap.PlaceSearch({
							map: map,
							pageSize: 5,
							pageIndex: 1,
							panel: "addrResult"
						}); //构造地点查询类
						AMap.event.addListener(auto, "select", vm.selectAddr); //注册监听，当选中某条记录时会触发
					})
				})
			},
			selectAddr(e) {
				var vm = this;
				placeSearch.setCity(e.poi.adcode);
				placeSearch.search(e.poi.name, function(state, result) {}); //关键字查询查询
				AMap.event.addListener(placeSearch, 'listElementClick', vm.placeSearchFun);
				AMap.event.addListener(placeSearch, 'markerClick', vm.placeSearchFun);
				this.$nextTick(() => {
					this.mapStyle = {
						height: '65%'
					}
					this.addStyle = {
						height: '35%'
					}
				})
			},
			placeSearchFun(e) {
				this.getAddr = e.data
				this.detaileAddress =
					e.data.name + '，' +
					e.data.address
			},
			btnSpan() {
				var vm = this;
				window.sessionStorage.setItem('jz_getAddrByMap', JSON.stringify(vm.getAddr))
				this.$router.replace({
					name: 'reg',
					query: {
						regStep: '2'
					}
				})
			},
			inputFocus() {

			},
			onComplete(data) {
				this.inputValue = ''
				this.cityName = data.addressComponent.city
				this.searchInput()
			},
			onError(data) {
				this.cityName = '全国'
				this.searchInput();
			},
		},
		beforeDestroy() {
			for (let a = 0; a < document.getElementsByClassName('amap-sug-result').length; a++) {
				document.getElementsByClassName('amap-sug-result')[a].setAttribute('style', "display:none")
			}
		},
	}
</script>

<style lang="scss">
	html,body,#app{
		height: 100%;
	}
	#selectAddr {
		width: 100%;
		height: 100%;

		.map {
			width: 100%;
			height: 100%;
			overflow: initial;
			position: relative;
		}

		.search_input {
			position: absolute;
			top: 50px;
			width: 300px;
			right: 5%;
			z-index: 999;

			.input {
				width: 100%;
				border: 1px solid #666666;
				height: 30px;
				border-radius: 5px;
				background-color: rgba(255, 255, 255, 1);
				text-indent: 10px;
				outline: none;
			}

			.detaile_address_father {
				position: absolute;
				right: 10px;
				width: 290px;
				top: 40px;

				.btn_span {
					margin-top: 10px;
					display: flex;
					justify-content: space-around;
					span {
						display: block;
						padding: 3px 5px;
						width: 80px;
						text-align: center;
						border: 1px solid #00A3FF;
						border-radius: 3px;
						position: relative;
						z-index: 9999;
						cursor: pointer;
					}
				}
			}

			.detaile_address {
				width: 100%;
				padding: 5px;
				color: #000000;
				background: rgba(255, 255, 255, 1);
				border-radius: 3px;
				border: 1px solid #666666;
			}
		}

		.addr_result {
			width: 100%;
			height: 100%;
			overflow: scroll;
			position: relative;
			background: #fff;
		}

		.poi-more {
			display: none !important;
		}
	}
</style>
