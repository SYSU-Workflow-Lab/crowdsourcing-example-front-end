# crowdsourcing-example-front-end

## URL
> 管理页面 http://localhost:8888/#/management
>
> 选举是否为困难任务（vt） http://localhost:8888/#/vote/Task
>
> 任务分解（td） http://localhost:8888/#/task-decomposition
>
> 对任务分解的结果投票（vtd） http://localhost:8888/#/vote/Subtask
>
> 完成子任务（tc） http://localhost:8888/#/task-completion/{index}
>
> 对完成的子任务投票（vtc） http://localhost:8888/#/vote/CompletedTask/{index}
>
> 合并完成的子任务（tm） http://localhost:8888/#/task-mergence
>
> 对合并子任务的最终结果投票（vtm） http://localhost:8888/#/vote/MergedTask/

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
