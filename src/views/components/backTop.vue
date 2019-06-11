<template>
  <div class="backTop">
    <div class="icon" @click="backTop" v-show="show"></div>
  </div>
</template>

<script>
  export default {
    name: 'back-top',
    props: {

    },
    data() {
      return {
				show: false
      }
    },
    created() {

    },
    mounted() {
			window.onscroll = ()=>{
				var top = document.documentElement.scrollTop || document.body.scrollTop;
				top > 0 ? this.show = true : this.show = false
			}
    },
    methods: {
      backTop() {
        document.getElementById('app').scrollIntoView()
      }
    }
  }
</script>

<style lang="scss">
	.backTop{
		.icon{
			width: 48px;
			height: 48px;
			border-radius:50%;
			cursor: pointer;
			position: fixed;
			bottom: 110px;
			right: 100px;
			background: rgba(0,0,0,0.15) url(../../../static/img/icon_backup.png) no-repeat center;
		}
	}
	.backTop:hover .icon{
		background: rgba(0,0,0,0.2) url(../../../static/img/icon_backup.png) no-repeat center;
	}
</style>
