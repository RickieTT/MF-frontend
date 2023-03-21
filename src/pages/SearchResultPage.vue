<template>
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title=" `${user.username} （${user.planetCode}）`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  <van-empty v-if="! userList || userList.length < 1" description="搜索结果为空" />

</template>

<script setup>
import {onMounted, ref} from 'vue';
import {Toast} from 'vant';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
//一个查询字符串的解析器 (query string)
//e.g. a=1&b=2
//{
//  a:1, b:2
// }
import qs from 'qs';


const route = useRoute();
const { tags } = route.query;
const userList = ref([]);

onMounted(async() => {
  //await 会将后面的代码全部执行完再装载到userList中
  const userListData = await myAxios.get('/user/search/tags', {
    //发送请求参数
    params: {
      tagNameList: tags
    },
    paramsSerializer: {
      serialize: function (params) {
        return qs.stringify(params, {indices: false})
      }
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        Toast.success('请求成功');
        console.log(response.data);
        return response?.data;
      })
      .catch(function (error) {
        console.error('/user/search/tags error',error);
        Toast.fail('请求失败');
      })
  if (userListData){
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
        })
    userList.value = userListData;
  }
})


// const mockUser = {
//   id: 12345,
//   username: 'rickie',
//   userAccount: '12314',
//   profile: '一名正在前进路上的求知者 为春招做准备 我得加油加油再加油 努力努力再努力',
//   // avatarUrl: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
//   avatarUrl: 'http://www.koudai8.com/image/rm/10.gif',
//   gender: 0,
//   phone: '13113113111',
//   email: '123123123@qq.com',
//   userRole: 0,
//   planetCode: '1234',
//   tags: ['java','fighting','working','chasing','努力奋斗'],
//   createTime: new Date(),
// }

</script>

<style scoped>

</style>