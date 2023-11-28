<script setup>
import { ref, defineEmits } from 'vue'
defineProps({
  likes: {
    type: Object,
    default: () => {
    }
  }
})

import {ElMessage,ElMessageBox} from 'element-plus'
import {favoritesDelAPI} from "@/apis/favorites";
const emit = defineEmits(['reflush'])
const remove_likes = (likes) => {
  ElMessageBox.confirm(
      '确认删除?',
      '删除',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        favoritesDelAPI(likes.id).then((res) => {
          if (res.code === 200) {
            ElMessage({
              message: '删除足迹成功',
              type: 'success',
            })
            emit('reflush', likes);
          }
        })
      })
      .catch(() => {
      })
}
</script>

<template>
  <RouterLink class="goods-item" to>
    <img v-img-lazy="likes.picture" alt=""/>
    <p class="name ellipsis">{{ likes.name }}</p>
    <p class="desc ellipsis">{{ likes.desc }}</p>
    <p class="price">&yen;{{ likes.price }}</p>
    <p class="time">时间：{{ likes.createtime }}</p>
    <el-button type="primary" @click="remove_likes(likes)">移出收藏夹</el-button>
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
