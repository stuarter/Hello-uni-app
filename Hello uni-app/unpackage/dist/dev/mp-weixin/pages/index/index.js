"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      avatarUrl: "",
      nickname: "李雷",
      isEditingName: false
    };
  },
  onLoad() {
    const cachedAvatar = common_vendor.index.getStorageSync("userAvatar");
    if (cachedAvatar) {
      this.avatarUrl = cachedAvatar;
    }
    const cachedName = common_vendor.index.getStorageSync("userNickname");
    if (cachedName) {
      this.nickname = cachedName;
    }
  },
  methods: {
    // 点击更换头像
    changeAvatar() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          common_vendor.index.saveFile({
            tempFilePath,
            success: (saveRes) => {
              this.avatarUrl = saveRes.savedFilePath;
              common_vendor.index.setStorageSync("userAvatar", saveRes.savedFilePath);
              common_vendor.index.showToast({
                title: "头像更换成功",
                icon: "success"
              });
            },
            fail: () => {
              this.avatarUrl = tempFilePath;
              common_vendor.index.setStorageSync("userAvatar", tempFilePath);
              common_vendor.index.showToast({
                title: "头像更换成功",
                icon: "success"
              });
            }
          });
        }
      });
    },
    // 开始编辑昵称
    startEditName() {
      this.isEditingName = true;
    },
    // 完成编辑昵称
    finishEditName() {
      this.isEditingName = false;
      if (!this.nickname.trim()) {
        this.nickname = "李雷";
      }
      common_vendor.index.setStorageSync("userNickname", this.nickname);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.avatarUrl
  }, $data.avatarUrl ? {
    b: $data.avatarUrl
  } : {}, {
    c: common_vendor.o((...args) => $options.changeAvatar && $options.changeAvatar(...args)),
    d: !$data.isEditingName
  }, !$data.isEditingName ? {
    e: common_vendor.t($data.nickname),
    f: common_vendor.o((...args) => $options.startEditName && $options.startEditName(...args))
  } : {
    g: $data.isEditingName,
    h: common_vendor.o((...args) => $options.finishEditName && $options.finishEditName(...args)),
    i: common_vendor.o((...args) => $options.finishEditName && $options.finishEditName(...args)),
    j: $data.nickname,
    k: common_vendor.o(($event) => $data.nickname = $event.detail.value)
  }, {
    l: common_vendor.o((...args) => $options.changeAvatar && $options.changeAvatar(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
