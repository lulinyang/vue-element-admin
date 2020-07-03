<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <!-- <v-tags></v-tags> -->
      <tags-view></tags-view>
      <div class="content">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
import TagsView from './TagsView.vue';;
export default {
  data () {
    return {
      tagsList: [],
      collapse: false
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags,
    TagsView
  },
  created () {
    bus.$on('collapse-content', msg => {
      this.collapse = msg;
    });
  }
};
</script>
<style>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.5s;
}

.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
