<template>
  <div class="north-shop-bottom flex flex-y-center flex-x-center">
      <div>
        <!-- <p>由XXXXXXXXX公司提供技术支持</p>
        <p class="copyright">版权所有</p> -->
				<p>技术支持：宁夏农鲜汇农业科技发展有限公司</p>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'north-footer',
    props: {

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

    }
  }
</script>

<style lang="scss">
  .north-shop-bottom {
    width: 100%;
    height: 135px;
    background: #121212;
    text-align: center;
    font-size: 12px;
    color: #fff;
    .copyright {
      padding-top: 18px;
      color: #999999;
    }
  }
</style>
