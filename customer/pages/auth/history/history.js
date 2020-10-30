var vm = new Vue({
    el:"#app",
    data:{
        list:[],
    },
    methods:{
        ret:function(){
            ret()
        },
        enter:function(contain){
            //点击某个历史记录
            localStorage.contain = JSON.stringify(contain);
            toPage('result');
        }
    },
    created:function(){
        //TODO: 这里要获取到所有的历史记录，存到list中
    }
})