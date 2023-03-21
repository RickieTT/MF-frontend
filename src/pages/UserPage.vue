<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />

  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
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

const toEdit = (id: number, editKey: string, editName: string, currentValue: string) => {
  router.push({
    // path: '/user/edit',
    // query: {
    //   id,
    //   editKey,
    //   editName,
    //   currentValue,
    // }
    name: 'userEdit',
    state: {
      id: id,
      editKey: editKey,
      editName: editName,
      currentValue: currentValue
    }
  })
}

</script>

<style scoped>

</style>
