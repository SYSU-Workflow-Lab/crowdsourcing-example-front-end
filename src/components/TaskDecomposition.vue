<template>
  <el-container>
      <el-header style="height:80px;padding:0px">
        <h1>Task Decomposition</h1>
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
        <div class="mydiv" style="padding-top:20px">
          <div v-for="(item, index) in items">
            <div style="height:40px;margin-bottom:0px;text-align:start;margin-left:5%;">
              <span style="font-size:26px">Subtask {{index+1}}: </span>
              <span >
                <el-button type="danger" icon="el-icon-delete" style="float: right; margin-right:5%;" @click="deleteTask(index)"></el-button>
              </span>
            </div>
            <p>
              <el-input class="myinput" type="textarea" v-model="item.data" :rows="2"></el-input>
            </p>
          </div>
          <div style="margin-top:30px;">
              <el-button @click="addTask">Add Task</el-button>
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
  name: 'TaskDecomposition',
  data () {
    return {
      tips: '',
      task: '',
      items:[{
        data:''
      },
      {
        data:''
      }],

    }
  },
  methods: {
    addTask() {
      this.items.push({data:''})
      // console.log(this.items)
    },
    save() { // 保存数据到LocalStorage中
      if (!this.isNull()) {
        // console.log(JSON.stringify(this.items));
        localStorage.setItem('items', JSON.stringify(this.items));
        this.$message({
          type: 'success',
          message: 'save successfully!'
        });
      } else {
        this.$message.error('must no empty subtask!');
      }
    },
    deleteTask(index) {
      this.items = this.items.filter(o => this.items.indexOf(o) != index);
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
              data: this.items
            }
            axios.post('/api/task-decomposition/submit', formData)
            .then(response => {
              this.items = [{
                data:''
              },
              {
                data:''
              }];
              localStorage.removeItem('items')
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
        var flag = true;
        for (var i = 0; i < this.items.length; i++) {
          var str = this.items[i].data;
          if ( str == "" ) {
            return true;
          }
          flag = re.test(str);
          if (flag) {
            break;
          }
        }
        return flag;
      }
  },
  created: function() {
    axios.get('/api/task-decomposition/tips-and-task')
    .then(response => {
      this.tips = response.data[0];
      this.task = response.data[1];
    })
    .catch(error => {
      console.log(error);
      this.$message({
        type: 'warning',
        message: 'Network error, cannot access!'
      });
    })
    var items = JSON.parse(localStorage.getItem('items'));
    // console.log(items)
    if (items != null) {
      this.items = items;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/common.css';
</style>
