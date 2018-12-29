import React, { Component } from "react";
import QRCode from "qrcode";
import "./index.less";

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataURL: ""
    };
    this.$data = {
      title: "",
      link: "",
      pic: "",
      desc: ""
    };
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }
  render() {
    return (
      <div className="share">
        <ul onClick={this.handleShareClick}>
          <li className="share-title">分享</li>
          <li className="share-li">
            <p
              className="iconfont weixin icon-weixin-copy"
              id="wx"
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
            />
          </li>
          <li className="share-li">
            <p className="iconfont qq icon-qq-copy-copy" id="qq" />
          </li>
          <li className="share-li">
            <p className="iconfont qqkongjian icon-qunfengqqkongjian" id="kj" />
          </li>
          <li className="share-li">
            <p className="iconfont weibo icon-qunfengxinlangweibo" id="wb" />
          </li>
        </ul>
        <div
          className="js_qrcode_wrap"
          ref={ShareQrcode => {
            this.ShareQrcode = ShareQrcode;
          }}
        >
          <div className="js_qrcode_arr" />
          <span
            className="js_qrcode_close"
            title="关闭"
            onClick={this.handleCloseClick}
          />
          <div className="js_share_qrcode">
            <canvas
              width="120"
              height="120"
              style={{ display: "none" }}
              id="canvas"
            />
            <img
              alt="Scan me!"
              className="js_qrcode_img"
              src={this.state.dataURL}
            />
          </div>
          <p className="js-share-text">用微信扫描二维码</p>
          <p>分享至好友和朋友圈</p>
        </div>
      </div>
    );
  }
  handleShareClick(e) {
    e.target.id === "wx"
      ? (this.ShareQrcode.style.display = "block")
      : this.handleShareLink(e.target.id);
  }
  onMouseLeave() {
    this.ShareQrcode.style.display = "none";
  }
  onMouseEnter() {
    this.ShareQrcode.style.display = "block";
  }
  handleCloseClick() {
    this.ShareQrcode.style.display = "none";
  }
  handleShareLink(type) {
    let shareUrl, pic;
    if (type === "kj") {
      shareUrl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?";
      pic = "pics";
    } else if (type === "qq") {
      shareUrl = "http://connect.qq.com/widget/shareqq/index.html?";
      pic = "pics";
    } else if (type === "wb") {
      shareUrl = "http://service.weibo.com/share/share.php?";
      pic = "pic";
    }
    shareUrl +=
      "url=" + encodeURIComponent(this.$data.link || document.location.href);
    shareUrl +=
      "&desc=" + encodeURIComponent(this.$data.desc || "可以分享你的想法哦");
    shareUrl +=
      "&title=" + encodeURIComponent(this.$data.title || document.title);
    shareUrl +=
      "&" +
      pic +
      "=" +
      encodeURIComponent(
        this.$data.pic ||
          "//gw.alicdn.com/mt/TB110jzof6H8KJjy0FjXXaXepXa-299-105.png"
      );
    window.open(shareUrl);
  }
  handleChangeQrCode(props) {
    const { data } = props;
    if (data !== null) {
      this.$data.title = data.title;
      this.$data.desc = data.title;
      this.$data.link = document.URL;
      this.$data.pic = data.coverImage;
    }
    this.ShareQrcode.style.display = "none";
    QRCode.toCanvas(document.getElementById("canvas"), document.URL, error => {
      if (error) console.error(error);
      this.setState({
        dataURL: document.getElementById("canvas").toDataURL("image/png")
      });
    });
  }
  componentDidMount() {
    this.handleChangeQrCode(this.props);
  }
  componentWillReceiveProps(nexProps) {
    const { data } = nexProps;
    const oldData = this.props.data;
    if (JSON.stringify(data) !== JSON.stringify(oldData)) {
      this.handleChangeQrCode(nexProps);
    }
  }
}
export default Share;
