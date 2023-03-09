<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="editUser.currentValue"
        :name="editUser.editKey"
        :label="editUser.editName"
        placeholder="'请输入'${editUser.editName}"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../service/user";


const router = useRouter();
const route = useRoute();

const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
})

const currentUser= getCurrentUser();


const onSubmit = async () => {
  if (!currentUser){
    Toast.fail('用户未登录');
    return;
  }
  
  const res = await myAxios.post('/user/update',{
    'id': currentUser.id,
    //这里报错不影响 用[]包起来是说明这是个变量 这样可以动态生成键 这里用as string
    [editUser.value.editKey as string]: editUser.value.currentValue,

  })
  if (res.code === 0 && res.data > 0){
    Toast.success('修改成功');
    //返回之前页面 当然也可以保留 但是保留的话要记得把表单项给清空
    router.back();
  }else {
    Toast.fail('修改错误');
  }
  // todo 把editKey editName currentValue提交到后台

}

</script>

<style scoped>

</style>