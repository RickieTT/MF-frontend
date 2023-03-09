<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row style="padding: 0 16px; margin: 5px">
    <val-col v-for="tag in activeIds" style="margin: 5px">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </val-col>
  </van-row>

  <!--    <div class="tag-list">-->
  <!--      <van-tag v-for="tag in activeIds" closeable size="small" type="primary" @close="doClose(tag)">-->
  <!--        {{ tag }}-->
  <!--      </van-tag>-->
  <!--      <span class="tag-item" v-for="tag in activeIds" >-->
  <!--        {{ tag }}-->
  <!--        <span @click="doClose(tag)">X</span>-->
  <!--      </span>-->
  <!--    </div>-->

  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

  <div style="padding: 12px">
    <van-button type="primary" block @click="doSearchResult">搜索</van-button>
  </div>

</template>

<script setup>
import {ref} from 'vue';
import {Toast} from 'vant';
import {useRouter} from "vue-router";

const router = useRouter();


const searchText = ref('');

//原始标签列表
const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大2aaaaaa'},
      {text: '大3', id: '大3aaaaaaaaaa'},
      {text: '大4', id: '大4dddddaaaaaaaaaa'},
    ],
  },
];

//利用ref是变成了响应式数据 可以使用tagList.value
let tagList = ref(originTagList);

const onSearch = (val) => {
  // console.log(tagList.flatMap(parentTag => parentTag.children));
  tagList.value = originTagList.map(parentTag => {
    //因为要
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  })
};
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};

//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);


const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

/**
 * 执行搜索
 */
const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}

</script>

<style scoped>

.tag-list {
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;


}

.tag-item {
  margin: 5px;
  /*width: 15%;*/
  height: 20px;
  line-height: 20px;
  padding: 1px 5px;
  background-color: #646cff;
  border-radius: 5px;
  font-size: 14px;
}

</style>