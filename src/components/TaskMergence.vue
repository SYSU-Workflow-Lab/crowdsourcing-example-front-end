<template>
  <el-container>
      <el-header style="height:80px;padding:0px">
        <h1>Task Mergence</h1>
      </el-header>
      <el-main>
        <div class="mydiv">
          <h2>Tips: </h2>
          <pre class="myp">{{tips}}</pre>
        </div>
        <div class="mydiv">
          <h2>Task: </h2>
          <pre class="myp">{{task}}</pre>
        </div>
        <div v-if="isComplex" class="mydiv">
          <h2 style="font-weight:bold;font-size:30px">Tasks</h2>
          <div v-for="(i, subindex) in yourtask">
            <hr style="width:90%">
            <h2>SubTask {{subindex+1}}: </h2>
            <p>
              <pre class="myoutput">{{i}}</pre>
            </p>
          </div>
        </div>
        <div class="mydiv">
          <p>
            <el-input class="myinput" type="textarea" v-model="solution" :rows="5"></el-input>
          </p>
          <div style="margin-top:30px;">
              <el-button type="primary" @click="save">Save</el-button>
              <el-button type="success" @click="submit">Submit</el-button>
            </div>
        </div>
      </el-main>
    </el-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'TaskMergence',
  data () {
    return {
      tips: '',
      task: '',
      yourtask: [],
      solution:'',
      isComplex: false,
    }
  },
  methods: {
    save() { // 保存数据到LocalStorage中
      if (!this.isNull()) {
        localStorage.setItem('solution', this.solution);
        this.$message({
          type: 'success',
          message: 'save successfully!'
        });
      } else {
        this.$message.error('must no empty subtask!');
      }
    },
    submit() {
      if (!this.isNull()) {
        var workId = '';
        this.$prompt('please enter your workId', 'Notice', {
          confirmButtonText: 'Submit',
          cancelButtonText: 'Cancel',
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: 'please enter your work id'
        }).then(({ value }) => {
            workId = value;
            var formData = {
              userId: workId,
              data: {
                content: this.solution,
              }
            }
            axios.post('/api/task-mergence/submit', formData)
            .then(response => {
              this.solution = '';
              localStorage.removeItem('solution');
              this.$message({
                type: 'success',
                message: 'submit successfully!'
              });
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
              type: 'warning',
              message: 'cancel submissions.'
            });
          });
        } else {
          this.$message.error('must no empty subtask!');
        }
      },
      isNull() {
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        var str = this.solution;
        if ( str == "" ) {
          return true;
        }
        return re.test(str);
      }
  },
  created: function() {
    axios.get('/api/task-mergence/tips-and-task/')
    .then(response => {
      this.tips = response.data[0];
      this.task = response.data[1];
      if (response.data[2] == 'Complex') {
        this.yourtask = response.data;
        this.yourtask.splice(0, 3);
        this.isComplex = true;
      } else {
        this.isComplex = false;
      }
    })
    .catch(error => {
      console.log(error);
      this.$message({
        type: 'warning',
        message: 'Network error, cannot access!'
      });
    })
    var solution = localStorage.getItem('solution');
    if (solution != null) {
      this.solution = solution;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/common.css';
</style>
