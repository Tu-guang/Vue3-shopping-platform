<script setup>
defineProps({
  goods: {
    type: Object,
    default: () => {
    }
  }
})
import {ElMessage} from 'element-plus'

const open1 = () => {
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}
</script>

<template>
  <RouterLink class="goods-item" to>
    <img v-img-lazy="goods.picture" alt=""/>
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
    <p class="time">时间：{{ goods.time }}</p>
    <el-button type="primary" @click="open1">移出收藏夹</el-button>
  </RouterLink>
</template>

<style lang="scss">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  transition: all .5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {
    width: 160px;
    height: 160px;
  }

  p {
    padding-top: 10px;
  }

  .name {
    font-size: 16px;
  }

  .desc {
    color: #999;
    height: 29px;
  }

  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>
