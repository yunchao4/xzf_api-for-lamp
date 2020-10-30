var vm = new Vue({
    el: '#app',
    data: {
        purchasetype:'',
        number: '',
        outlet: '',
        address: '',
        basePrice: 5,
        price: 2
    },
    methods: {
        ret: function () {
            ret()
        },
        onTypeChange: function (event) {
            var _this = this
            _this.purchasetype = event.target.value
            var numberSelect = document.getElementById('number')
            var outletSelect = document.getElementById('outlet')
            var addressSelect = document.getElementById('address')
            switch (_this.purchasetype) {
                case 'online':
                    numberSelect.disabled = true
                    outletSelect.disabled = true
                    addressSelect.disabled = true
                    _this.price = 2
                    break
                case 'offline':
                    numberSelect.disabled = false
                    outletSelect.disabled = false
                    addressSelect.disabled = true
                    _this.price = 2 + _this.basePrice
                    break
                case 'express':
                    numberSelect.disabled = false
                    outletSelect.disabled = false
                    addressSelect.disabled = false
                    _this.price = 2 + _this.basePrice + 8
                    break
            }
        },
        pay: function () {
            var _this = this
            _this.number = document.getElementById('number').value
            _this.outlet = document.getElementById('outlet').value
            _this.address = document.getElementById('address').value
            console.log('type', _this.purchasetype);
            console.log('number', _this.number);
            console.log('outlet', _this.outlet);
            console.log('address', _this.address);
            //TODO: 结合照片表写入订单表
            //toPage('result')
        },
        onNumChange: function (event) {
            var _this = this
            var num = event.target.value
            _this.number = document.getElementById('number').value
            _this.basePrice = num * 5
            _this.price = 2 + _this.basePrice
        }
    }
})