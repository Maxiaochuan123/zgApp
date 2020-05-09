import Exif from 'exif-js'

export default{
  /**
   * @description: 将base64转换为 file
   * @param {base64} base64 字符串
   * @param {fileName} 图片名
   * @return: file
   */
  dataUrltoFile(base64, fileName) {
    let arr = base64.split(","),
      type = arr[0].match(/:(.*?);/)[1],
      bs64Decode = atob(arr[1]),
      bs64Length = bs64Decode.length,
      u8arr = new Uint8Array(bs64Length);
    while (bs64Length--) {
      u8arr[bs64Length] = bs64Decode.charCodeAt(bs64Length);
    }
    return new File([u8arr], fileName, { type: type });
  },

  /**
   * @description: 转换blob对象用于上传
   * @param {base64} base64 字符串
   * @return: blob
   */
  dataURLtoBlob(base64) {
    let arr = base64.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  },

  /**
   * @description: 
   * @param {img} 图片
   * @param {ctx} //canvas上下文对象
   * @param {width} // 图片目标宽度
   * @param {height} // 图片目标高度
   * @return: 
   */
  rotateImg(img, canvas, ctx, width, height) {
    let Orientation;
    Exif.getData(img, function () {
      Orientation = Exif.getTag(img,'Orientation');
    });

    ctx.save(); //保存 canvas 当前的状态
    ctx.clearRect(0,0,width,height); //清除画布
    ctx.fillStyle = '#fff'; //铺底色 防止 png 绘制时 丢失透明度变成黑色底

    if(Orientation){
      if (Orientation == 3) {
        ctx.rotate(Math.PI);
        ctx.drawImage(img, -width, -height,  width, height);
      }else if (Orientation == 6) {
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(Math.PI / 2);
        // (0,-imgHeight) 从旋转原理图那里获得的起始点
        ctx.drawImage(img, 0,-height,  width, height  );
      } else if (Orientation == 8) {
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(3 * Math.PI / 2);
        ctx.drawImage(img, -width, 0,  width, height);
      } else {
        ctx.drawImage(img,0,0,width,height); //绘制ing...
      }
    }else{
      ctx.drawImage(img,0,0,width,height); //绘制ing...
    }

    ctx.restore(); //恢复 canvas 之前的状态
  },

  /**
   * @description: 是否限制 图片尺寸
   * @param {imgEvent} 图片 event
   * @return: 目标尺寸
   */
  isLimitedSize(imgEvent, _this){
    let originWidth = imgEvent.path[0].width, originHeight = imgEvent.path[0].height; //图片原始
    let targetWidth = originWidth, targetHeight = originHeight; // 目标尺寸
    // 图片尺寸超过 默认值 时进行限制
    if (originWidth > _this.maxWidth || originHeight > _this.maxHeight) {
        if (originWidth / originHeight > _this.maxWidth / _this.maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = _this.maxWidth;
            targetHeight = Math.round(_this.maxWidth * (originHeight / originWidth));
        } else {
            targetHeight = _this.maxHeight;
            targetWidth = Math.round(_this.maxHeight * (originWidth / originHeight));
        }
    }
    return [targetWidth, targetHeight]
  },

  // 对象去重
  removeRepeat(_this){
    let obj = {};
    _this.imagesList = _this.imagesList.reduce((item, next) =>{
      obj[next.file.name] ? '' : obj[next.file.name] = true && item.push(next);
      return item;
    }, []);
  },

  
  /**
   * @description: 容量换算
   * @param {bytes} 字节大小
   * @return: 换算后大小
   */
  bytesToSize(bytes){
    if (bytes === 0) return '0 B';
    var k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  },
}