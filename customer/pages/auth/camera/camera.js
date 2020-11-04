//获取符合用户需要和接口需求的证件照类型数字
function getSpec_id() {
    var content = JSON.parse(localStorage.getItem('photo'));
    //0:custom, 1:id, 2:drive, 3:passport
    var type = content.category;
    //0:normal, 1:small, 2:large
    var size = content.size;
    //0:white, 1:blue, 2:red
    var color = content.bgc;
    var result = null;
    switch (type) {
        case 0:
            result = size * 3 + color + 1;
            break;
        case 1:
            result = 660;
            break;
        case 2:
            result = 183;
            break;
        case 3:
            result = 28;
            break;
    }
    return result;
}

//将图片信息保存到数据库中
//@image: 从接口获得的图片id
function savePhoto2DB(image) {

    var id = randomString(32);
    var contain = JSON.parse(localStorage.getItem('photo'));
    contain.imgID = id;
    localStorage.setItem('photo', JSON.stringify(contain));
    var data = {
        imgID: id,
        image: image,
        category: contain.category,
        size: contain.size,
        bgc: contain.bgc,
    }
    //localStorage.setItem("photo", JSON.stringify(data));
    fetch('http://localhost:3000/save_photo', {
        method: 'post',
        mode: 'cors',
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(
        function (response) {
            if (response.ok)
                return response.json();
            else
                return false;
        })
    return true;
}

$(document).ready(function () {
    //判定是否进入拍照预览
    var inPreview = 0;
    var imageBASE64 = null;
    var imageName = null;

    $(".ret").click(function () {
        if (inPreview) {
            //TODO: change icon
            refresh();
        }
        else
            ret();
    });

    $(".shot").click(function () {
        //视频元素缩小到消失
        //TODO: 关闭摄像头
        $(".video").animate({
            //width: "0px",
            height: "0px",
            opacity: "1"
        }, "fast");

        //canvas弹出显示
        $(".canvas").animate({
            width: "100%",
            height: "50%",
            marginTop: "6rem",
            marginBottom: "8.75rem"
        }, "fast");
        $(".shot").fadeOut("fast");
        //修改剩下两个按钮的图标
        $(".ret").css('background-image', 'url(../../../images/cancel.png)')
        $(".ret").css('background-size', '20px')
        $(".gallery").css('background-image', 'url(../../../images/confirm.png)')

        //将video的帧填入到canvas中，并从canvas获取图片文件
        var canvas = $(".canvas")[0];
        var context = canvas.getContext("2d");
        var video = $(".video")[0]
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        imageBASE64 = canvas.toDataURL('image/png');      

        //进入canvas图像预览状态
        inPreview = 1;
    })

    $(".gallery").click(function () {
        if (inPreview) {
            //TODO: change icon

            var data = {
                //传到接口的图片BASE64需要裁剪前缀
                "file": imageBASE64.slice(22),
                "spec_id": getSpec_id(),
                "app_key": "bcf65f1187ce4993e8c1ce0b80cf0d39b509ea7d",
                //是否开启美颜
                "is_fair": 1,
                //美颜等级(1-5)
                "fair_level": 3
            }
            //调用AI接口处理图像
            fetch('http://apicall.id-photo-verify.com/api/cut_pic', {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(
                function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            //console.log(data);
                            if (data.code == 200) {
                                //获取带水印缩略图URL
                                var thumb_wm = data.result.img_wm_url_list[0];
                                var thumb_wm_list = data.result.print_wm_url_list[0];
                                localStorage.setItem('thumb_wm', thumb_wm);
                                localStorage.setItem('thumb_wm_list', thumb_wm_list);
                                //获取图片名，用于保存数据库并提供原图下载
                                imageName = data.result.file_name[0];
                                //console.log("imageName", imageName);
                                if (!savePhoto2DB(imageName)) {
                                    throw new Error('Photo saving failed');
                                }
                            }
                            else {
                                window.alert(data.error);
                                throw new Error('Photo process failed: ' + data.error);
                            }
                        }).then(function () {
                            toPage('pay');
                        })
                    }
                    else {
                        throw new Error('Photo process failed');
                    }    
                }).catch(error => console.error(error))

        }
        else {
            refresh();
        }
    })

    //alert('该页面会调用您的摄像头')
    // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }
    // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
    // 使用getUserMedia，因为它会覆盖现有的属性。
    // 这里，如果缺少getUserMedia属性，就添加它。
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            //否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }
    var constraints = {
        audio: false,
        video: {
            width: true,
            height: true
        }
    }
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            var video = document.querySelector('video');
            // 旧的浏览器可能没有srcObject
            if ("srcObject" in video) {
                video.srcObject = stream;
            } else {
                //避免在新的浏览器中使用它，因为它正在被弃用。
                video.src = window.URL.createObjectURL(stream);
            }
            video.onloadedmetadata = function (e) {
                video.play();
            };
        })
        .catch(function (err) {
            console.log(err.name + ": " + err.message);
            window.alert("摄像头无法获取图像")
        });
});
