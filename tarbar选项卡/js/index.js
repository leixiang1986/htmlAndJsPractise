/**
 * Created by mac on 2018/2/18.
 */

function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}

window.onload = function () {

    var lis = $('tab-header').getElementsByTagName('li');
    var contents = $('tab-content').getElementsByClassName('dom');
    // console.log(lis,contents);

    if (lis.length !== contents.length) return;

    for (var i=0;i < lis.length; i++) {
        var li = lis[i];
        li.id = 'header' + i;
        li.onmousemove = function () {
            console.log('移动了');
            for (var j=0; j < lis.length; j++){
                lis[j].className = '';
                contents[j].style.display = 'none';
            }
            this.className = 'selected';
            console.log('id是'+this.id.slice(6));
            contents[this.id.slice(6)].style.display = 'block';
        }
    }

};