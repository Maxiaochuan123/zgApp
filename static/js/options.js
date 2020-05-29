export default {
  toast:{
    position: 'top',               // 弹出的位置
    time: 2000,                       // 显示的时长
    closeIcon: 'close',               // 关闭的图标
    close: true,                      // 是否显示关闭按钮
    successIcon: 'check_circle',      // 成功信息图标
    infoIcon: 'info',                 // 信息信息图标
    warningIcon: 'priority_high',     // 提醒信息图标
    errorIcon: 'warning'              // 错误信息图标
  },
  message:{
    successIcon: 'check_circle',                    // 成功图标
    infoIcon: 'info',                               // 信息图标
    warningIcon: 'priority_high',                   // 提醒图标
    errorIcon: 'warning',                           // 错误图标
    iconSize: 24,                                   // 图标大小
    width: 350,                                     // 对话框的宽度
    maxWidth: '80%',                                // 对话框最大宽度
    className: '',                                  // 对话框的样式
    okLabel: '确定',                                 // 对话框确定按钮文字
    cancelLabel: '取消',                             // 对话框取消按钮文字
    transition: 'scale'                             // 对话框显示的动画 'slide-left', 'slide-right', 'fade', 'scale'
  }
};