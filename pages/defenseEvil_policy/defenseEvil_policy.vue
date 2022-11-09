<template>
	<view>
		<view class="contentBox">
			<view class="topInfo">
				<view class="topImg">
					<u--image :showLoading="true" width="100%" height="370" src="../../static/images/geli.png">
					</u--image>
				</view>
				<view class="topText">
					<h3> 疫情隔离政策查询</h3>
				</view>
			</view>
			<view class="selectInfo">
				<view class="topInfo">
					<view class="topForm" @click="selectForm">
						<view class="topTitle">
							出发地
						</view>
						<view class="bottomShow">
							<view class="leftText">
								{{formText!==''?formText:'选择出发地'}}
							</view>
							<view class="rightIcon">
								<u-icon name="../../static/images/dropDown.svg"></u-icon>
							</view>
						</view>
					</view>
					<view class="transform" @click="transformToForm">
						<u-icon name="../../static/images/tran.svg" size="45"></u-icon>
					</view>
					<view class="topTo" @click="selectTo">
						<view class="topTitle">
							目的地
						</view>
						<view class="bottomShow">
							<view class="leftText">
								{{toText!==''?toText:'选择目的地'}}
							</view>
							<view class="rightIcon">
								<u-icon name="../../static/images/dropDown.svg"></u-icon>
							</view>
						</view>
					</view>
				</view>

				<view class="bottomInfo">
					<view class="explainText">
						<text> 更新时间：</text>
						<u--text :text="updateTime" color="#c5c5c5" mode="date"></u--text>
					</view>
				</view>
			</view>
			<view class="outMainInfo">
				<view class="titleInfo">
					<view class="type">
						出城
					</view>
					<view class="cityName risk">
						北京
					</view>
					<view class="HighRisk risk">
						<u-tag text="高风险地区" type="error" size="mini" icon="error-circle" plain></u-tag>
					</view>
					<view class="mediumRisk risk">
						<u-tag text="中风险地区" type="warning" size="mini" icon="warning" plain></u-tag>
					</view>
				</view>
				<!-- 出城政策 -->
				<view class="outCityWarning">
					<view class="topTitle">
						出城政策
					</view>
					<view class="contentInfo">
						在京党政机关、国有企事业单位人员带头执行，除重要公务活动需要外原则上不出京，确需出京的严格审批管理。提倡市民群众减少出京活动，确需出京的，要防范旅途疫情风险，全程规范佩戴口罩，做好个人防护，不前往有疫情的县（市、区、旗）。如途中出现涉疫风险，就地配合落实防疫措施，暂缓进返京。严控本地中高风险区及其他涉疫风险人员出京。
					</view>
				</view>
				<view class="highAndMedium">
					<view class="topTitle">
						136个中高风险地区
					</view>
					<view class="mainInfo">
						<u-tag text="高风险" size="mini" type="error" plain></u-tag>
						<text style="margin-left: 20rpx;"> 北京市平谷区平谷（渔阳地区）镇太和东园4号楼</text>
					</view>
					<view class="mainInfo">
						<u-tag text="中风险" size="mini" type="warning" plain></u-tag>
						<text style="margin-left: 20rpx;"> 北京市平谷区兴谷街道金乡西小区53号楼</text>
					</view>
					<view class="mainInfo">
						<u-tag text="高风险" size="mini" type="error" plain></u-tag>
						<text style="margin-left: 20rpx;"> 北京市石景山区苹果园街道海特花园57号楼1、2单元</text>
					</view>
					<view class="bottomInfo">
						<text> 数据来源：当地卫健委和权威网站 </text>
						<span style="display: flex;">发布时间：<u--text color="#c52c3c" :text="updateTime" mode="date">
							</u--text></span>
					</view>
				</view>

			</view>
			<view class="inMainInfo">
				<view class="titleInfo">
					<view class="type">
						进城
					</view>
					<view class="cityName risk">
						山西
					</view>
					<view class="HighRisk risk">
						<u-tag text="低风险地区" type="success" size="mini" icon="checkbox-mark" plain></u-tag>
					</view>
				</view>
				<view class="mainInfo">
					<view class="titleInfo">
						入城政策
					</view>
					<view class="contentInfo">
						1.对7天内有高风险区旅居史的返（抵）并人员，太原检疫登记信息系统为红标，健康码赋红码，落地核酸检测，实施“7天集中隔离医学观察+5次核酸检测”的管控措施，在第1、2、3、5、7天各开展一次核酸检测。
					</view>
					<view class="contentInfo">
						2.对7天内有中风险区旅居史的返（抵）并人员，太原检疫登记信息系统为黄标，健康码赋黄码，落地核酸检测，实施“7居家隔离医学观察+3次核酸检测”的管控措施，在第1、4、7天各开展一次核酸检测。
					</view>
					<view class="contentInfo">
						3.对7天内有低风险区旅居史的返（抵）并人员，太原检疫登记信息系统为蓝标，落地核酸检测，返（抵）并后3天内完成2次核酸检测，并做好健康监测，纳入社区管理，未按要求时限、频次落实核酸检测的赋黄码管理，完成核酸检测后转绿码。
					</view>
					<view class="contentInfo">
						4.省外无疫情县（市、区）的返（抵）并人员，太原检疫登记信息系统为绿标，落地核酸检测，在做好个人防护的前提下有序流动，3天内再完成2次核酸检测。
					</view>
					<view class="bottomInfo">
						<text> 数据来源：当地卫健委和权威网站 </text>
						<span style="display: flex;">发布时间：<u--text color="#c52c3c" :text="updateTime" mode="date">
							</u--text></span>
					</view>
				</view>

			</view>
			<!-- 选择列表 -->
			<view class="mpicker">
				<u-picker :show="showSelect" ref="uPicker" :columns="JSON.parse(JSON.stringify(this.columns))"
					@confirm="confirm" @change="changeHandler" @cancel="cancel" @close="cancel"
					:closeOnClickOverlay="true">
				</u-picker>
			</view>
		</view>
		<!-- 警告提示 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSelect: false,

				columns: [

				],
				formText: '',
				toText: '',
				updateTime: '',
				columnData: [

				],
				edit: '',
				allCityNumber: [],
				alertMessage: '',
				showAlert: false
			};
		},
		mounted() {
			// this.getOptions()
		},
		methods: {
			async getOptions() {
				// 获取城市信息
				const res = await this.$API.defenseEvilPolicyApi.getSelectOptions()
				const leftData = res.data.items.map((city) => {
					// 把id号存起来 点击确定时便利
					const cityData = {
						id: city.id,
						name: city.name
					}
					this.allCityNumber.push(cityData)
					return city.name
				})
				const rightData = res.data.items.map((city) => {
					const lastData = city.list.map((scity) => {
						const scityData = {
							id: scity.id,
							name: scity.name
						}
						this.allCityNumber.push(scityData)

						return scity.name
					})
					return lastData
				})
				this.columns.push(leftData);
				// 打开时右边的默认数据
				this.columns.push([res.data.items[0].list[0].name])
				this.columnData.push(rightData);
				// 获取时间戳
				this.updateTime = res.timestamp;

			},
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// 	// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, JSON.parse(JSON.stringify(this.columnData))[0][index])
				}
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				switch (this.edit) {
					case 'Form':
						this.formText = e.value[e.value.length - 1]
						this.searchInfoByName(e.value[e.value.length - 1], 'Form')
						break;
					case 'To':
						this.toText = e.value[e.value.length - 1]
						this.searchInfoByName(e.value[e.value.length - 1], 'To')
						break;
				}
				this.showSelect = false
			},
			cancel() {
				this.showSelect = false
			},
			selectForm() {
				this.edit = 'Form';
				this.showSelect = true;
			},
			selectTo() {
				this.edit = 'To';
				this.showSelect = true;
			},
			// 根据传递的name值获取id查找信息
			searchInfoByName(name, type) {
				let editId = null;
				this.allCityNumber.map((c) => {
					if (c.name == name) {
						editId = c.id;
					}
				})
				console.log(editId, type);
			},
			showToast(params) {
				this.$refs.uToast.show({
					...params,
				})
			},
			// 点击转换时候 切换名字 并获取信息
			transformToForm() {
				if (this.formText !== '' && this.toText !== '') {
					let temp = null;
					temp = this.formText;
					this.formText = this.toText;
					this.toText = temp;
					this.searchInfoByName(this.formText, 'Form')
					this.searchInfoByName(this.toText, 'To')
				} else {
					this.showToast({
						type: 'default',
						message: "请先选择城市信息",
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.contentBox {
		display: flex;
		flex-direction: column;
		background-color: #eef1f4;
		min-height: 100vh;
		align-items: center;
		padding-bottom:80rpx ;

		.topInfo {
			position: relative;
			width: 100%;

			.topText {
				position: absolute;
				top: 40%;
				left: 50%;
				width: 100%;
				text-align: center;
				font-style: italic;
				font-weight: bold;
				z-index: 999;
				font-size: 60rpx;
				transform: translate(-50%, -50%);
				background: linear-gradient(to bottom, #ffffff, #ffffff, #4fa2f0, #55aaff);
				color: transparent;
				background-clip: text;
			}
		}

		.selectInfo {
			position: relative;
			margin-top: -160rpx;
			width: 90%;
			background-color: white;
			border-radius: 15rpx;


			.topInfo {
				display: flex;
				padding: 30rpx;
				align-items: center;

				.topForm,
				.topTo {
					min-width: 214rpx;
					display: flex;
					flex-direction: column;

					.topTitle {
						color: #777;
						font-size: 24rpx;
					}

					.bottomShow {
						display: flex;
						padding-bottom: 20rpx;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1px solid #c5c5c5;

						.leftText {
							margin-top: 20rpx;
							color: #333333;
							font-size: 32rpx;
							font-weight: bold;
						}

						.rightIcon {
							margin-top: 20rpx;
							margin-left: 30rpx;
						}
					}
				}

				.transform {
					margin-top: 30rpx;
					padding: 0 70rpx 0 70rpx;
				}
			}

			.bottomInfo {

				padding: 0 30rpx 30rpx 30rpx;
				color: #c5c5c5;
				font-size: 24rpx;

				.explainText {
					display: flex;
					justify-content: start;
				}
			}
		}

		.outMainInfo {
			width: 90%;
			border-radius: 8rpx;
			background-color: white;
			flex-direction: column;
			display: flex;
			margin-top: 20rpx;

			.titleInfo {
				margin: 30rpx;
				width: 90%;
				display: flex;
				align-items: center;



				.type {
					font-size: 24rpx;
					min-width: 80rpx;
					min-height: 35rpx;
					text-align: center;
					border-radius: 5rpx;
					background-color: #e50003;
					color: white;
				}

				.cityName {
					font-weight: bold;
					font-size: 36rpx;

				}
			}

			.outCityWarning {
				display: flex;
				flex-direction: column;
				width: 90%;
				margin: 0 30rpx 30rpx;

				.topTitle {
					font-weight: bold;
					font-size: 34rpx;
				}

				.contentInfo {
					margin-top: 10rpx;
					font-size: 28rpx;
					text-indent: 40rpx;
					color: #4d4d4d;
					line-height: 60rpx;
				}
			}

			.highAndMedium {
				width: 90%;
				display: flex;
				flex-direction: column;
				margin: 0 30rpx 30rpx;

				.topTitle {
					font-weight: bold;
					font-size: 34rpx;

				}

				.mainInfo {
					margin: 15rpx 0 20rpx;
					display: flex;
					align-items: center;
					font-size: 26rpx;

				}

				.bottomInfo {
					font-size: 26rpx;
					color: #c5c5c5;
					display: flex;
					flex-direction: column;
					align-items: center;
					border-top: 1px solid #f0f0f0;
					padding: 20rpx;
				}
			}
		}

		.inMainInfo {
			width: 90%;
			border-radius: 8rpx;
			background-color: white;
			flex-direction: column;
			display: flex;
			margin-top: 25rpx;

			.titleInfo {
				margin: 30rpx 30rpx 0;
				width: 90%;
				display: flex;
				align-items: center;
				justify-content: start;

				.type {

					font-size: 24rpx;
					min-width: 80rpx;
					min-height: 35rpx;
					text-align: center;
					border-radius: 5rpx;
					background-color: #e50003;
					color: white;
				}

				.cityName {
					font-weight: bold;
					font-size: 36rpx;

				}
			}

			.mainInfo {
				width: 90%;
				display: flex;
				flex-direction: column;
				margin: 0 30rpx 30rpx 0;


				.titleInfo {
					font-weight: bold;
					font-size: 36rpx;

				}

				.contentInfo {
					margin: 15rpx 30rpx 0rpx;
					font-size: 28rpx;
					text-indent: 40rpx;
					line-height: 45rpx;
					color: #4d4d4d;
				}

				.bottomInfo {
					font-size: 26rpx;
					color: #c5c5c5;
					display: flex;
					flex-direction: column;
					align-items: center;
					border-top: 1px solid #f0f0f0;
					margin-top: 20rpx;
					padding: 20rpx;
				}

			}

		}

		.risk {
			margin-left: 40rpx;
		}

	}
</style>
