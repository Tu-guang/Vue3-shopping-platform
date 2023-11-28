<script setup>
import {ref, defineEmits, defineExpose} from 'vue'
import {footprintDelAPI} from '@/apis/footprint'
import {ElMessage, ElMessageBox} from 'element-plus'

defineProps({
  footprint: {
    type: Object,
    default: () => {
    }
  }
})

const emit = defineEmits(['reflush'])

const remove_goods = (footprint) => {
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
        footprintDelAPI(footprint.id).then((res) => {
          if (res.code === 200) {
            ElMessage({
              message: '删除足迹成功',
              type: 'success',
            })
            emit('reflush', footprint);
          }
        })
      })
      .catch(() => {
      })
}
</script>

<template>
  <RouterLink class="goods-item" to>
    <img v-img-lazy="footprint.picture" alt=""/>
    <p class="name ellipsis">{{ footprint.name }}</p>
    <p class="desc ellipsis">{{ footprint.desc }}</p>
    <p class="price">&yen;{{ footprint.price }}</p>
    <p class="time">时间：{{ footprint.createtime }}</p>
    <el-button type="primary" @click="remove_goods(footprint)">删除足迹</el-button>
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
