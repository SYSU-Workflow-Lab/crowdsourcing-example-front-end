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
            <p class="myp">
              <el-cascader expand-trigger="hover" :options="tipsAndTasks" v-model="selectedOptions" @change="handleChange" placeholder="Please choose one"></el-cascader>
              <el-button type="primary" @click="update" style="margin-left:20px">Update</el-button>
            </p>
            <p class="myp">
              <el-input v-model="updateInput" type="textarea" placeholder="Input the content" :rows="5"></el-input>
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
              Best Task Decomposition:(Total participants: {{counts[0]}})
            </h2>
            <!-- <h3 style="text-align:start;width:90%;margin: 0 auto;">Worker ID: {{subTask['userId']}}</h3> -->
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
              Best Task Completion:(Total participants: {{counts[1]}})
            </h2>
            <div v-for="(i, subindex) in completedTask">
              <hr style="width:90%">
              <h2>SubTask {{subindex+1}}: </h2>
              <!-- <h3 style="text-align:start;width:90%;margin: 0 auto;">Worker ID: {{i['userId']}}</h3> -->
              <p>
                <pre class="myoutput">{{i['data'][0]}}</pre>
              </p>
            </div>
          </div>
          <div class="mydiv">
            <h2 style="font-weight:bold;font-size:30px">
              Best Task Mergence:(Total participants: {{counts[2]}})
            </h2>
            <!-- <h3 style="text-align:start;width:90%;margin: 0 auto;">Worker ID: {{mergedTask['userId']}}</h3> -->
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
import {getCookie, setCookie} from '../util/cookieUtils';
export default {
  name: 'Vote',
  data () {
    return {
      isLogin: false,
      task: 'No Data',
      subTask: {
        userId: "No Data",
        data: []
      },
      mergedTask: {
        userId: "No Data",
        data: []
      },
      completedTask: [
          {
          userId: "No Data",
          data: []
        }
      ],
      tipsAndTasks: [
        {
          value: '',
          label: '',
          children: [
            {
              value: '',
              label: '',
            }
          ],
        }
      ],
      selectedOptions: [],
      updateInput: '',
      counts: [],
    }
  },
  methods: {
    checkLogin() { // 检查是否登录
      if (!getCookie('session')) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
    deleteAll() { // 删除所有数据（除Tips和Tasks）
      this.$confirm('Confirm to delete?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(({ value }) => {
        axios.get('/api/management/reset')
          .then(response => {
            this.task = 'No Data';
            this.subTask = {
              userId: "No Data",
              data: []
            };
            this.mergedTask = {
              userId: "No Data",
              data: []
            };
            this.completedTask =  [
                {
                userId: "No Data",
                data: []
              }
            ];
          })
          .catch(error => {
            this.$message({
              type: 'warning',
              message: 'Network error, cannot access!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: 'cancel.'
          });
        });
    },
    getData() {
      axios.get('/api/management/data')
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
      });

      axios.get('/api/management/counts')
      .then(response => {
        this.counts = response.data;
      })
      .catch(error => {
        console.log(error)
        this.$message({
          type: 'warning',
          message: 'Network error, cannot access!'
        });
      });

      this.updateTipsAndTasksData();
    },
    update() { // 更新Tips或Tasks数据
      if (this.selectedOptions.length != 0) {
        this.$confirm('Confirm to update?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'info'
        }).then(() => {
          var formData = {
              stage: this.selectedOptions[0],
              type: this.selectedOptions[1],
              content: this.updateInput,
            }
          axios.post('/api/management/update/tips-and-tasks', formData)
            .then(response => {
              this.$message({
                type: 'success',
                message: 'Update successfully!'
              });
              this.updateTipsAndTasksData();
            })
            .catch(error => {
              this.$message({
                type: 'warning',
                message: 'Network error, cannot access!'
              });
              console.log(error);
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'cancel update'
          });
        });
      }
    },
    handleChange() { // 监听级联选择器事件
      for (var i = 0, len = this.tipsAndTasks.length; i < len; i++) {
        if (this.tipsAndTasks[i]['value'] == this.selectedOptions[0]) {
          for (var j = 0, sublen = this.tipsAndTasks[i]['children'].length; j < sublen; j++) {
            if (this.tipsAndTasks[i]['children'][j]['value'] == this.selectedOptions[1]) {
              this.updateInput = this.tipsAndTasks[i]['children'][j]['content'];
            }
          }
        }
      }
    },
    updateTipsAndTasksData() { // 更新Tips和Tasks数据
      axios.get('/api/management/tips-and-tasks')
      .then(response => {
        this.tipsAndTasks = []
        for (var i = 0; i < response.data.length; i += 2) {
          this.tipsAndTasks.push({
            value: response.data[i]['stage'],
            label: 'stage of ' + response.data[i]['stage'],
            children: [
              {
                value: response.data[i]['type'],
                label: response.data[i]['type'] == '0' ? 'Tips' : 'Tasks',
                content: response.data[i]['content'],
              },
              {
                value: response.data[i + 1]['type'],
                label: response.data[i + 1]['type'] == '0' ? 'Tips' : 'Tasks',
                content: response.data[i + 1]['content'],
              }
            ]
          })
        }
      })
      .catch(error => {
        console.log(error)
        this.$message({
          type: 'warning',
          message: 'Network error, cannot access!'
        });
      })
    }
  },
  created: function() {
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
    }
    this.getData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/common.css';
.myp {
  margin-top: 20px;
}
</style>
