<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'

//触发获取导航列表的action，获取响应式接口数据
</script>

<template>
  <LayoutNav/>
  <LayoutHeader/>
  <RouterView/> <!--二级路由出口区域-->
  <LayoutFooter/>
</template>
