<template>
	<view class="page">
		<image class="bg-image" src="https://mpad.oss-cn-beijing.aliyuncs.com/kwx/kwx941.png" mode="aspectFill"></image>
		<!-- 顶部蓝色背景区域 -->
		<view class="header">
			<view class="header-content">
				<!-- logo -->
				<view class="logo-row">
					<image class="logo-icon" src="https://mpad.oss-cn-beijing.aliyuncs.com/kwx/kwx942.png" mode="aspectFit">
					</image>
					<text class="logo-text">扩扩帮</text>
				</view>
				<!-- 标语 -->
				<view class="slogan">
					<text class="slogan-main">有问题，找朋友！</text>
				</view>
				<view class="slogan-sub-row">
					<image class="horn-icon" src="https://mpad.oss-cn-beijing.aliyuncs.com/kwx/kwx870.png" mode="aspectFit">
					</image>
					<text class="slogan-sub">真朋友，更愿意一起解决问题</text>
				</view>
			</view>
		</view>

		<!-- 能力图卡片 -->
		<view class="card">
			<view class="card-top">
				<view class="user-info">
					<view class="avatar-wrap" @click="changeAvatar">
						<image class="avatar" v-if="avatarUrl" :src="avatarUrl" mode="aspectFill"></image>
						<view class="avatar-default" v-else></view>
					</view>
					<view class="user-name-area">
						<text class="user-name" v-if="!isEditingName" @click="startEditName">{{ nickname }}</text>
						<input class="name-input" v-else v-model="nickname" :focus="isEditingName" @blur="finishEditName"
							@confirm="finishEditName" placeholder="输入昵称" />
						<text class="ability-label" space="emsp"> 的能力图</text>
					</view>
				</view>
				<view class="change-avatar" @click="changeAvatar">
					<text class="change-avatar-text">更换头像</text>
					<image class="arrow-icon" src="https://mpad.oss-cn-beijing.aliyuncs.com/kwx/kwx411.png" mode="aspectFit">
					</image>
				</view>
			</view>

			<!-- 能力数据区域 -->
			<view class="stats-area">
				<!-- <image class="stats-bg" src="https://mpad.oss-cn-beijing.aliyuncs.com/kwx/kwx940.png" mode="aspectFill"></image> -->
				<view class="stats-content">
					<view class="stat-item">
						<view class="stat-icon-wrap">
							<image class="stat-item-bg" src="https://mpad.oss-cn-beijing.aliyuncs.com/kwx/kwx940.png"
								mode="aspectFill"></image>
							<text class="stat-num">10</text>
						</view>
						<text class="stat-label">可求助好友</text>
					</view>
					<view class="stat-item">
						<view class="stat-icon-wrap">
							<image class="stat-item-bg" src="https://mpad.oss-cn-beijing.aliyuncs.com/kwx/kwx940.png"
								mode="aspectFill"></image>
							<text class="stat-num">10</text>
						</view>
						<text class="stat-label">可提供帮助</text>
					</view>
					<view class="stat-item">
						<view class="stat-icon-wrap">
							<image class="stat-item-bg" src="https://mpad.oss-cn-beijing.aliyuncs.com/kwx/kwx940.png"
								mode="aspectFill"></image>
							<text class="stat-num">0</text>
						</view>
						<text class="stat-label">获得点赞</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			avatarUrl: '',
			nickname: '李雷',
			isEditingName: false
		}
	},
	onLoad() {
		// 从缓存读取头像
		const cachedAvatar = uni.getStorageSync('userAvatar');
		if (cachedAvatar) {
			this.avatarUrl = cachedAvatar;
		}
		// 从缓存读取昵称
		const cachedName = uni.getStorageSync('userNickname');
		if (cachedName) {
			this.nickname = cachedName;
		}
	},
	methods: {
		// 点击更换头像
		changeAvatar() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					const tempFilePath = res.tempFilePaths[0];
					uni.saveFile({
						tempFilePath: tempFilePath,
						success: (saveRes) => {
							this.avatarUrl = saveRes.savedFilePath;
							uni.setStorageSync('userAvatar', saveRes.savedFilePath);
							uni.showToast({
								title: '头像更换成功',
								icon: 'success'
							});
						},
						fail: () => {
							this.avatarUrl = tempFilePath;
							uni.setStorageSync('userAvatar', tempFilePath);
							uni.showToast({
								title: '头像更换成功',
								icon: 'success'
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
				this.nickname = '李雷';
			}
			uni.setStorageSync('userNickname', this.nickname);
		}
	}
}
</script>

<style scoped>
.page {
	min-height: 100vh;
	background-color: #f5f5f5;
	position: relative;
}

/* 顶部蓝色区域 */
.header {
	position: relative;
	width: 100%;
	z-index: 1;
}

.bg-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 0;
}

.header-content {
	position: relative;
	z-index: 1;
	padding: 30rpx 40rpx;
}

/* logo行 */
.logo-row {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 30rpx;
}

.logo-icon {
	width: 40rpx;
	height: 52rpx;
	/* margin-right: 4rpx; */
}

.logo-text {
	font-size: 30rpx;
	color: #ffffff;
	font-weight: bold;
}

/* 标语 */
.slogan {
	margin-bottom: 16rpx;
	text-align: center;
}

.slogan-main {
	font-size: 52rpx;
	font-weight: bold;
	color: #ffffff;
}

.slogan-sub-row {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background: linear-gradient(to right, transparent, rgba(12, 82, 196, 0.5) 30%, rgba(12, 82, 196, 0.5) 70%, transparent);
	border-radius: 0;
	padding: 10rpx 24rpx;
	margin: 0 auto;
	width: fit-content;
}

.horn-icon {
	width: 32rpx;
	height: 32rpx;
	margin-right: 10rpx;
}

.slogan-sub {
	font-size: 28rpx;
	color: rgba(255, 255, 255, 0.85);
}

/* 能力图卡片 */
.card {
	margin: 100rpx 24rpx 0;
	background-color: #CDDBFE;
	border-radius: 24rpx;
	padding: 36rpx 30rpx 0;
	position: relative;
	z-index: 2;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.card-top {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30rpx;
}

.user-info {
	display: flex;
	flex-direction: row;
	align-items: center;
	flex: 1;
}

.avatar {
	width: 72rpx;
	height: 72rpx;
	border-radius: 50%;
	background-color: #e0e0e0;
}

.avatar-wrap {
	width: 72rpx;
	height: 72rpx;
	margin-right: 16rpx;
	flex-shrink: 0;
}

.avatar-default {
	width: 72rpx;
	height: 72rpx;
	border-radius: 50%;
	background-color: #d0d0d0;
}

.user-name-area {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.user-name {
	font-size: 32rpx;
	font-weight: bold;
	color: #333333;
}

.name-input {
	font-size: 32rpx;
	font-weight: bold;
	color: #333333;
	width: 140rpx;
	border-bottom: 2rpx solid #4B8FFB;
	padding: 0;
	height: 50rpx;
}

.ability-label {
	font-size: 32rpx;
	font-weight: bold;
	color: #333333;
}

.change-avatar {
	display: flex;
	flex-direction: row;
	align-items: center;

}

.change-avatar-text {
	font-size: 26rpx;
	color: #4B8FFB;
}

.arrow-icon {
	width: 24rpx;
	height: 24rpx;
	margin-left: 6rpx;
}

/* 能力数据区域 */
.stats-area {
	position: relative;
	width: 100%;
	height: 240rpx;
	border-radius: 0 0 24rpx 24rpx;
	overflow: hidden;
}

.stats-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 20rpx;
}

.stats-content {
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	height: 100%;
	padding: 0 20rpx;
}

.stat-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.stat-icon-wrap {
	position: relative;
	width: 160rpx;
	height: 160rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.stat-item-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
}

.stat-num {
	font-size: 56rpx;
	font-weight: bold;
	color: #0f59cf;
	position: relative;
	z-index: 1;
}

.stat-label {
	font-size: 24rpx;
	color: #0f59cf;
	margin-top: 12rpx;
}
</style>
