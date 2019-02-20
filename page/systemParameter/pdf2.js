function download(id){
    var element = $(id);    // 这个dom元素是要导出pdf的div容器
    //获取节点高度，后面为克隆节点设置高度。
    var height = element.height()
    //克隆节点，默认为false，不复制方法属性，为true是全部复制。
    var cloneDom = element.clone(true);
    //设置克隆节点的css属性，因为之前的层级为0，我们只需要比被克隆的节点层级低即可。
    cloneDom.css({
        "background-color": "white",
        "position": "absolute",
        "top": "0px",
        "z-index": "-1",
        "height": height
    });
    //将克隆节点动态追加到body后面。
    $("body").append(cloneDom);
    //插件生成base64img图片。
    html2canvas(cloneDom, {
        //Whether to allow cross-origin images to taint the canvas
        allowTaint: true,
        //Whether to test each image if it taints the canvas before drawing them
        taintTest: false,
        onrendered: function(canvas) {
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;
            //一页pdf显示html页面生成的canvas高度;
            var pageHeight = contentWidth / 592.28 * 841.89;
            //未生成pdf的html页面高度
            var leftHeight = contentHeight;
            //页面偏移
            var position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            var imgWidth = 595.28;
            var imgHeight = 592.28 / contentWidth * contentHeight;
            var pageData = canvas.toDataURL('image/jpeg', 1.0);
            //注①
            var pdf = new jsPDF('', 'pt', 'a4');
            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            if(leftHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth,imgHeight);
            } else {
                while(leftHeight > 0) {
                    //arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
                    pdf.addImage(pageData, 'JPEG', 0, position,imgWidth, imgHeight)
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    //避免添加空白页
                    if(leftHeight > 0) {
                        //注②
                        pdf.addPage();
                    }
                }
            }

            pdf.save($("#name").val()+'-'+$("#class").val()+'-'+$("#garden").val()+'-体能测试报告.pdf');
        }
    });
}
