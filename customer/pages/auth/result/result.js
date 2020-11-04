var contain = JSON.parse(localStorage.contain);
console.log(contain);
var vm = new Vue({
    el:"#app",
    data:{
        pic1:contain.pic1,   //个人照片
        pic2:contain.pic2,   //组图
        shopname:contain.storeID,   //店铺名
        shopuser : '',  //店家联系人
        shopphone :'',
        price:contain.price,         //价钱
    },
    methods:{
        ret:function(){
            ret()
        },
        download:function(){
            //将无水印高清图保存到本地
            // var alink = document.createElement("a");
            // alink.download = '证件照'
            // alink.href = this.pic1;
            // alink.download = "证件照"; //图片名
            // alink.click()
        },
        
    },
    created:function(){
        //根据店名取得商店信息
        var _this = this
        
        fetch('http://localhost:3000/get_store', {
            method: 'post',
            mode: 'cors',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(contain)
        }).then(function (res) {
                var r = res.json()
                console.log(r)
                r.then(data=>{
                    if(contain.type==0){
                        _this.shopuser = "电子照片"
                        document.getElementById("tip").style.display="none";
                    }else{
                        _this.shopuser = data[0].userID
                        _this.shopphone = data[0].phone
                    }
                    
                })
                // return res.json();
            }).then(function () {
                //返回token验证与否
        })
    }
})