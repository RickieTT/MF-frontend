<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute,useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";

const router = useRouter();
const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  //如果不用await 的话 因为是异步的请求 会返回一堆axios对象
  const res = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  })
  console.log(res, '用户登录');
  if (res.code === 0 && res.data){
    Toast.success('登录成功');
    //replace是代表现在的用户界面会把之前的历史界面给替换掉 点击后退就不会再回到登录页面了
    // router.replace('/');
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;

  }else {
    Toast.fail('登录失败');
  }
};


</script>

<style scoped>

</style>