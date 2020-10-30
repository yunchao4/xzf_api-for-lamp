//传入要跳转到那一页: *.html
function toPage(targetPage) {
    open(targetPage)
}

function toPageByFolder(folder, targetPage) {
    openByFolder(folder, targetPage)
}


//利用location打开对应页面
function open(targetPage) {
    location.href = '../' + targetPage + '/' + targetPage + '.html'
}

function openByFolder(folder, targetPage) {
    location.href = '../../' + folder + '/' + targetPage + '/' + targetPage + '.html'
}

//返回
function ret() {
    history.go(-1)
}

//刷新当前页面
function refresh() {
    location.reload()
}

//关闭当前页面
function close() {
    window.close()
}