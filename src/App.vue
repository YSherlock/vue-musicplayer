<template>
  <div id="app">
    <m-header/>
    <tab />
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m_header/m-header'
import Tab from 'components/tab/tab'
export default {
  name: 'App',
  components:{
    MHeader,
    Tab
  }
}
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
