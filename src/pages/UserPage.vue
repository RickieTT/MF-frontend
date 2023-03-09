<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username', '昵称' ,user.username)"/>
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell title="头像" is-link to="/user/edit">
      <img style="height: 48px" :src="user.avatarUrl">
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender', '性别' ,user.gender)" />
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话' ,user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" />
    <van-cell title="星球编号" :value="user.planetCode" />
    <van-cell title="注册时间" :value="user.createTime" />
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../service/user";

// const user = {
//     id: 1,
//     username: 'rickie_username',
//     userAccount: 'rickieadmin',
//     avatarUrl: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
//     gender: '男',
//     phone: '123112312',
//     email: '123456@qq.com',
//     planetCode: '1234',
//     createTime: new Date(),
// }

const user = ref();

//会在页面首次加载的时候执行
onMounted(async () => {
  user.value = await getCurrentUser();

})

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

</script>

<style scoped>

</style>