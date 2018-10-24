<template>
  <el-container>
      <el-header style="height:80px;padding:0px">
        <h1>{{title}}</h1>
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
        <div v-for="(item, index) in items" class="mydiv">
          <h2 style="font-weight:bold;font-size:30px">Candidate {{index+1}}</h2>
          <div v-for="(i, subindex) in item.data">
            <hr style="width:90%">
            <h2 v-if="isMulti">{{$route.params.purpose}} {{subindex+1}}: </h2>
            <p>
              <pre class="myoutput">{{i}}</pre>
            </p>
          </div>
        </div>
        <div style="margin-top:30px;">
          <el-select v-if="isVT" v-model="result" placeholder="Is task simple or complex?" style="width:400px">
            <el-option v-for="item in VTSelect" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-select v-else v-model="result" placeholder="Please choose one">
            <el-option v-for="(item, index) in items" :key="item.userId" :label="index+1" :value="item.userId"></el-option>
          </el-select>
          <el-button type="success" @click="submit" :disabled="finished">Submit</el-button>
        </div>
      </el-main>
      
    </el-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Vote',
  data () {
    return {
      title: '',
      stage: '',
      tips: '',
      task: '',
      index: '',
      items:[],
      result: '',
      isMulti: true,
      isVT: false,
      finished: false,
      VTSelect: ["Simple", "Complex"],
    }
  },
  methods: {
    submit() {
      if (!this.isNull()) {
        var workId = '';
        console.log(this.result);
        this.$prompt('please enter your workId', 'Notice', {
          confirmButtonText: 'Submit',
          cancelButtonText: 'Cancel',
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: 'please enter your work id'
        }).then(({ value }) => {
            workId = value;
            var formData = {
              userId: workId,
              data: this.result
            }
            axios.post('/api/vote/submit/' + this.stage + '/' + this.index, formData)
            .then(response => {
              // this.finished = true;
              this.$message({
                type: 'success',
                message: 'submit successfully!'
              });
            })
            .catch(error => {
              console.log(error);
              this.$message({
                type: 'warning',
                message: 'Network error, cannot access!'
              });
            })
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: 'cancel submissions.'
            });
          });
        }
      },
      isNull() {
        return this.result.replace(/(^s*)|(s*$)/g, "").length == 0;
      }
  },
  created: function() {
    this.title = 'Vote The Best ' + this.$route.params.purpose;
    switch (this.$route.params.purpose) {
      case 'Task':
        this.title = 'Judge The Task';
        this.stage = 'vt';
        this.isMulti = false;
        this.index = 0;
        this.isVT = true;
        break;
      case 'Subtask':
        this.stage = 'vtd';
        this.isMulti = true;
        this.index = '0';
        this.isVT = false;
        break;
      case 'CompletedTask':
        this.isMulti = false;
        this.stage = 'vtc';
        this.index = this.$route.params.index;
        this.isVT = false;
        break;
      case 'MergedTask':
        this.isMulti = false;
        this.stage = 'vtm';
        this.index = '0';
        this.isVT = false;
        break;
    }
    axios.get('/api/vote/' + this.stage + '/tips-and-task')
    .then(response => {
      this.tips = response.data[0];
      this.task = response.data[1];
      axios.get('/api/vote/' + this.stage + '/data/' + this.index)
        .then(response => {
          this.items = response.data;
        })
    })
    .catch(error => {
      console.log(error);
      this.$message({
        type: 'warning',
        message: 'Network error, cannot access!'
      });
    })
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/common.css';
</style>
