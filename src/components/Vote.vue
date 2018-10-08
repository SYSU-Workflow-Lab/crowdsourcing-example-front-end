<template>
  <el-container>
      <el-header style="height:80px;padding:0px">
        <h1>Vote The Best {{$route.params.purpose}}</h1>
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
        <div v-for="(item, index) in items" class="mydiv">
          <h2 style="font-weight:bold;font-size:30px">Choice {{index+1}}</h2>
          <div v-for="(i, subindex) in item.data">
            <hr style="width:90%">
            <h2>Subtask {{subindex+1}}: </h2>
            <p>
              <p class="myoutput">{{i}}</p>
            </p>
          </div>
        </div>
        <div style="margin-top:30px;">
          <el-select v-model="result" placeholder="请选择">
            <el-option v-for="(item, index) in items" :key="item.userId" :label="index+1" :value="item.userId">
            </el-option>
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
      stage: '',
      tips: '',
      task: '',
      items:[],
      result: '',
      finished: false,
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
            axios.post('http://localhost:48403/vote/submit', formData)
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
  mounted: function() {
    switch (this.$route.params.purpose) {
      case 'Subtasks':
        this.stage = 'vtd';
    }
    axios.get('http://localhost:48403/vote/' + this.stage + '/tips-and-task')
    .then(response => {
      this.tips = response.data[0];
      this.task = response.data[1];
      axios.get('http://localhost:48403/vote/' + this.stage + '/data')
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
}
.myoutput {
  width: 90%;
  font-size:20px;
  text-align: start;
  margin: 0 auto;
}
</style>
