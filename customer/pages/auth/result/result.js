var vm = new Vue({
    el:'#app',
    data:{
        userpic1,   //个人照片
        userpic2,   //成图
        shopname,   //店铺名
        shopuser,  //店家联系人
        shopphone,  //店铺名称  
        price,      //价钱
    },
    methods:{
        ret:function(){
            ret()
        },
        download1:function(){
            //将无水印高清图保存到手机相册
        },
        download2:function(){
            //将组图保存到本地
        }
    },
    created:function(){
        //这里要通过接口获取到data中涉及到数据
        // current.userpic1='';
        // current.userpic2='';
        // ...
    }
})