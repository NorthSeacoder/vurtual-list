<template>
     <div 
    class="list-view" 
    :style="{height: listHeight}"
    @scroll="handleScroll">
    <div
      class="scrollBar"       
      :style="{
         height: contentHeight
      }">
    </div>
    <div
      ref="content"
      class="list-view-content">
      <ul ref="list" style="padding: 10px 0">
        <li
            v-for="(item, index) in visibleData"
            :key="index"
            :style="{
          height: itemHeight + 'px'
        }"
            >
            <span>{{ item.value}}</span>
        </li>
        </ul>
      <!-- <div
        class="list-view-item"
        :style="{
          height: itemHeight + 'px'
        }"
        :key="key"
        v-for="(item,key) in visibleData">
        {{ item.value }}
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
    name: 'ListView',

    props: {
        data: {
            type: Array,
            required: true
        },

        itemHeight: {
            type: Number,
            default: 30
        }
    },
    computed: {
        contentHeight() {
            return this.data.length * this.itemHeight + 'px';
        },
        listHeight() {
            const vm = this;
            const {itemHeight} = vm;
            return `${8 * itemHeight}px`;
        }
    },

    mounted() {
        this.updateVisibleData();
    },

    data() {
        return {
            visibleData: []
        };
    },


    methods: {
        updateVisibleData(scrollTop) {
            scrollTop = scrollTop || 0;
            const visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight);
            const start = Math.floor(scrollTop / this.itemHeight);
            const end = start + visibleCount;
            console.log({start, end, scrollTop})
            this.visibleData = this.data.slice(start, end);
            this.$refs.content.style.webkitTransform = `translate3d(0, ${start * this.itemHeight}px, 0)`;
        },

        handleScroll() {
            const scrollTop = this.$el.scrollTop;
            this.updateVisibleData(scrollTop);
        }
    }
}
</script>

<style lang="scss" scoped>
.list-view {
    height: 400px;
    overflow: auto;
    position: relative;
    border: 1px solid #aaa;
    padding: 10px 0;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .2);
    box-sizing: border-box;
    overflow-y: auto;
}

.scrollBar {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}

.list-view-content {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        height: 30px;
        min-width: 256px;
        background-color: white;
        padding: 0 10px;
        cursor: pointer;
        white-space: pre;
    }

}

.list-view-item {
    padding: 5px;
    color: #666;
    line-height: 30px;
    box-sizing: border-box;
}

</style>