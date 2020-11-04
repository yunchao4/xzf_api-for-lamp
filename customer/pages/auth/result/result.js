var contain = JSON.parse(localStorage.contain);
console.log(contain);
var vm = new Vue({
    el:"#app",
    data:{
        pic1:contain.pic1,   //个人照片
        pic2:contain.pic2,   //组图
        shopname:'',   //店铺名
        shopuser : '',  //店家联系人
        shopphone :'',
        price:contain.price,         //价钱
        shoploca:'',
        time:contain.time.substring(0,10)+" "+contain.time.substring(11,19),
        recloca:'',
    },
    methods:{
        ret:function(){
            ret()
        },
        
        download:function(){
            //将无水印高清图保存到本地
            var alink = document.createElement("a");
            alink.href = contain.pic1;
            alink.download = "证件照"; //图片名
            alink.click();
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
                    switch(contain.type){
                        case 0:
                            document.getElementById("tip").innerText="在线服务"
                            document.getElementById("tip1").style.display="none";
                            document.getElementById("tip2").style.display="none";
                            break;
                        case 1://门店打印
                            document.getElementById("tip2").style.display="none";
                            _this.shopuser = data[0].userID
                            _this.shopphone = data[0].phone
                            _this.shoploca = data[0].location
                            _this.shopname = data[0].storeID
                            break;
                        case 2:
                            document.getElementById("tip").innerText="快递到家"
                            _this.recloca = contain.recloca
                            _this.shopuser = data[0].userID
                            _this.shopphone = data[0].phone
                            _this.shoploca = data[0].location
                            _this.shopname = data[0].storeID
                            break;
                        default:
                            console.log("订单类型出错")
                    }
                    
                })
                // return res.json();
            }).then(function () {
                //返回token验证与否
        })
    }
})