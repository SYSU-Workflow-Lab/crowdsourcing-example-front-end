<template>
  <el-container>
      <el-header style="height:80px;padding:0px">
        <h1>Management</h1>
      </el-header>
      <el-main>
        <div v-if="isLogin">
          <div class="mydiv">
            <h2 style="font-weight:bold;font-size:30px">
              Operation:
            </h2>
            <p class="myp">
              <el-button type="danger" @click="deleteAll">Delete All</el-button>
            </p>
          </div>
          <div class="mydiv">
            <h2 style="font-weight:bold;font-size:30px">
              Task property:
            </h2>
            <p>
              <pre class="myoutput">{{task}}</pre>
            </p>
          </div>
          <div class="mydiv">
            <h2 style="font-weight:bold;font-size:30px">
              Best Task Decomposition:
            </h2>
            <h3 style="text-align:start;width:90%;margin: 0 auto;">Worker ID: {{subTask['userId']}}</h3>
            <div v-for="(i, subindex) in subTask['data']">
              <hr style="width:90%">
              <h2>SubTask {{subindex+1}}: </h2>
              <p>
                <pre class="myoutput">{{i}}</pre>
              </p>
            </div>
          </div>
          <div class="mydiv">
            <h2 style="font-weight:bold;font-size:30px">
              Best Task Completion:
            </h2>
            <div v-for="(i, subindex) in completedTask">
              <hr style="width:90%">
              <h2>SubTask {{subindex+1}}: </h2>
              <h3 style="text-align:start;width:90%;margin: 0 auto;">Worker ID: {{i['userId']}}</h3>
              <p>
                <pre class="myoutput">{{i['data'][0]}}</pre>
              </p>
            </div>
          </div>
          <div class="mydiv">
            <h2 style="font-weight:bold;font-size:30px">
              Best Task Mergence:
            </h2>
            <h3 style="text-align:start;width:90%;margin: 0 auto;">Worker ID: {{mergedTask['userId']}}</h3>
            <hr style="width:90%">
              <p>
                <pre class="myoutput">{{mergedTask['data'][0]}}</pre>
              </p>
          </div>
        </div>
      </el-main>
      
    </el-container>
</template>

<script>
import axios from 'axios';
import {getCookie, setCookie} from '../util/cookieUtils'
export default {
  name: 'Vote',
  data () {
    return {
      isLogin: false,
      task: '',
      subTask: {
        userId: "",
        data: []
      },
      mergedTask: {
        userId: "",
        data: []
      },
      completedTask: [
          {
          userId: "",
          data: []
        }
      ]
    }
  },
  methods: {
    checkLogin() {
      if (!getCookie('session')) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
    deleteAll() {
      axios.get('http://localhost:48403/api/management/reset')
      .then(response => {
        
      })
      .catch(error => {
        this.$message({
          type: 'warning',
          message: 'Network error, cannot access!'
        });
      })
    }
  },
  mounted: function() {
    this.checkLogin();
    if (!this.isLogin) {
        this.$prompt('please enter password', 'Login', {
          confirmButtonText: 'Login',
          cancelButtonText: 'Cancel',
          inputPattern: /workflow/,
          inputErrorMessage: 'please enter your password'
        }).then(({ value }) => {
          this.isLogin = true;
          let expireDays = 1000 * 60 * 60 * 24 * 15;
          setCookie('session', 'supricemotherfxxk', expireDays);
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: 'cancel submissions.'
            });
          });
    } else {
      axios.get('http://localhost:48403/api/management/data')
      .then(response => {
        this.task = response.data['task'][0]['data'][0];
        this.subTask = response.data['subtask'][0];
        this.mergedTask = response.data['mergedtask'][0];
        this.completedTask = response.data['completedtask']
      })
      .catch(error => {
        console.log(error)
        this.$message({
          type: 'warning',
          message: 'Network error, cannot access!'
        });
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: bold;
  font-size: 35px;
}
h2 {
  font-weight: normal;
  text-align: start;
  margin-left: 5%;
}
.mydiv {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border: 1px solid #c9c6c6;
  border-radius: 10px;
}
.myp {
  width: 90%;
  text-align: start;
  margin: 0 auto;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.myoutput {
  width: 90%;
  font-size:20px;
  text-align: start;
  margin: 0 auto;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
