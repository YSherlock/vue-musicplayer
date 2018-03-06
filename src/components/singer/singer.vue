<template>
<div class="singer">
  <singerlist :data="singer"></singerlist>
</div>
</template>

<script>
import {
  getSinger
} from 'src/api/singer'
import singerlist from 'components/base/singerlist/singerlist'

const HOT_NAME = "热门"
const HOT_NUM = 10

export default {
  data() {
    return {
      singer: []
    }
  },
  components: {
    singerlist
  },
  created() {
    this.getSinger()
  },
  methods: {
    getSinger() {
      const data = getSinger();
      this.items = this.$http.get('/v8/fcg-bin/v8.fcg', {
          params: data,
          jsonp: 'jsonCallback',
          jsonpCallback: 'getSingerListCallback',
        })
        .then((res) => {
          this.singer = this.normalizeSinger(res.body.data.list)
        })
    },
    normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          item: []
        }
      }

      list.forEach((item, index) => {
        if (index < HOT_NUM) {
          map.hot.item.push({
            name: item.Fsinger_name,
            id: item.Fsinger_mid,
            url: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
          })
        }

        if (!map[item.Findex]) {
          map[item.Findex] = {
            title: item.Findex,
            item: []
          }
        }

        map[item.Findex].item.push({
          name: item.Fsinger_name,
          id: item.Fsinger_mid,
          url: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
        })
      })

      let hot = [];
      let ret = [];
      for (let key in map) {
        if (map[key].title.match(/[a-zA-Z]/)) {
          ret.push(map[key])
        }
        if (map[key].title == HOT_NAME) {
          hot.push(map[key])
        }
      }
      ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
