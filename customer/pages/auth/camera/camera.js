function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

$(document).ready(function () {
    //判定是否进入拍照预览
    var inPreview = 0;
    var image = null;
    $(".ret").click(function () {
        if (inPreview) {
            //TODO: change icon
            refresh();
        }
        else
            ret();
    });
    $(".shot").click(function () {
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

        //将video的帧填入到canvas中，并从canvas获取图片文件
        var canvas = $(".canvas")[0];
        var context = canvas.getContext("2d");
        var video = $(".video")[0]
        //console.log("canvas", canvas.width, canvas.height);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        image = canvas.toDataURL('image/png');
        console.log(image);       

        inPreview = 1;
    })
    $(".gallery").click(function () {
        if (inPreview) {
            //TODO: change icon
            var contain = JSON.parse(localStorage.getItem('contain'));
            var data = {
                imgID: 003,
                image: image,
                category: contain.category,
                size: contain.size,
                bgc: contain.bgc,
            }
            localStorage.setItem("contain", JSON.stringify(data));
            //TODO: 调用AI接口
            //toPage("pay");
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
