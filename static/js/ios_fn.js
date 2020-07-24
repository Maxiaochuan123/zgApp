export default{
  loginClick() {
    window.webkit.messageHandlers.login.postMessage(true);
  },
  gobackClick() {
    window.webkit.messageHandlers.homePage.postMessage(true);
  },
}