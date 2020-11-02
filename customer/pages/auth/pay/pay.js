var vm = new Vue({
    el: '#app',
    data: {
        purchasetype:'',
        number: '',
        outlet: '',
        address: '',
        basePrice: 5,
        price: 2,
    },
    methods: {
        ret: function () {
            ret()
        },
        onTypeChange: function (event) {
            var _this = this
            _this.purchasetype = event.target.value
            var numberSelect = $('#number');
            var outletSelect = $('#outlet');
            var addressSelect = $('#address');
            switch (_this.purchasetype) {
                case 'online':
                    numberSelect.prop('disabled', true);
                    outletSelect.prop('disabled', true);
                    addressSelect.prop('disabled', true);
                    _this.price = 2;
                    break;
                case 'offline':
                    numberSelect.prop('disabled', false);
                    outletSelect.prop('disabled', false);
                    addressSelect.prop('disabled', true);
                    _this.price = 2 + _this.basePrice;
                    break;
                case 'express':
                    numberSelect.prop('disabled', false);
                    outletSelect.prop('disabled', false);
                    addressSelect.prop('disabled', false);
                    _this.price = 2 + _this.basePrice + 8
                    break
            }
        },
        pay: function () {
            var _this = this
            var numberSelect = $('#number');
            var outletSelect = $('#outlet');
            var addressSelect = $('#address');
            _this.number = numberSelect[0].value
            _this.outlet = outletSelect[0].value
            _this.address = addressSelect[0].value
            var type = null;
            switch (_this.purchasetype) {
                case 'online':
                    type = 0;
                    break;
                case 'offline':
                    type = 1;
                    break;
                case 'express':
                    type = 2;
                    break;
            }

            var data = {
                orderID: randomString(32),
                userID: localStorage.getItem('name'),
                storeID: null,//_this.outlet
                imgID: JSON.parse(localStorage.getItem('photo')).imgID,
                type: type,
                number: _this.number,
                money: _this.price,
                location: _this.address
            }
            //console.log(JSON.stringify(data));
            fetch('http://localhost:3000/save_order', {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(
                function (response) {
                    if (response.ok) {
                        return response.json();
                        window.alert("下单成功")
                        toPage('history')
                    }
                    
                }).then(function (data) {
                    //返回token验证与否
                    console.log(data);
                })

        },
        onNumChange: function (event) {
            var _this = this
            var num = event.target.value
            _this.number = document.getElementById('number').value
            _this.basePrice = num * 5
            _this.price = 2 + _this.basePrice
        }
    },
    created: function () {
        if (localStorage.getItem('thumb_wm') != null && localStorage.getItem('thumb_wm_list')) {
            $('.main').attr("src", localStorage.getItem('thumb_wm'))
            $('.full').attr("src", localStorage.getItem('thumb_wm_list'))
        }
        //fullPic = "\"" + localStorage.getItem('thumb_wm_list') + "\"";
        //mainPic = "\"" + localStorage.getItem('thumb_wm') + "\"";
        /*fetch(mainURL).then(function (response) {
            console.log(response.text());
        })*/
    }
})
