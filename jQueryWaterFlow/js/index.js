/**
 * Created by mac on 2018/2/19.
 */

$(window).on('load',function () {
    waterFall();
});



window.onresize = function () {
    console.log('重新修改了大小');
    waterFall();
};

$(window).on('scroll',function () {
    if(checkWillLoad()){ //加载条件
        var datas = {'dataImg': [{'img':'0.png'},{'img':'1.png'},{'img':'2.png'},{'img':'3.png'},{'img':'4.png'},{'img':'5.png'},{'img':'6.png'},{'img':'7.png'},{'img':'8.png'},{'img':'9.png'}]};

        $.each(datas.dataImg,function (index,value) {
            var newBox = $('<div>').addClass('box').appendTo($('#main'));
            var newPic = $('<div>').addClass('pic').appendTo($(newBox));
            var newImg = $('<img>').attr('src','images/'+$(value).attr('img')).appendTo($(newPic));
        });
        //重新流水布局
        waterFall();
    }
});


//实现布局
function waterFall() {
    //拿到所有的盒子
    var allBox = $('#main>.box');
    var ele = $(allBox).eq(0);
    var boxWidth = $(ele).outerWidth();
    // console.log($(window).width);
    var windowWidth = $(window).outerWidth();
    var columns = Math.floor(windowWidth / boxWidth);

    //副标签居中
    $('#main').css({
        'width': columns * boxWidth + 'px',
        'margin': '0 auto'
    });
    //对子盒子进行定位
    var heightArr = [];
    //遍历
    $.each(allBox, function (index, value) {
       //取出单独盒子的高度
        var boxHeight = $(value).outerHeight();
        // alert("循环"+index);
        if (index < columns) { //第一行的盒子
            heightArr[index] = boxHeight;

        }
        else { //剩余行的盒子
            //取出高度数组中最矮的高度
            var minBoxHeight = Math.min.apply(null,heightArr);
            for (var index in heightArr) {
                console.log('高度的' + heightArr[index]);
            }
            //取出最矮高度的索引
            var minBoxIndex = $.inArray(minBoxHeight,heightArr);

            // if (index == columns.length) {
            //     alert(heightArr.length);

                // alert(minBoxHeight);

            // }

            //定位
            $(value).css({
               'position': 'absolute',
                'top':minBoxHeight + 'px',
                'left':minBoxIndex * boxWidth + 'px'
            });

            //更新最小高度
            heightArr[minBoxIndex] += boxHeight;
        }
    });
}

//设置滚动条件
function checkWillLoad() {
    //拿到最后一个盒子，最后一个盒子未必是最高或最低的，但是这只是加载下一组数据的规则
    var lastBox = $('#main>div').last();
    //取出最后一个盒子的高度一半 + 顶部位置
    var lastBoxDis = $(lastBox).outerHeight() * 0.5 + $(lastBox).offset().top;
    //求出浏览器的高度
    var windowHeight = $(window).height();
    //滚动的高度
    var scrollHeight = $(window).scrollTop();

    return lastBoxDis < windowHeight + scrollHeight;

}