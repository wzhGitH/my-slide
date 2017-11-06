(function(window, document) {
    var MySwiper = function(targetDom, options) {
        // 判断是用函数创建的还是用new创建的。这样我们就可以通过MaskShare("dom") 或 new MaskShare("dom")来使用这个插件了  
        if (!(this instanceof MySwiper)) return new MySwiper(targetDom, options);
        // 参数
        this.options = this.extend({
            dataList: [],
            autoplay: 5000
        }, options);
        // 获取dom
        this.targetDom = document.getElementById(targetDom);
        var div = document.createElement("div");
        div.setAttribute("class", "swiper-container");
        var html = "";
        var imgHtml = "";
        var dataList = this.options.dataList;
        var paginationHtml = "";
        if (dataList.length > 0) {
            for (var i = 0; i < dataList.length; i++) {
                imgHtml += "<li class='swiper-wrapper-items'><img src=" + dataList[i].src + " /></li>";
                paginationHtml += "<li class='pagination-item'>" + dataList[i].name + "</li>";
            }
            html = "<div class='swiper-container'><ul class='swiper-wrapper'>" + imgHtml + "</ul>" +
                "<ul class='swiper-pagination'>" + paginationHtml + "</ul></div>";
            div.innerHTML = html;
            this.targetDom.appendChild(div);
        }
        this.event();
    }
    MySwiper.prototype = {
        init: function() {
            this.event();
        },
        extend: function(obj, obj2) {
            for (var k in obj2) {
                obj[k] = obj2[k];
            }
            return obj;
        },
        event: function() {
            var _this = this;
            this.i = 0;
            var dataList = this.options.dataList;
            var imgItem = document.getElementsByClassName("swiper-wrapper-items");
            var paginationItem = document.getElementsByClassName("pagination-item");
            paginationItem[_this.i].setAttribute("class", "pagination-item active");
            imgItem[_this.i].setAttribute("class", "swiper-wrapper-items active");
            for (var j = 0; j < dataList.length; j++) {
                paginationItem[j].index = j;
                paginationItem[j].addEventListener("mouseover", function(e) {
                    var i = this.index;
                    _this.i = i;
                    for (var z = 0; z < dataList.length; z++) {
                        paginationItem[z].setAttribute("class", "pagination-item");
                        imgItem[z].setAttribute("class", "swiper-wrapper-items");
                    }
                    paginationItem[_this.i].setAttribute("class", "pagination-item active");
                    imgItem[_this.i].setAttribute("class", "swiper-wrapper-items active");
                    clearInterval(_this.Timer);
                });
                paginationItem[j].addEventListener("mouseleave", function(e) {
                    _this.Timer = setInterval(function() {
                        _this.i++;
                        if (_this.i == dataList.length) {
                            _this.i = 0;
                        }
                        for (var z = 0; z < dataList.length; z++) {
                            paginationItem[z].setAttribute("class", "pagination-item");
                            imgItem[z].setAttribute("class", "swiper-wrapper-items");
                        }
                        paginationItem[_this.i].setAttribute("class", "pagination-item active");
                        imgItem[_this.i].setAttribute("class", "swiper-wrapper-items active");
                    }, _this.options.autoplay);
                })
            }
            this.Timer = setInterval(function() {
                _this.i++;
                if (_this.i == dataList.length) {
                    _this.i = 0;
                }
                for (var z = 0; z < dataList.length; z++) {
                    paginationItem[z].setAttribute("class", "pagination-item");
                    imgItem[z].setAttribute("class", "swiper-wrapper-items");
                }
                paginationItem[_this.i].setAttribute("class", "pagination-item active");
                imgItem[_this.i].setAttribute("class", "swiper-wrapper-items active");
            }, _this.options.autoplay);
        },
    }
    window.MySwiper = MySwiper;
}(window, document));