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
      </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'TaskDecomposition',
  data () {
    return {
      tips: 'hr width=300 size=1 color=#00ffff align=center noshade 其中 width 规定线条的长度，还可以是百分比；color 是颜色，size 当然就是厚度了。align 规定线条位置，left、right、center。noshade 是否有立体效果。'

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
  border: 1px solid #c9c6c6;
  border-radius: 10px;
}
.myp {
  width: 90%;
  text-align: start;
  margin: 0 auto;
}
</style>
