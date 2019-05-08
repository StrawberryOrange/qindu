<script>
import axios from "axios";
// import { URLSearchParams } from "url";
import qs from "qs";

const PATH = "http://140.143.24.96:5000/";

const fontSizeList = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
];
const pickerlistForFontSize = [
  { text: "12", value: "12" },
  { text: "14", value: "14" },
  { text: "16", value: "16" },
  { text: "18", value: "18" },
  { text: "20", value: "20" },
  { text: "22", value: "22" },
  { text: "24", value: "24" }
];
const pickerlistForTheme = [
  { text: "默认", value: "0" },
  { text: "护眼", value: "1" },
  { text: "夜间", value: "2" },
  { text: "纸质", value: "3" },
  { text: "自定义", value: "4" }
];
const themeList = [
  {
    id: 0,
    name: "默认",
    style: {
      body: {
        color: "#000",
        background: "#fff"
      }
    }
  },
  {
    id: 1,
    name: "护眼",
    style: {
      body: {
        color: "#000",
        background: "#ceeaba"
      }
    }
  },
  {
    id: 2,
    name: "夜间",
    style: {
      body: {
        color: "#999",
        background: "#000"
      }
    }
  },
  {
    id: 3,
    name: "纸质",
    style: {
      body: {
        color: "#000",
        background: "rgb(241, 236, 226)"
      }
    }
  },
  {
    id: 4,
    name: "自定义",
    style: {
      body: {
        color: "#000",
        background: "yellow"
      }
    }
  }
];
const booklist = [
  {
    name: "长生界",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: PATH + "8720238.epub"
  },
  {
    name: "每天懂一点好玩心理学",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: PATH + "8720272.epub"
  },
  {
    name: "FBI教你破解身体语言",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: PATH + "8720267.epub"
  },
  {
    name: "山楂树之恋2",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: PATH + "8720273.epub"
  },
  {
    name: "浮世绘",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: PATH + "8720241.epub"
  },
  {
    name: "百家讲坛20-水浒",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: PATH + "8720259.epub"
  },
  {
    name: "行为心理学",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: PATH + "8720276.epub"
  },
  {
    name: "卡耐基-口才学",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: "http://localhost/ebook/8720270.epub"
  },
  {
    name: "35岁以前成功的12条黄金法则",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: "http://localhost/ebook/8720257.epub"
  },
  {
    name: "石油战争",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: "http://localhost/ebook/8720252.epub"
  },
  {
    name: "百年孤独",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: "http://localhost/ebook/872060.epub"
  },
  {
    name: "山楂树之恋",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: "http://localhost/ebook/8720274.epub"
  },
  {
    name: "厚黑学",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: "http://localhost/ebook/8720244.epub"
  },
  {
    name: "中国经典营销案例大全和世界营销绝妙点子",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: "http://localhost/ebook/8720277.epub"
  },
  {
    name: "易中天品三国",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: "http://localhost/ebook/8720255.epub"
  },
  {
    name: "流血的仕途：李斯与秦帝国",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: "http://localhost/ebook/8720250.epub"
  },
  {
    name: "三国演义",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: "http://localhost/ebook/8720251.epub"
  },
  {
    name: "韩寒作品集",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: "http://localhost/ebook/8720242.epub"
  },
  {
    name: "水浒传",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: "http://localhost/ebook/8720275.epub"
  },
  {
    name: "红楼梦",
    img: "http://pic.baike.soso.com/p/20130614/20130614173630-2136726956.jpg",
    url: "http://localhost/ebook/8720243.epub"
  }
];

// 用户书单
var userBookList = [];
// 获取用户书单
var getUserBookList = () => userBookList;
// 用户登录态，false未登录，true已登陆，默认未登录
var islogin = false;
// 用户昵称
var username = "煜淞";
var setUserBookList = (method, index) => {
  if (method == "add") {
    if (-1 == userBookList.indexOf(booklist[index])) {
      userBookList.push(booklist[index]);
    } else console.log("已添加！");
    // console.log("inGlobal:" + userBookList);
  }
  if (method == "delete") {
    userBookList.splice(index, 1);
  }
};

/* 
全局loading
self.GLOBAL.loadingShow();
self.GLOBAL.loadingHide();
*/
var loadingId = null;
var loadingShow = function(options) {
  setTimeout(_ => {
    var vm = window.vm;
    loadingId = vm.$createToast({
      time: 0,
      txt: (options && options.message) || "数据加载中",
      mask: true
    });
    loadingId.show();
  });
};
var loadingHide = function() {
  if (loadingId) {
    loadingId.hide();
  }
};

/*
全局toast
使用方式：this.GLOBAL.toast({option})
入参option：对象
例如
this.GLOBAL.toast({
  type: 'correct',
  message: '测试内容',
  time:1500
});
type可选值：loading、correct、error、warn、txt
*/
var g_toast = null;
var toast = function(options) {
  setTimeout(() => {
    if (!g_toast) {
      var self = this;
      var vm = window.vm;
      g_toast = vm.$createToast({
        txt: (options && options.message) || "异常",
        type: (options && options.type) || "warn",
        time: (options && options.time) || 1200,
        mask: false
      });
      g_toast.show();
      setTimeout(_ => {
        g_toast = null;
      }, (options && options.time) || 2000);
    }
  });
};

/*
全局axios请求方法
使用方式this.GLOBAL.axios({
  method: 'GET'
  url:this.GLOBAL.AJAX_PATH + 'login'
})
self.$utils.caringRequest({
        method: 'POST',
        // url: self.$utils.getInterface('PATIENT_HISTORY'),
        url: self.$utils.getInterface('PATH') + 'patient/history',
        // headers: {
        //   'content-type': 'application/json'
        // },
        data: {
          id_card: self.id_card
        },
        success: function (res) {
          console.log(res)
          // self.visint = res.data.visint
          self.history_haveData = true
          if (res.code === 0) {
            self.history = res.data
            self.zyIndex = self.history.map(item => item.sn).indexOf(self.sn)
          } else {
            self.$utils.toast({
              type: 'error',
              message: '既往病史：' + res.message
            })
          }
        }
      })
*/
var myaxios = function(options) {
  var self = this;
  setTimeout(() => {
    var headers = {};
    for (var i in options.headers || {}) {
      headers[i] = options.headers[i];
    }
    // if (!options.withoutToken) {
    //   headers.Authorization = "Bearer " + '123123123123';
    // }
    // 开始发送请求
    // var self = this;
    var method = options.method || options.type || "GET";
    // if( method == "POST"){
    //   headers={
    //     'Content-Type' : "application/x-www-form-urlencoded"
    //   }
    // }
    var data = options.data || null;
    // if (method == "POST") {
    //   data = qs.stringify(data);
    // }
    // var data = new URLSearchParams();
    // for (var i in options.data || {}) {
    //   data.append(i, options.data[i]);
    // }

    var url = options.url || "";
    if (method === "GET" && data) {
      let index = 0;
      for (var key in data) {
        url += (index === 0 ? "?" : "&") + key + "=" + data[key];
        index++;
      }
    }
    console.log(url);
    axios({
      method: method,
      url: url,
      asyn: true,
      headers: headers,
      data: data
    })
      .then(function(res) {
        var successCallback = options.success || null;
        if (typeof successCallback === "function") {
          successCallback(res.data, res.headers);
        }
      })
      .catch(function(xhr) {
        // var code = (xhr && xhr.responseJSON && xhr.responseJSON.code) || -1;
        // if (code === 30006) {
        //   console.error("token失效");
        // }
        // else if (code === 30007) {
        // console.error("token过期");
        // 刷新token以后重试请求
        // self.refreshTokenEvent(function() {
        //   var retryCallback = self.caringRequest(options) || null;
        //   if (typeof retryCallback === "function") {
        //     retryCallback();
        //   }
        // });
        // }
        // else {
        //   // 其他网络连接性错误，计划采用toast.............................
        //   console.error(
        //     (xhr && xhr.responseJSON && xhr.responseJSON.message) ||
        //       "网络请求异常"
        //   );
        //   self.toast({
        //     message:
        //       (xhr && xhr.responseJSON && xhr.responseJSON.message) ||
        //       "工号异常或您无权限，请联系信息科！"
        //   });
        // }
      });
  }, Math.random() * 1000);
};

export default {
  fontSizeList,
  pickerlistForFontSize,
  themeList,
  pickerlistForTheme,
  booklist,
  username,
  getUserBookList,
  setUserBookList,
  loadingShow,
  loadingHide,
  toast,
  myaxios,
  islogin,
  PATH
};
</script>


