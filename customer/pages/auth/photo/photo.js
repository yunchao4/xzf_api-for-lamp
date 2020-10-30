var vm = new Vue({
    el: '#app',
    data: {
        category: 'custom',
        size: '',
        bgc: ''
    },
    methods: {
        onTypeChange: function (event) {
            //console.log(event.target.value);
            _this = this
            _this.category = event.target.value;
            var sizeSelect = document.getElementById("sizes");
            var colorSelect = document.getElementById('colors');
            switch (_this.category) {
                case 'custom':
                    sizeSelect.disabled = false;
                    colorSelect.disabled = false;
                    break;
                case 'id':
                    sizeSelect.disabled = true;
                    colorSelect.disabled = true;
                    sizeSelect.value = 'small'
                    colorSelect.value = 'white'
                    break;
                case 'drive':
                    sizeSelect.disabled = true;
                    colorSelect.disabled = true;
                    sizeSelect.value = 'normal'
                    colorSelect.value = 'white'
                    break;
                case 'passport':
                    sizeSelect.disabled = true;
                    colorSelect.disabled = true;
                    sizeSelect.value = 'large'
                    colorSelect.value = 'white'
                    break;
            }
        },
        capture: function () {
            _this = this
            var sizeSelect = document.getElementById("sizes");
            var colorSelect = document.getElementById('colors');
            _this.size = sizeSelect.value;
            _this.bgc = colorSelect.value;
            switch (_this.category) {
                case 'custom':
                    _this.category = 0
                    break;
                case 'id':
                    _this.category = 1
                    break;
                case 'drive':
                    _this.category = 2
                    break;
                case 'passport':
                    _this.category = 3
                    break;
            }
            //TODO: 写入照片表
            var data = {
                category : _this.category,
                size: _this.size,
                bgc: _this.bgc,
            }
            //console.log(data);
            localStorage.contain = JSON.stringify(data)
            toPage('camera')
        }
    }
})