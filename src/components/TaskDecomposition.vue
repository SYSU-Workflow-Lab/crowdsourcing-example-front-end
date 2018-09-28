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
          <p class="myp">{{tasks}}</p>
        </div>
        <div class="mydiv">
          <div v-for="(item, index) in items">
            <h2>Subtask {{index+1}}: </h2>
            <el-input class="myinput" type="textarea" v-model="item.data"></el-input>
          </div>
          <div style="margin-top:30px;">
              <el-button @click="addTask">Add Task</el-button>
              <el-button type="primary" @click="save">Save</el-button>
              <el-button type="success">Submit</el-button>
            </div>
        </div>
      </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'TaskDecomposition',
  data () {
    return {
      tips: ' tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips tips ',
      tasks: ' tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks tasks ',
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
      console.log(JSON.stringify(this.items));
      localStorage.setItem('items', JSON.stringify(this.items));
    }
  },
  mounted: function() {
    var items = JSON.parse(localStorage.getItem('items'));
    console.log(items)
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
