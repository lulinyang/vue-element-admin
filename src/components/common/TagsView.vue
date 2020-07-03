<template>
  <div class="tags-view-container">
    <scroll-pane class="tags-view-wrapper" ref="scrollPane">
      <router-link ref="tag" :class="isActive(tag)?'active':''" :to="tag" class="tags-view-item" @contextmenu.prevent.native="openMenu(tag,$event)" v-for="tag in Array.from(visitedViews)" :key="tag.path">
        {{tag.name}}
        <span class="el-icon-close" v-if="tag.name != '首页' && tag.name !=='系统首页'" @click.prevent.stop='closeSelectedTag(tag)'></span>
      </router-link>
    </scroll-pane>
    <el-dropdown class="contextmenu_aa" trigger="click" @command="handleCommand">
      <span class="close_tag">
        关闭标签
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown" style="margin-top:0">
        <el-dropdown-item divided command="closeOthersTags">关闭其他</el-dropdown-item>
        <el-dropdown-item divided command="closeAllTags">关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul> -->
  </div>
</template>
 
<script>
import ScrollPane from './ScrollPane'
export default {
  name: "tags-view",
  components: { ScrollPane },
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  computed: {
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route (val) {
      console.log('val', val);
      this.selectedTag = val;
      this.addViewTags()
      // this.moveToCurrentTag()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted () {
    this.addViewTags()
  },
  methods: {
    handleCommand (command) {
      if (command == 'closeOthersTags') {
        this.closeOthersTags();
      } else if (command == 'closeAllTags') {
        this.closeAllTags();
      }
    },
    generateRoute () {
      console.log('this.$route.name', this.$route);
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive (route) {
      return route.path === this.$route.path
    },
    addViewTags () {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    moveToCurrentTag () {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
            break
          }
        }
      })
    },
    closeSelectedTag (view) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags () {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags () {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    },
    openMenu (tag, e) {
      console.log('sss', tag);
      this.visible = true
      this.selectedTag = tag
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      this.left = e.clientX - offsetLeft + 15 // 15: margin right
      this.top = e.clientY
    },
    closeMenu () {
      this.visible = false
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
    position: relative;
    .contextmenu_aa {
        position: absolute;
        background-color: #409eff;
        color: #fff;
        right: 0px;
        padding: 0px 5px;
        top: 0;
        font-size: 13px;
        .close_tag {
            line-height: 34px;
            cursor: pointer;
        }
    }
    .tags-view-wrapper {
        background: #fff;
        height: 34px;
        border-bottom: 1px solid #d8dce5;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
        .tags-view-item {
            display: inline-block;
            position: relative;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8dce5;
            color: #495060;
            background: #fff;
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 4px;
            &:first-of-type {
                margin-left: 15px;
            }
            &.active {
                background-color: #409eff;
                color: #fff;
                border-color: #409eff;
                &::before {
                    content: '';
                    background: #fff;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }
        }
    }
    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 100;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }
}
</style>
 
<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
    .tags-view-item {
        .el-icon-close {
            width: 16px;
            height: 16px;
            vertical-align: 2px;
            border-radius: 50%;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;
            &:before {
                transform: scale(0.6);
                display: inline-block;
                vertical-align: -3px;
            }
            &:hover {
                background-color: #b4bccc;
                color: #fff;
            }
        }
    }
}
</style>
