<template>
  <el-container>
      <el-header style="height:80px;padding:0px">
        <h1>Task Completion</h1>
      </el-header>
      <el-main>
        <div class="mydiv">
          <h2>Tips: </h2>
          <p class="myp">{{tips}}</p>
        </div>
        <div class="mydiv">
          <h2>Task: </h2>
          <p class="myp">{{task}}</p>
        </div>
        <div class="mydiv">
          <h2>Your Task: </h2>
          <pre class="myp" style="">{{yourtask}}</pre>
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
const HOST_NAME = process.env.HOST_NAME;
export default {
  name: 'TaskCompletion',
  data () {
    return {
      tips: '',
      task: '',
      yourtask: '',
      solution:'',
    }
  },
  methods: {
    save() { // 保存数据到LocalStorage中
      if (!this.isNull()) {
        localStorage.setItem('solution', JSON.stringify(this.solution));
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
                index: this.$route.params.index,
              }
            }
            axios.post('http://' + HOST_NAME + '/api/task-completion/submit', formData)
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
    axios.get('http://' + HOST_NAME + '/api/task-completion/tips-and-task/' + this.$route.params.index)
    .then(response => {
      this.tips = response.data[0];
      this.task = response.data[1];
      this.yourtask = response.data[2];
    })
    .catch(error => {
      console.log(error);
      this.$message({
        type: 'warning',
        message: 'Network error, cannot access!'
      });
    })
    var solution = JSON.parse(localStorage.getItem('solution'));
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
