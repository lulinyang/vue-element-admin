export default {
  install: function (Vue, opt) {
    //删除字符串的头尾空格
    Vue.prototype.myTrim = function (item) {
        return item.replace(/^\s+|\s+$/gm, '');
      },
      /*对象(删除字符串的头尾空格)*/
      Vue.prototype.myTrimObj = function (object) {
        if (Object.prototype.toString.call(object) === '[object Array]') {
          object.forEach((item) => {
            if (item && Object.prototype.toString.call(item) == "[object String]") {
              item = this.myTrim(item);
            } else {
              this.myTrimObj(item)
            }
          })
        } else if (Object.prototype.toString.call(object) === '[object Object]') {
          let keys = Object.keys(object).sort();
          for (let i in keys) {
            if (object[keys[i]] && Object.prototype.toString.call(object[keys[i]]) == "[object String]") {
              object[keys[i]] = this.myTrim(object[keys[i]]);
            } else {
              this.myTrimObj(object[keys[i]])
            }
          }
        }
      }
    //报错提示
    Vue.prototype.notify = function (params) {
      let msg = params.msg || '喝口水吧，让数据飞一会，请稍后再试';
      let title = params.title || '温馨提示';
      if (params.type == 'success') {
        msg = params.msg || '保存成功';
        title = params.title || '成功';
        // this.$notify.success({
        //   dangerouslyUseHTMLString: true,
        //   title: `${title}`,
        //   message: `${msg}`
        // });
        this.$message.success(msg);
      } else {
        // this.$notify({
        //   dangerouslyUseHTMLString: true,
        //   title: `${title}`,
        //   message: `${msg}`
        // });
        this.$message.error(msg);
      }
    }
    //返回上一级
    Vue.prototype.goback = function () {
      this.$store.dispatch('delVisitedViews', this.$route);
    }
    //是否拥有权限
    Vue.prototype.getHasRule = function (val) {
      const moduleRule = 'admin'
      let userInfo = Lockr.get('userInfo')
      if (userInfo.id == 1) {
        return true
      } else {
        let authList = moduleRule + Lockr.get('authList')
        console.log(authList);
        return;
        return _.includes(authList, val)
      }
    }

    /**
     * 拆分数组
     */
    Vue.prototype.groupArray = (array, subGroupLength) => {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
      }
      return newArray;
    }
  }
}