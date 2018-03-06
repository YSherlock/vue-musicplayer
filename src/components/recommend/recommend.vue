<template>
<div class="recommend">
  <Scroll :data="discList" class="wrapper" ref="scroll">
    <div class="content">
      <div>
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- 这部分放你要渲染的那些内容 -->
          <swiper-slide v-for="item in items">
            <img :src="item.picUrl" class="index_img">
          </swiper-slide>
          <!-- 这是轮播的小圆点 -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="item in discList" class="item">
            <div class="icon">
              <img width="60" height="60" v-lazy="item.picUrl">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.songListAuthor"></h2>
              <p class="desc" v-html="item.songListDesc"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="loading-container" v-show="!this.discList.length">
      <loading></loading>
    </div>
  </Scroll>
</div>
</template>

<script>
import Scroll from 'components/base/scroll'
import 'swiper/dist/css/swiper.css'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'
import {
  getSlider
} from 'src/api/recommend'
import loading from 'components/base/loading/loading'


export default {
  components: {
    swiper,
    swiperSlide,
    Scroll,
    loading
  },
  data() {
    return {
      items: [],
      discList: [],
      swiperOption: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
        },
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        onSlideChangeEnd: swiper => {
          //这个位置放swiper的回调方法
          this.page = swiper.realIndex + 1;
          this.index = swiper.realIndex;
        },
      },
      swiperSlides: [1, 2, 3, 4, 5]
    }
  },

  created() {
    this.getRecommend()
  },
  mounted() {

  },
  //定义这个sweiper对象
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    getRecommend() {
      const data = getSlider();
      this.items = this.$http.get('/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
          params: data
        })
        .then((res) => {
          this.items = res.body.data.slider
          this.discList = res.body.data.songList
        })
    }
  }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .index_img
      width: 100%

    .wrapper
      overflow: hidden
      height: 100%

    .recommend
      position: fixed
      width: 100%
      top: 88px
      bottom: 0
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
        .loading-container
          position: absolute
          width: 100%
          top: 50%
          transform: translateY(-50%)
  </style>
