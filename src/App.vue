<template>
  <div id="app">
    <!-- <virtual-list
      :size="80"
      :remain="8"
      :items="items"
      :variable="true"
    >
      <Item 
        slot-scope="{item}" 
        :item="item"/>
    </virtual-list> -->
  <!-- <vl :data="items"></vl> -->
  <b-virtual-list 
    ref="menu" 
    :map="currentMap"
    ></b-virtual-list>
  </div>
</template>
<script>
// import VirtualList from './components/virtual-list';
import BVirtualList from './components/b-vurtual-list';
import vl from './components/vl';
import Item from './components/item';
import Enum from './enum'
import Mock from 'mockjs'
let items = [];
for(let i = 0 ; i<100 ; i++){
  items.push({id:i,value:i});
}
const MockTemplate = {'Selected|100':[{id:'@zip',name:'@cname'}]} 
export default {
  name: 'App',
  data(){
        const {Selected}=Mock.mock(MockTemplate)
    return {
      items,
      currentMap:Enum.from(Selected).MAP
      }
  },
  components:{
    // VirtualList,
    BVirtualList,
    // Item,
    vl
  }
}
</script>
<style lang="stylus">
*{
  margin 0; 
  padding:0;
  box-sizing: border-box;
}
</style>
