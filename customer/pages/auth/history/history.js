var vm = new Vue({
    el:"#app",
    data:{
        list:[],
        order:[],
        photo:[],
    },
    methods:{
        enter:function(contain){
            //点击某个历史记录
            localStorage.contain = JSON.stringify(contain);
            toPage('result');
        },
        refresh:function(){
            refresh()
        }
    },
    created:function(){
        // 这里获取所有的订单
        // refresh()
        var _this=this;
        var obj ={
            name:localStorage.getItem('name')
        }
        fetch('http://localhost:3000/get_order', {
            method: 'post',
            mode: 'cors',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj)
        }).then(function (res) {
                var r = res.json();
                console.log(r);
                r.then(data=>{
                    //这里已经拿到订单数据
                     for(let i = 0;i<data.length;i++){
                        //  console.log(data[i]);
                        _this.order.push(data[i]);
                     }
                })
                // return res.json();
            }).then(function () {
                //返回token验证与否
        })
        //向photo表请求数据
            fetch('http://localhost:3000/get_photo',{
                method:'get',
                mode:'cors',
                headers:{
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
                }).then(function (res) {
                var photoinfo = res.json();
                // return res.json();
                photoinfo.then(data=>{
                    console.log(data);
                    for(let i = 0;i<data.length;i++){
                        _this.photo.push(data[i])
                    }
                
                //这里已经取到订单表和照片表，可以向页面返回数据了
                for(let i = 0;i<_this.order.length;i++){
                    for(let j = 0;j<_this.photo.length;j++){
                        if(_this.order[i].imgID==_this.photo[j].imgID){
                            _this.list.push(_this.photo[j]);
                            switch(_this.photo[j].size){
                                case 0:_this.list[i].size = "小一寸";break;
                                case 1:_this.list[i].size = "一寸";break;
                                case 2:_this.list[i].size = "大一寸";break;
                                default:
                                    console.log("照片size值超过2")
                            }
                            switch(_this.photo[j].bgc){
                                case 0:_this.list[i].bgc = "蓝色";break;
                                case 1:_this.list[i].bgc = "白色";break;
                                case 2:_this.list[i].bgc = "红色";break;
                                default:
                                    console.log("照片bgc值超过2")
                            }
                            switch(_this.photo[j].category){
                                case 0:_this.list[i].category = "自定义";break;
                                case 1:_this.list[i].category = "身份证";break;
                                case 2:_this.list[i].category = "驾驶照";break;
                                case 3:_this.list[i].category = "护照";break;
                                default:
                                    console.log("照片category值超过2")
                            }
                            
                            var img = _this.list[i].image
                            var img_body={
                                    "file_name": img,
                                    "app_key": "bcf65f1187ce4993e8c1ce0b80cf0d39b509ea7d"
                            }
                            fetch('http://apicall.id-photo-verify.com/api/take_cut_pic_v2',{
                                method:'post',
                                mode:'cors',
                                headers:{
                                    'Content-Type': 'application/json'
                                },
                                body:JSON.stringify(img_body)
                            }).then(function(res){
                                let pic
                                pic = res.json()
                                pic.then(data=>{
                                    // console.log(data.data.file_name);
                                    // _this.list[i].myimg = data.data.file_name
                                    $('.myimg').attr("src", data.data.file_name)
                                    _this.list[i].pic1 = data.data.file_name
                                    _this.list[i].pic2 = data.data.file_name_list
                                })
                            })
                            var time = _this.order[i].create_at
                            _this.list[i].create_at = time.substring(0,10)
                            _this.list[i].time = time
                            _this.list[i].storeID = _this.order[i].storeID
                            _this.list[i].price = _this.order[i].money
                            _this.list[i].type = _this.order[i].type
                            _this.list[i].recloca = _this.order[i].location
                        }
                    }
                }
                })
                }).then(function (data) {
                }).then(function () {
            })
    }
})