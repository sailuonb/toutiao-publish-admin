(function(e){function t(t){for(var n,o,l=t[0],r=t[1],c=t[2],d=0,m=[];d<l.length;d++)o=l[d],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&m.push(i[o][0]),i[o]=0;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);u&&u(t);while(m.length)m.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],n=!0,l=1;l<a.length;l++){var r=a[l];0!==i[r]&&(n=!1)}n&&(s.splice(t--,1),e=o(o.s=a[0]))}return e}var n={},i={app:0},s=[];function o(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=n,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(a,n,function(t){return e[t]}.bind(null,n));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],r=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=r;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"1b25":function(e,t,a){},"41ef":function(e,t,a){},"455a":function(e,t,a){},"47b2":function(e,t,a){"use strict";a("943c")},5012:function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},s=[],o={name:"App"},l=o,r=a("2877"),c=Object(r["a"])(l,i,s,!1,null,null,null),u=c.exports,d=a("8c4f"),m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login-container"},[a("div",{staticClass:"login_logo"}),a("el-form",{ref:"login-form",staticClass:"login-form",attrs:{model:e.user,rules:e.formRules}},[a("el-form-item",{attrs:{prop:"mobile"}},[a("el-input",{attrs:{placeholder:"请输入手机号"},model:{value:e.user.mobile,callback:function(t){e.$set(e.user,"mobile",t)},expression:"user.mobile"}})],1),a("el-form-item",{attrs:{prop:"code"}},[a("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:e.user.code,callback:function(t){e.$set(e.user,"code",t)},expression:"user.code"}})],1),a("el-form-item",{attrs:{prop:"agree"}},[a("el-checkbox",{model:{value:e.user.agree,callback:function(t){e.$set(e.user,"agree",t)},expression:"user.agree"}},[e._v("我已阅读并同意协议")])],1),a("el-form-item",[a("el-button",{staticClass:"login-button",attrs:{type:"primary",loading:e.isLoading},on:{click:e.onLogin}},[e._v("登录")])],1)],1)],1)},p=[],f=(a("d3b7"),a("bc3a")),g=a.n(f),h=a("d604"),v=a.n(h),b=g.a.create({baseURL:"http://api-toutiao-web.itheima.net",transformResponse:[function(e){try{return v.a.parse(e)}catch(t){return console.log("转换失败",t),e}}]});b.interceptors.request.use((function(e){var t=JSON.parse(window.localStorage.getItem("user"));return t&&(e.headers.Authorization="Bearer ".concat(t.token)),e}),(function(e){return Promise.reject(e)})),b.interceptors.response.use((function(e){return e}),(function(e){e.response&&401===e.response.status&&(window.localStorage.removeItem("user"),Ze.push("/login"))}));var _=b,C=function(e){return _({method:"POST",url:"/mp/v1_0/authorizations",data:e})},w=function(){return _({method:"GET",url:"/mp/v1_0/user/profile"})},y=function(e){return _({method:"PATCH",url:"/mp/v1_0/user/photo",data:e})},x=function(e){return _({method:"PATCH",url:"/mp/v1_0/user/profile",data:e})},I={name:"Login",data:function(){return{user:{mobile:"13911111111",code:"246810",agree:!1},isLoading:!1,formRules:{mobile:[{required:!0,message:"手机号码不能为空",trigger:"change"},{pattern:/^1[3|5|7|8|9]\d{9}$/,message:"请输入正确的手机号格式",trigger:"change"}],code:[{required:!0,message:"验证码不能为空",trigger:"change"}],agree:[{validator:function(e,t,a){t?a():a(new Error("请同意用户协议"))}}]}}},methods:{onLogin:function(){var e=this;this.$refs["login-form"].validate((function(t){t&&e.login()}))},login:function(){var e=this;this.isLoading=!0,C(this.user).then((function(t){e.$message({message:"登陆成功",type:"success"}),window.localStorage.setItem("user",JSON.stringify(t.data.data)),e.$router.push({name:"home"}),e.isLoading=!1})).catch((function(t){console.log(t),e.$message.error("用户名或密码错误"),e.isLoading=!1}))}}},$=I,S=(a("6eca"),Object(r["a"])($,m,p,!1,null,null,null)),k=S.exports,z=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},L=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home-container"},[n("img",{attrs:{src:a("7388")}})])}],O={name:"HomeIndex"},E=O,j=(a("958c"),Object(r["a"])(E,z,L,!1,null,null,null)),T=j.exports,P=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{staticClass:"layout-container"},[a("el-aside",{staticClass:"aside",attrs:{width:"auto"}},[a("app-aside",{staticClass:"aside-menu",attrs:{"is-collapse":e.isCollapse}})],1),a("el-container",[a("el-header",{staticClass:"header"},[a("div",[a("i",{class:{"el-icon-s-fold":!e.isCollapse,"el-icon-s-unfold":e.isCollapse},on:{click:function(t){e.isCollapse=!e.isCollapse}}}),a("span",[e._v("仿今日头条后台管理系统")])]),a("el-dropdown",[a("div",{staticClass:"avatar-wrap"},[a("img",{staticClass:"avatar",attrs:{src:e.user.photo}}),a("span",[e._v(e._s(e.user.name))]),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{nativeOn:{click:function(t){return e.onSetting.apply(null,arguments)}}},[e._v("账号设置")]),a("el-dropdown-item",{nativeOn:{click:function(t){return e.onLogout.apply(null,arguments)}}},[e._v("退出登录")])],1)],1)],1),a("el-main",{staticClass:"main"},[a("router-view")],1)],1)],1)},U=[],A=(a("b0c0"),new n["default"]),q=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":e.$route.path,"background-color":"#002033","text-color":"#fff","active-text-color":"#ffd04b",router:"",collapse:e.isCollapse}},[a("el-menu-item",{attrs:{index:"/"}},[a("i",{staticClass:"el-icon-s-home"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("首页")])]),a("el-menu-item",{attrs:{index:"/article"}},[a("i",{staticClass:"el-icon-document"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("内容管理")])]),a("el-menu-item",{attrs:{index:"/images"}},[a("i",{staticClass:"el-icon-picture"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("素材管理")])]),a("el-menu-item",{attrs:{index:"/publish"}},[a("i",{staticClass:"el-icon-collection"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("发布文章")])]),a("el-menu-item",{attrs:{index:"/comment"}},[a("i",{staticClass:"el-icon-chat-dot-square"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("评论管理")])]),a("el-menu-item",{attrs:{index:"/fans"}},[a("i",{staticClass:"el-icon-view"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("粉丝管理")])]),a("el-menu-item",{attrs:{index:"/setting"}},[a("i",{staticClass:"el-icon-s-custom"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("个人设置")])])],1)},D=[],N={name:"AppAside",props:["is-collapse"]},F=N,R=Object(r["a"])(F,q,D,!1,null,null,null),V=R.exports,B={name:"LayoutIndex",data:function(){return{user:{},isCollapse:!1}},components:{AppAside:V},created:function(){var e=this;this.loadProfile(),A.$on("userfile",(function(t){e.user.name=t.name,e.user.photo=t.photo}))},methods:{loadProfile:function(){var e=this;w().then((function(t){e.user=t.data.data}))},onSetting:function(){this.$router.push("/setting")},onLogout:function(){var e=this;this.$confirm("是否退出当前账号","退出提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){window.localStorage.removeItem("user"),e.$router.push("/login")})).catch((function(){e.$message({type:"info",message:"已取消"})}))}}},M=B,G=(a("d1df"),Object(r["a"])(M,P,U,!1,null,null,null)),H=G.exports,J=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"article-container"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:"/"}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("内容管理")])],1)],1),a("el-form",{ref:"form",attrs:{"label-width":"40px",size:"small"}},[a("el-form-item",{attrs:{label:"状态"}},[a("el-radio-group",{model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[a("el-radio",{attrs:{label:null}},[e._v("全部")]),a("el-radio",{attrs:{label:0}},[e._v("草稿")]),a("el-radio",{attrs:{label:1}},[e._v("待审核")]),a("el-radio",{attrs:{label:2}},[e._v("审核通过")]),a("el-radio",{attrs:{label:3}},[e._v("审核失败")]),a("el-radio",{attrs:{label:4}},[e._v("已删除")])],1)],1),a("el-form-item",{attrs:{label:"频道"}},[a("el-select",{attrs:{placeholder:"请选择频道"},model:{value:e.channelId,callback:function(t){e.channelId=t},expression:"channelId"}},[a("el-option",{attrs:{label:"全部",value:null}}),e._l(e.channels,(function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})}))],2)],1),a("el-form-item",{attrs:{label:"日期"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:e.rangeDate,callback:function(t){e.rangeDate=t},expression:"rangeDate"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",disabled:e.loading},on:{click:function(t){return e.loadArticles(1)}}},[e._v("查询")])],1)],1)],1),a("el-card",{staticClass:"filter-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("共检索到"+e._s(e.totalCount)+"条数据")])]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"list-table",staticStyle:{width:"100%"},attrs:{data:e.articles,stripe:"",size:"small"}},[a("el-table-column",{attrs:{label:"封面"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.row.cover.images[0],fit:"cover",lazy:""}},[a("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[e._v(" 加载中"),a("span",{staticClass:"dot"},[e._v("...")])])])]}}])}),a("el-table-column",{attrs:{prop:"title",label:"标题"}}),a("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:e.articlesStatus[t.row.status].type}},[e._v(e._s(e.articlesStatus[t.row.status].text))])]}}])}),a("el-table-column",{attrs:{prop:"pubdate",label:"发布时间"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:""},on:{click:function(a){e.$router.push("/publish?id="+t.row.id.toString())}}}),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(a){return e.ondeleteArticle(t.row.id)}}})]}}])})],1),a("el-pagination",{attrs:{layout:"prev, pager, next",background:"",total:e.totalCount,"page-sizes":e.pageSize,disabled:e.loading},on:{"current-change":e.onCurrentChange}})],1)],1)},K=[],Q=function(e){return _({method:"GET",url:"/mp/v1_0/articles",params:e})},X=function(){return _({method:"GET",url:"/mp/v1_0/channels"})},W=function(e){return _({method:"DELETE",url:"/mp/v1_0/articles/".concat(e)})},Y=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return _({method:"POST",url:"/mp/v1_0/articles",params:{draft:t},data:e})},Z=function(e){return _({method:"GET",url:"/mp/v1_0/articles/".concat(e)})},ee=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return _({method:"PUT",url:"/mp/v1_0/articles/".concat(e),params:{draft:a},data:t})},te=function(e,t){return _({method:"PUT",url:"/mp/v1_0/comments/status",params:{article_id:e},data:{allow_comment:t}})},ae={name:"Article",data:function(){return{articles:[],totalCount:0,pageSize:[10],status:null,channels:[],channelId:null,rangeDate:null,loading:!0,pageId:1,articlesStatus:[{status:0,text:"草稿",type:"info"},{status:1,text:"待审核",type:""},{status:2,text:"审核通过",type:"success"},{status:3,text:"审核失败",type:"warning"},{status:4,text:"已删除",type:"danger"}]}},created:function(){this.loadArticles(1),this.loadChannels()},methods:{loadArticles:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.loading=!0,Q({page:t,per_page:this.pageSize[0],status:this.status,channel_id:this.channelId,begin_pubdate:this.rangeDate?this.rangeDate[0]:null,end_pubdate:this.rangeDate?this.rangeDate[1]:null}).then((function(t){var a=t.data.data,n=a.results,i=a.total_count;e.articles=n,e.totalCount=i,e.loading=!1}))},loadChannels:function(){var e=this;X().then((function(t){e.channels=t.data.data.channels}))},ondeleteArticle:function(e){var t=this;this.$confirm("是否删除当前文章","删除提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){W(e).then((function(e){t.onCurrentChange(t.pageId)}))})).catch((function(){t.$message({type:"info",message:"已取消"})}))},onCurrentChange:function(e){this.loadArticles(e),this.pageId=e}}},ne=ae,ie=(a("47b2"),Object(r["a"])(ne,J,K,!1,null,null,null)),se=ie.exports,oe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"publish-container"},[a("el-card",{staticClass:"box-card"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:"/"}},[e._v("首页")]),a("el-breadcrumb-item",[e._v(e._s(e.$route.query.id?"修改文章":"发布文章"))])],1)],1),a("el-card",{staticClass:"box-card"},[a("el-form",{ref:"rules-form",attrs:{model:e.article,"label-width":"60px",rules:e.rulesForm}},[a("el-form-item",{attrs:{label:"标题",prop:"title"}},[a("el-input",{model:{value:e.article.title,callback:function(t){e.$set(e.article,"title",t)},expression:"article.title"}})],1),a("el-form-item",{attrs:{label:"内容",prop:"content"}},[a("el-tiptap",{attrs:{extensions:e.extensions,height:"350",placeholder:"请输入文章内容",lang:"zh"},model:{value:e.article.content,callback:function(t){e.$set(e.article,"content",t)},expression:"article.content"}})],1),a("el-form-item",{attrs:{label:"封面"}},[a("el-radio-group",{model:{value:e.article.cover.type,callback:function(t){e.$set(e.article.cover,"type",t)},expression:"article.cover.type"}},[a("el-radio",{attrs:{label:1}},[e._v("单图")]),a("el-radio",{attrs:{label:3}},[e._v("三图")]),a("el-radio",{attrs:{label:0}},[e._v("无图")]),a("el-radio",{attrs:{label:-1}},[e._v("自动")])],1),e.article.cover.type>0?[a("div",{staticClass:"pub-img"},e._l(e.article.cover.type,(function(t,n){return a("publish-image",{key:n,model:{value:e.article.cover.images[n],callback:function(t){e.$set(e.article.cover.images,n,t)},expression:"article.cover.images[index]"}})})),1)]:e._e()],2),a("el-form-item",{attrs:{label:"频道",prop:"channel_id"}},[a("el-select",{attrs:{placeholder:"请选择频道"},model:{value:e.article.channel_id,callback:function(t){e.$set(e.article,"channel_id",t)},expression:"article.channel_id"}},e._l(e.channels,(function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onPublish(!1)}}},[e._v("发表")]),a("el-button",{on:{click:function(t){return e.onPublish(!0)}}},[e._v("存入草稿")])],1)],1)],1)],1)},le=[],re=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"publishImage-container"},[a("div",{staticClass:"publish-image"},[a("img",{ref:"show-image",staticClass:"imgpub",attrs:{src:e.value},on:{click:e.onpublishImage}})]),a("el-dialog",{attrs:{title:"选择封面",visible:e.dialogVisible,"append-to-body":""},on:{"update:visible":function(t){e.dialogVisible=t},opened:e.ondlgopen}},[a("el-tabs",{attrs:{type:"card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"素材库",name:"first"}},[a("el-radio-group",{staticStyle:{"padding-bottom":"20px"},attrs:{size:"mini"},on:{change:e.onImageChange},model:{value:e.collect,callback:function(t){e.collect=t},expression:"collect"}},[a("el-radio-button",{attrs:{label:!1}},[e._v("全部")]),a("el-radio-button",{attrs:{label:!0}},[e._v("收藏")])],1),a("el-row",{attrs:{gutter:20}},e._l(e.images,(function(t,n){return a("el-col",{key:n,staticClass:"image-item",attrs:{lg:6,md:8,sm:12},nativeOn:{click:function(t){e.selectedIndex=n}}},[a("el-image",{staticStyle:{width:"150px",height:"120px"},attrs:{src:t.url,fit:"fill"}}),e.selectedIndex===n?a("div",{staticClass:"selected"}):e._e()],1)})),1),a("el-pagination",{attrs:{"page-size":this.pageSize,layout:"prev, pager, next",total:this.totalCount,"current-page":e.pageId},on:{"update:currentPage":function(t){e.pageId=t},"update:current-page":function(t){e.pageId=t},"current-change":e.oncurChange}})],1),a("el-tab-pane",{attrs:{label:"上传图片",name:"second"}},[a("input",{ref:"file",attrs:{type:"file",id:"file"},on:{change:e.onFileChange}}),a("img",{ref:"pre-view",staticStyle:{width:"150px",height:"150px"},attrs:{src:"",alt:""}})])],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.onCoverConfirm}},[e._v("确 定")])],1)],1)],1)},ce=[],ue=(a("3ca3"),a("ddb0"),a("2b3d"),function(e){return _({method:"POST",url:"/mp/v1_0/user/images",data:e})}),de=function(e){return _({method:"GET",url:"/mp/v1_0/user/images",params:e})},me=function(e,t){return _({method:"PUT",url:"/mp/v1_0/user/images/".concat(e),data:{collect:t}})},pe=function(e){return _({method:"DELETE",url:"/mp/v1_0/user/images/".concat(e)})},fe={name:"publishImage",props:["value"],data:function(){return{dialogVisible:!1,activeName:"first",collect:!1,images:[],pageSize:10,pageId:1,totalCount:0,selectedIndex:null}},methods:{onpublishImage:function(){this.dialogVisible=!0},ondlgopen:function(){var e=this;de({collect:this.collect,page:this.pageId,per_page:this.pageSize}).then((function(t){e.images=t.data.data.results,e.totalCount=t.data.data.total_count}))},onImageChange:function(){this.pageId=1,this.selectedIndex=null,this.ondlgopen()},oncurChange:function(e){this.pageId=e,this.ondlgopen()},onFileChange:function(){var e=this.$refs.file.files[0],t=window.URL.createObjectURL(e);this.$refs["pre-view"].src=t},onCoverConfirm:function(){var e=this;if("second"===this.activeName){var t=this.$refs.file.files[0];if(!t)return void this.$message("请选择图片");var a=new FormData;a.append("image",t),ue(a).then((function(t){e.dialogVisible=!1,e.$emit("input",t.data.data.url)}))}else if("first"===this.activeName){if(null===this.selectedIndex)return void this.$message("请选择素材图片");this.dialogVisible=!1,this.$emit("input",this.images[this.selectedIndex].url)}}}},ge=fe,he=(a("9a8e"),Object(r["a"])(ge,re,ce,!1,null,null,null)),ve=he.exports,be=a("4ccc"),_e=(a("7eef"),{name:"Publish",data:function(){return{article:{title:"",content:"",cover:{type:1,images:[]},channel_id:null},channels:[],extensions:[new be["d"],new be["p"],new be["m"],new be["g"]({level:3}),new be["a"]({bubble:!0}),new be["i"]({uploadRequest:function(e){var t=new FormData;return t.append("image",e),ue(t).then((function(e){return e.data.data.url}))}}),new be["t"],new be["j"],new be["o"],new be["h"],new be["k"],new be["b"],new be["l"],new be["r"],new be["s"],new be["f"],new be["n"],new be["c"],new be["q"]],rulesForm:{title:[{required:!0,message:"请输入文章标题",trigger:"blur"},{min:5,max:30,message:"长度在 5 到 30 个字符",trigger:"blur"}],content:[{required:!0,message:"请输入文章内容",trigger:"blur"},{validator:function(e,t,a){"<p></p>"===t?a(new Error("请输入文章内容")):a()}}],channel_id:[{required:!0,message:"请选择频道"}]}}},methods:{onPublish:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.$refs["rules-form"].validate((function(a){a&&(e.$route.query.id?ee(e.$route.query.id,e.article,t).then((function(a){e.$message({message:"".concat(t?"存入草稿":"发布","成功"),type:"success"}),e.$router.push("/article")})):Y(e.article,t).then((function(a){e.$message({message:"".concat(t?"存入草稿":"发布","成功"),type:"success"}),e.$router.push("/article")})))}))},loadChannels:function(){var e=this;X().then((function(t){e.channels=t.data.data.channels}))},loadArticle:function(){var e=this;Z(this.$route.query.id).then((function(t){e.article=t.data.data}))},onupdatecover:function(e,t){this.article.cover.images[e]=t}},created:function(){this.loadChannels(),this.$route.query.id&&this.loadArticle()},components:{"el-tiptap":be["e"],"publish-image":ve}}),Ce=_e,we=(a("8ff4"),Object(r["a"])(Ce,oe,le,!1,null,null,null)),ye=we.exports,xe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"image-container"},[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:"/"}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("素材管理")])],1)],1),a("div",{staticClass:"action-head"},[a("el-radio-group",{attrs:{size:"mini"},on:{change:e.onImageChange},model:{value:e.collect,callback:function(t){e.collect=t},expression:"collect"}},[a("el-radio-button",{attrs:{label:!1}},[e._v("全部")]),a("el-radio-button",{attrs:{label:!0}},[e._v("收藏")])],1),a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(t){e.isShow=!0}}},[e._v("上传素材")])],1),a("el-row",{attrs:{gutter:20}},e._l(e.images,(function(t,n){return a("el-col",{key:n,staticClass:"updownImage",attrs:{xs:12,sm:6,md:6,lg:4}},[a("el-image",{staticStyle:{width:"200px",height:"150px"},attrs:{src:t.url,fit:"cover"}}),a("div",{staticClass:"hidden"},[a("div",{staticClass:"floatImage"},[a("el-button",{attrs:{type:"warning",icon:t.is_collected?"el-icon-star-on":"el-icon-star-off",circle:"",size:"small",loading:t.loading},on:{click:function(a){return e.oncollectImage(t)}}}),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete-solid",circle:"",size:"small"},on:{click:function(a){return e.ondeleteImage(t.id)}}})],1)])],1)})),1),a("el-pagination",{attrs:{layout:"prev, pager, next",background:"","current-page":e.pageId,total:e.totalCount,"page-sizes":e.pageSize},on:{"update:currentPage":function(t){e.pageId=t},"update:current-page":function(t){e.pageId=t},"current-change":e.onCurrentChange}})],1),a("el-dialog",{attrs:{title:"上传素材",visible:e.isShow,"append-to-body":!0,width:"400px"},on:{"update:visible":function(t){e.isShow=t}}},[e.isShow?a("el-upload",{staticClass:"upload-demo",attrs:{drag:"",action:"http://api-toutiao-web.itheima.net/mp/v1_0/user/images",multiple:"",name:"image",headers:e.uploadHeader,"on-success":e.onUploadSuccess}},[a("i",{staticClass:"el-icon-upload"}),a("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),a("em",[e._v("点击上传")])]),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png文件，且不超过500kb")])]):e._e()],1)],1)},Ie=[],$e=(a("159b"),{name:"ImageIndex",data:function(){var e=JSON.parse(window.localStorage.getItem("user"));return{collect:!1,images:[],isShow:!1,totalCount:0,pageSize:[10],pageId:1,uploadHeader:{Authorization:"Bearer ".concat(e.token)}}},created:function(){this.loadImages(1)},methods:{loadImages:function(e){var t=this;de({collect:this.collect,page:e,per_page:this.pageSize[0]}).then((function(e){var a=e.data.data,n=a.results,i=a.total_count;n.forEach((function(e){e.loading=!1})),t.images=n,t.totalCount=i}))},onImageChange:function(e){this.pageId=1,this.loadImages(1)},onUploadSuccess:function(){this.isShow=!1,this.loadImages(1)},onCurrentChange:function(e){this.loadImages(e),this.pageId=e},oncollectImage:function(e){var t=this;e.loading=!0,me(e.id,!e.is_collected).then((function(a){e.loading=!1,e.is_collected=!e.is_collected,t.loadImages(t.pageId)}))},ondeleteImage:function(e){var t=this;this.$confirm("是否删除此素材","删除提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){pe(e).then((function(e){t.loadImages(t.pageId)})),t.$message({type:"success",message:"删除成功!"})}))}}}),Se=$e,ke=(a("d569"),Object(r["a"])(Se,xe,Ie,!1,null,null,null)),ze=ke.exports,Le=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"comment-container"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:"/"}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("评论管理")])],1)],1),a("div",{staticClass:"commentStyle"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.comments}},[a("el-table-column",{attrs:{prop:"title",label:"标题"}}),a("el-table-column",{attrs:{prop:"total_comment_count",label:"总评论数"}}),a("el-table-column",{attrs:{prop:"fans_comment_count",label:"粉丝评论数"}}),a("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.comment_status?"正常":"关闭")+" ")]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949",disabled:t.row.switchLoading},on:{change:function(a){return e.onchangeCommentStatus(t.row)}},model:{value:t.row.comment_status,callback:function(a){e.$set(t.row,"comment_status",a)},expression:"scope.row.comment_status"}})]}}])})],1)],1),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"page-sizes":[10,20,50],"page-size":e.pageSize,"current-page":e.pageId,layout:"total, sizes, prev, pager, next, jumper",total:e.totalComments},on:{"current-change":e.onCurrentChange,"size-change":e.handleSizeChange,"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"update:currentPage":function(t){e.pageId=t},"update:current-page":function(t){e.pageId=t}}})],1)])],1)},Oe=[],Ee=(a("25f0"),{name:"Comment",data:function(){return{comments:[],pageSize:10,pageId:1,totalComments:0}},created:function(){this.onLoadComments()},methods:{onLoadComments:function(){var e=this;Q({response_type:"comment",page:this.pageId,per_page:this.pageSize}).then((function(t){var a=t.data.data,n=a.results,i=a.total_count;n.forEach((function(e){e.switchLoading=!1})),e.comments=n,e.totalComments=i}))},onCurrentChange:function(e){this.pageId=e,this.onLoadComments()},onchangeCommentStatus:function(e){var t=this;e.switchLoading=!0,te(e.id.toString(),e.comment_status).then((function(a){e.switchLoading=!1,t.$message({type:"success",message:e.comment_status?"开启文章评论成功":"关闭文章评论成功"})})).catch((function(t){console.log(t),e.switchLoading=!1}))},handleSizeChange:function(){this.pageId=1,this.onLoadComments()}}}),je=Ee,Te=(a("6f99"),Object(r["a"])(je,Le,Oe,!1,null,null,null)),Pe=Te.exports,Ue=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"setting-container"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:"/"}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("个人中心")])],1)],1),a("div",{staticClass:"text item"},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form",{ref:"user-changeform",attrs:{model:e.user,"label-width":"80px",rules:e.formRules}},[a("el-form-item",{attrs:{label:"编号"}},[e._v(" "+e._s(e.user.id)+" ")]),a("el-form-item",{attrs:{label:"手机"}},[e._v(" "+e._s(e.user.mobile)+" ")]),a("el-form-item",{attrs:{label:"用户名称",prop:"name"}},[a("el-input",{attrs:{size:"large"},model:{value:e.user.name,callback:function(t){e.$set(e.user,"name",t)},expression:"user.name"}})],1),a("el-form-item",{attrs:{label:"用户介绍",prop:"intro"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.user.intro,callback:function(t){e.$set(e.user,"intro",t)},expression:"user.intro"}})],1),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{model:{value:e.user.email,callback:function(t){e.$set(e.user,"email",t)},expression:"user.email"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.changeUserLoading},on:{click:e.onChangeUser}},[e._v("保存设置")])],1)],1)],1),a("el-col",{attrs:{offset:2,span:4}},[a("label",{attrs:{for:"file"}},[a("el-avatar",{attrs:{shape:"square",size:200,fit:"cover",src:e.user.photo}})],1),a("p",[e._v("点击修改头像")]),a("input",{ref:"file",attrs:{type:"file",hidden:"",id:"file"},on:{change:e.onFileChange}})])],1)],1)]),a("el-dialog",{attrs:{title:"修改头像",visible:e.dialogVisible,"append-to-body":"",width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t},opened:e.onOpenDig,closed:e.onCloseDig}},[a("div",{staticClass:"image-wrap"},[a("img",{ref:"preview-image",staticClass:"image-crop",attrs:{src:e.previewImage}})]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",loading:e.photoLoading},on:{click:e.updataImage}},[e._v("确 定")])],1)])],1)},Ae=[],qe=(a("6107"),a("bab4")),De=a.n(qe),Ne={name:"Setting",data:function(){return{user:{},dialogVisible:!1,previewImage:"",cropper:null,photoLoading:!1,changeUserLoading:!1,formRules:{name:[{required:!0,message:"请输入用户名称",trigger:"blur"}],intro:[{required:!0,message:"请输入用户介绍",trigger:"blur"}],email:[{required:!0,message:"请输入用户邮箱",trigger:"blur"}]}}},created:function(){this.loadUserInfo()},methods:{loadUserInfo:function(){var e=this;w().then((function(t){e.user=t.data.data}))},onFileChange:function(){var e=this.$refs.file,t=window.URL.createObjectURL(e.files[0]);this.previewImage=t,this.$refs.file.value="",this.dialogVisible=!0},onOpenDig:function(){var e=this.$refs["preview-image"];this.cropper=new De.a(e,{aspectRatio:1,viewMode:1,dragMode:"none",cropBoxResizable:!1})},onCloseDig:function(){this.cropper.destroy()},updataImage:function(){var e=this;this.photoLoading=!0,this.cropper.getCroppedCanvas().toBlob((function(t){var a=new FormData;a.append("photo",t),y(a).then((function(t){e.user.photo=t.data.data.photo,e.dialogVisible=!1,e.loadUserInfo(),e.photoLoading=!0,e.$message({type:"success",message:"更新成功"}),A.$emit("userfile",e.user)})).catch((function(t){throw e.photoLoading=!0,e.$message({type:"danger",message:"更新失败"}),t}))}))},onChangeUser:function(){var e=this;this.$refs["user-changeform"].validate((function(t){if(t){e.changeUserLoading=!0;var a=e.user,n=a.name,i=a.intro,s=a.email;x({name:n,intro:i,email:s}).then((function(t){e.changeUserLoading=!1,A.$emit("userfile",e.user),e.loadUserInfo(),e.$message({type:"success",message:"更新成功"})})).catch((function(t){throw e.$message({type:"danger",message:"更新失败"}),e.changeUserLoading=!1,t}))}}))}}},Fe=Ne,Re=(a("bb90"),Object(r["a"])(Fe,Ue,Ae,!1,null,null,null)),Ve=Re.exports,Be=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"fans-container"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:"/"}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("粉丝管理")])],1)],1),a("div",{staticClass:"text item"},[a("el-tabs",{attrs:{type:"card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"粉丝列表",name:"first"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{xl:2,lg:4,md:6,sm:8}},[a("div",{staticClass:"fansList"},[a("img",{staticClass:"fansImage",attrs:{src:"http://toutiao-img.itheima.net/FnTkOoeCCdQhd5KfDtJXddtHGrft"}}),a("p",[e._v("夏洛特")]),a("el-button",{attrs:{size:"small"}},[e._v("+关注")])],1)]),e._l(e.fans,(function(t,n){return a("el-col",{key:n,attrs:{xl:2,lg:4,md:6,sm:8}},[a("div",{staticClass:"fansList"},[a("img",{staticClass:"fansImage",attrs:{src:t.photo}}),a("p",[e._v(e._s(t.name))]),a("el-button",{attrs:{size:"small"}},[e._v("+关注")])],1)])}))],2)],1),a("el-tab-pane",{attrs:{label:"粉丝画像",name:"second"}},[a("div",{ref:"main",staticStyle:{width:"600px",height:"400px"}})])],1)],1)])],1)},Me=[],Ge=function(){return _({method:"GET",url:"/mp/v1_0/followers"})},He=a("313e"),Je={name:"Fans",data:function(){return{activeName:"first",fans:[]}},created:function(){this.loadFansinfo()},mounted:function(){var e=He.init(this.$refs.main),t={title:{text:"ECharts 入门示例"},tooltip:{},legend:{data:["销量"]},xAxis:{data:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]},yAxis:{},series:[{name:"销量",type:"bar",data:[5,20,36,10,10,20]}]};e.setOption(t)},methods:{loadFansinfo:function(){var e=this;Ge().then((function(t){e.fans=t.data.data.results}))}}},Ke=Je,Qe=(a("ba11"),Object(r["a"])(Ke,Be,Me,!1,null,null,null)),Xe=Qe.exports;n["default"].use(d["a"]);var We=[{path:"/login",name:"login",component:k},{path:"/",component:H,children:[{path:"",name:"home",component:T},{path:"article",name:"article",component:se},{path:"publish",name:"publish",component:ye},{path:"images",name:"images",component:ze},{path:"comment",name:"comment",component:Pe},{name:"setting",path:"setting",component:Ve},{name:"fans",path:"fans",component:Xe}]}],Ye=new d["a"]({routes:We});Ye.beforeEach((function(e,t,a){var n=window.localStorage.getItem("user");"/login"!==e.path?n?a():a("/login"):a()}));var Ze=Ye,et=(a("a4b1"),a("5c96")),tt=a.n(et);a("0fae");n["default"].config.productionTip=!1,n["default"].use(tt.a),new n["default"]({router:Ze,render:function(e){return e(u)}}).$mount("#app")},"6eca":function(e,t,a){"use strict";a("1b25")},"6f99":function(e,t,a){"use strict";a("7d97")},7388:function(e,t,a){e.exports=a.p+"img/home.ce901248.png"},"7d97":function(e,t,a){},"818b":function(e,t,a){},"86ef":function(e,t,a){},"8a72":function(e,t,a){},"8ff4":function(e,t,a){"use strict";a("8a72")},"943c":function(e,t,a){},"958c":function(e,t,a){"use strict";a("818b")},"9a8e":function(e,t,a){"use strict";a("86ef")},a4b1:function(e,t,a){},ba11:function(e,t,a){"use strict";a("455a")},bb90:function(e,t,a){"use strict";a("e188")},d1df:function(e,t,a){"use strict";a("5012")},d569:function(e,t,a){"use strict";a("41ef")},e188:function(e,t,a){}});
//# sourceMappingURL=app.e7190e0d.js.map