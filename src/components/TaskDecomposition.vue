<template>
  <el-container>
      <el-header style="height:80px;padding:0px">
        <h1>Task Decomposition</h1>
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
          <div v-for="(item, index) in items">
            <h2>Subtask {{index+1}}: </h2>
            <p>
              <el-input class="myinput" type="textarea" v-model="item.data"></el-input>
            </p>
            <p style="height:40px;">
              <el-button type="danger" icon="el-icon-delete" circle style="float: right; margin-right:5%" @click="deleteTask(index)"></el-button>
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
    save() {
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
            axios.post('http://localhost:48403/task-decomposition/submit', formData)
            .then(response => {
              this.items = [{
                data:''
              },
              {
                data:''
              }];
              localStorage.removeItem('items')
            })
            .catch(error => {
              console.log(error);
            })
            this.$message({
              type: 'success',
              message: 'submit successfully!'
            });
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
  mounted: function() {
    axios.get('http://localhost:48403/task-decomposition/tips-and-task')
    .then(response => {
      this.tips = response.data[0];
      this.task = response.data[1];
    })
    .catch(error => {
      console.log(error);
      alert('网络错误，不能访问');
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
.myinput {
  width: 90%;
  font-size:20px;
}
</style>
