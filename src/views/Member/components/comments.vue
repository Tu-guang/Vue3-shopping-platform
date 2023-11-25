<template>
  <div style="letter-spacing: 1px">
    <P style="text-align: right;">
      <ruby>赵冠军
        <rt>ZhaoGuanJun</rt>
      </ruby>
    </P>

    <div class="head">
      <!-- 评论区域如果当前用户有头像则显示头像,没有则显示默认头像 -->
      <img v-if="picture" :src="`http://` + picture" alt=""/>
      <img v-else src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt=""/>
      <!-- 评论框 -->
      <input
          type="text"
          placeholder="请输入评论 . . ."
          ref="input"
          @focus="obtain"
          @blur="lose"
          v-model="firstComments"
          @keyup.enter="sumbit"
      />
      <!-- 发布按钮 -->
      <button @click="sumbit">发表评论</button>
    </div>
    <div class="content">
      <!-- 一级评论 -->
      <div class="first" v-for="(item, index) in comments" :key="index">
        <a href="javascript:;" class="first-img">
          <!-- 如果当前用户有头像则显示头像,没有则显示默认头像 -->
          <!-- <img :src="`http://` + item.picture" /> -->
          <img v-if="item.picture" :src="`http://` + item.picture" alt=""/>
          <img v-else src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt=""/>
        </a>
        <div class="first-content">
          <!-- 一级评论用户昵称 -->
          <h3 class="first-username">{{ item.username }}</h3>
          <!-- 一级评论发布时间 -->
          <span class="first-time">{{ item.date }}</span>
          <!-- 一级评论评论内容 -->
          <p class="first-comment">
            {{ item.content }}
          </p>
          <!-- 一级评论评论点赞 -->
          <div
              class="first-right"
              @mouseleave="delete_leave(item)"
              @mouseover="delete_after(item)"
          >
	            <span
                  class="delete"
                  v-if="item.delete"
                  @click="comment_delete(item, '父级', index)"
              >删除</span
              >
            <span class="comments" @click="comment_input(item)">评论</span>
            <!-- 一级评论点赞数 -->
            <span
                class="praise"
                :class="item.like"
                @click="comment_like(item, 0)"
            >
              <span v-if="item.numbers">{{ item.numbers }}</span>
            </span>
          </div>
          <!-- 回复一级评论 -->
          <div class="reply-comment" v-if="item.display">
            <input
                type="text"
                placeholder="请输入评论 . . ."
                v-model="childComments"
                @keyup.enter="reply_sumbit(item, '父级', index)"
                @blur="lose(item)"
            />
            <!-- 0为回复一级评论 -->
            <button @click="reply_sumbit(item, '父级', index)">发表评论</button>
          </div>
          <!-- 次级评论 -->
          <div class="second">
            <ul>
              <li v-for="(sons, sons_index) in item.sons" :key="sons_index">
                <div class="top">
                  <!-- 次级评论头像,该用户没有头像则显示默认头像 -->
                  <a href="JavaScript:;" class="second-img">
                    <img v-if="sons.picture" :src="sons.picture"/>
                    <!-- <img v-if="sons.picture" :src="`http://` + sons.picture" /> -->
                    <img v-else src="../../assets/logo.png"/>
                  </a>
                  <div class="second-content">
                    <!-- 次级评论用户昵称 -->
                    <h3 class="second-username">{{ sons.username }}</h3>
                    <!-- 次级评论评论时间 -->
                    <span class="second-time">{{ sons.date }}</span>
                    <!-- 次级评论内容 xxx回复xxx：评论内容-->
                    <p class="second-comment">
                      <span class="second-reply">
                        <span class="to_reply">{{ sons.username }}</span>
                        回复
                        <span class="to_reply">{{ sons.to_username }}</span
                          >：
                      </span>
                      {{ sons.content }}
                    </p>
                    <!-- 次级评论评论点赞 -->
                    <div
                        class="second-right"
                        @mouseleave="delete_leave(sons)"
                        @mouseover="delete_after(sons)"
                    >
                      <span
                            class="delete"
                            v-if="sons.delete"
                            @click="comment_delete(sons, '子级',index,sons_index)"
                        >删除</span
                        >
                      <span class="comments" @click="comment_input(sons)"
                      >评论</span
                      >
                      <!-- 次级评论点赞数 -->
                      <span
                          class="praise"
                          :class="sons.like"
                          @click="comment_like(sons, 1)"
                      >
                        <span v-if="sons.numbers">{{
                              sons.numbers
                            }}</span></span
                      >
                    </div>
                  </div>
                </div>
                <!-- 回复次级评论 -->
                <div class="reply-comment reply_li" v-if="sons.display">
                  <input
                      type="text"
                      placeholder="请输入评论 . . ."
                      v-model="childComments"
                      @keyup.enter="reply_sumbit(sons,'子级',index,sons_index)"
                      @blur="lose(sons)"
                  />
                  <!-- 1为回复次级评论 -->
                  <button @click="reply_sumbit(sons,'子级',index,sons_index)">发表评论</button>

                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 暂无评论的空状态 -->
      <el-empty description="暂无评论" v-if="show"></el-empty>
    </div>
    <!-- 页码 -->
    <!-- 	    <div style="text-align: center; margin-top: 15px" v-if="showPage">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="totalNumber * 10"
              @current-change="currentPage"
              :current-page="page"
            >
            </el-pagination>
          </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: new Date(),	//时间
      picture: '',
      firstComments: '',
      comments: [{
        username: 'Champion',
        date: '2022年8月11日13:58:58',
        content: '今日事今日毕',
        delete: true,	//删除按钮显示
        flag: false,
        like: '',
        display: false,	//显示评论区
        numbers: 2,		//点赞数
        sons: [{
          username: '张二噶',
          date: '2022年8月11日13:58:58',
          content: '春有百花秋有月，夏有凉风冬有雪',
          delete: true,	//删除按钮是否显示
          like: 1,
          display: false,
          picture: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          to_username: 'Champion',
          numbers: 1,		//点赞数
        }, {
          username: '伍六七',
          date: '2022年8月11日14:18:26',
          content: '千人同心则得千人力，万人异心则无一人之用',
          delete: true,
          display: false,
          picture: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          to_username: 'Champion',
          numbers: 5,		//点赞数
        }, {
          username: '秦小二',
          date: '2022年8月11日14:18:26',
          content: '百年修得同船渡，千年修得共枕眠',
          delete: true,
          display: false,
          picture: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          to_username: 'Champion',
          numbers: 12,		//点赞数
        },]
      }],
      childComments: '',

      show: false	//暂无条件显示
    }
  },
  methods: {
    obtain() {

    },
    // 评价框 失焦
    lose(m) {
      // m.display = false
      // this.firstComments = ''
      // this.childComments = ''
    },
    // 发表评论
    sumbit() {

      this.current = new Date();	//获取当前时间年月日、时分秒

      this.comments.push({
        username: 'Champion',
        date: this.current.getFullYear() + '年' + (this.current.getMonth() + 1) + '月' + this.current.getDate() + '日' + this.current.getHours() + ':' + this.current.getMinutes() + ':' + this.current.getSeconds(),
        content: this.firstComments,
        delete: true,
        display: false,
        flag: false,
        like: '',
        display: false,	//显示评论区
        sons: []
      })
      this.firstComments = ''

    },
    // 评价展示
    comment_input(m) {
      m.display = true
    },
    comment_like() {

    },
    comment_delete(m, n, w, t) {
      console.log(121)

      // 当前评论的用户id和当前登录的用户id相同时则可删除该条评论
      //this.$set(this.comments[i].sons[j], "delete", false);
      console.log(m)
      console.log(n)	//父级 或者 子级
      console.log(w)	//父级的下标
      console.log(t)	//子级的下标

      if (n == '子级') {
        this.comments[w].sons.splice(t, 1);
      } else if (n == '父级') {
        this.comments.splice(w, 1)
      } else {

      }
    },
    delete_leave(m) {
      // m.delete = false
    },
    delete_after(m) {
      console.log(m);
      // m.delete = true
    },
    reply_sumbit(m, n, w, t) {
      console.log((m))
      // console.log(m)
      // console.log(n)
      // console.log(w)	//父级的下标
      // console.log(t)	//子级的下标
      var index;
      if (n == '父级') {
        index = t
      } else if (n == '子级') {
        index = t + 1;
      }
      this.comments[w].sons.splice(index, 0, {
        username: 'Champion',
        date: this.current.getFullYear() + '年' + (this.current.getMonth() + 1) + '月' + this.current.getDate() + '日' + this.current.getHours() + ':' + this.current.getMinutes() + ':' + this.current.getSeconds(),
        content: this.childComments,
        delete: true,
        display: false,
        flag: false,
        like: '',
        display: false,	//显示评论区
        to_username: m.username,
      })
      this.firstComments = ''
      this.childComments = ''
      m.display = false
    }
  },
  created() {

  }
}
</script>

<style>
/* 评论框 */
.head {
  background-color: rgb(248, 248, 248);
  position: relative;
  height: 75px;
  border-radius: 5px;
}

.head img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 13px;
}

/* 评论框 */
.head input {
  position: absolute;
  top: 13px;
  left: 80px;
  height: 45px;
  border-radius: 5px;
  outline: none;
  width: 65%;
  font-size: 20px;
  padding: 0 20px;
  border: 2px solid #f8f8f8;
}

/* 发布评论按钮 */
.head button {
  position: absolute;
  top: 13px;
  right: 20px;
  width: 120px;
  height: 48px;
  border: 0;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  background-color: rgb(118, 211, 248);
  cursor: pointer;
  letter-spacing: 2px;
}

/* 鼠标经过字体加粗 */
.head button:hover {
  font-weight: 600;
}

/* 评论内容区域 */
.content .first {
  display: flex;
  position: relative;
  padding: 10px 10px 0px 0;
  text-align: left;
}

.first .first-img {
  flex: 1;
  text-align: center;
}

.first img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.first-username,
.second-username {
  color: #504f4f;
}

.first-content {
  flex: 9;
}

.first-time,
.second-time {
  color: #767575;
}

.first-comment,
.second-comment {
  margin-top: 5px;
}

/* 右边点赞和评论 */
.first-right,
.second-right {
  position: absolute;
  right: 1%;
  top: 10px;
}

.first-right span,
.second-right span {
  margin-right: 20px;
  cursor: pointer;
}

/* 删除评论 */
.delete:hover {
  color: red;
}

/* 评论字体图标 */
.comments::before {
  /* 想使用的icon的十六制编码，去掉&#x之后的 */
  content: "\e8b9";
  /* 必须加 */
  font-family: "iconfont";
  margin-right: 4px;
  font-size: 16px;
}

/* 点赞字体图标 */
.praise::before {
  /* 想使用的icon的十六制编码，去掉&#x之后的 */
  content: "\ec7f";
  /* 必须加 */
  font-family: "iconfont";
  margin-right: 4px;
  font-size: 19px;
}

.second {
  background-color: #f3f3f3;
  margin-top: 10px;
}

.second li {
  padding: 10px 10px 10px 0;
  border-bottom: 1px solid rgb(237, 237, 237);
}

.second .top {
  display: flex;
  position: relative;
}

.second-img {
  flex: 1;
  text-align: center;
}

.to_reply {
  color: rgb(106, 106, 106);
}

.second-content {
  flex: 9;
}

.second .reply_li {
  margin-left: 70px;
}

/* 评论框 */
.reply-comment {
  margin: 10px 0 0 0;
}

.reply-comment input {
  height: 40px;
  border-radius: 5px;
  outline: none;
  width: 70%;
  font-size: 18px;
  padding: 0 20px;
  /* border: 2px solid #f8f8f8; */
  border: 2px solid skyblue;
}

/* 发布评论按钮 */
.reply-comment button {
  width: 15%;
  height: 43px;
  border: 0;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  background-color: rgb(118, 211, 248);
  cursor: pointer;
  letter-spacing: 2px;
  margin-left: 20px;
}

/* 鼠标经过字体加粗 */
.reply-comment button:hover {
  font-weight: 600;
}

/* 评论点赞颜色 */
.comment-like {
  color: red;
}
</style>
