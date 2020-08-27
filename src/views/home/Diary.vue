<template>
    <el-container>
        <el-header>
            <el-page-header @back="pre" title=""></el-page-header>
        </el-header>
        <el-main class="el_main">
            <el-upload
                    ref="detailPhoto"
                    name="detailPhoto"
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input placeholder="请输入日记标题" clearable v-model="diaryTitle"></el-input>
            <el-input type="textarea" :raws="4" v-model="diaryContent" :autosize="{minRows:4,maxRows:4}"
                      placeholder="请输入日记内容"></el-input>
            <el-input disabled="disabled" placeholder="请选择当前位置" clearable v-model="diaryLocation"></el-input>
            <el-row>
                <el-button style="float: left" @click="getLocation">获取当前位置</el-button>
            </el-row>

            <el-row>
                <el-button class="save-button" type="primary" @click="saveDiary">保存日志</el-button>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import AMap from 'AMap'
    import location from 'commonjs/positionLocation'
    import {saveDiary} from "js/diary/diary"

    export default {
        name: "Diary",
        data() {
            return {
                uploadUrl: 'http://localhost/diary/uploadImg',
                imageUrl: '',
                diaryTitle: '',
                diaryContent: '',
                diaryLocation: '',
                diaryLongitude: '',
                diaryLatitude: ''
            }
        },
        methods: {
            pre() {
                this.$router.back()
            },
            /** 图片上传成功 */
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            /**  正式上传之前 */
            beforeAvatarUpload(file) {
                const isJPG = file.type.includes('image');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            /** 获取高德地图定位 */
            getLocation() {
                let _this = this
                let geolocation = location.initMap('map-container') // 定位
                AMap.event.addListener(geolocation, 'complete', result => {
                    console.log(result)
                    _this.lat = result.position.lat
                    _this.lng = result.position.lng
                    _this.diaryLocation = result.formattedAddress
                    _this.diaryLongitude = result.position.lng
                    _this.diaryLatitude = result.position.lat
                })

            },
            /**
             * 保存日记
             */
            saveDiary() {
                let diaryData = {
                    userId: this.$store.getters.userInfo.userId,
                    diaryTitle: this.diaryTitle,
                    diaryWeather: this.$root.$data.sharedState.diaryContent.weather,
                    diaryMood: this.$root.$data.sharedState.diaryContent.mood,
                    diaryEvent: this.$root.$data.sharedState.diaryContent.event,
                    diaryLocation: this.diaryLocation,
                    detailContent: this.diaryContent,
                    diaryLongitude: this.diaryLongitude,
                    diaryLatitude: this.diaryLatitude
                }
                let detailPhoto = ''
                if (this.$refs.detailPhoto.uploadFiles.length > 0) {
                    detailPhoto = this.$refs.detailPhoto.uploadFiles[0].raw;
                }
                diaryData = JSON.stringify(diaryData)
                let formData = new FormData()
                formData.append("detailPhoto", detailPhoto)
                formData.append("diary", new Blob([diaryData], {type: "application/json"}))

                saveDiary(formData).then(data => {
                    if (data.code == '200') {
                        this.$router.push({
                            path: '/main/home',
                            query: {
                                isHome: true
                            }
                        })
                    }
                })
            }

        }
    }
</script>

<style scoped>
    .avatar-uploader el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .save-button {
        position: fixed;
        left: calc(100vw / 2 - 49px);
        bottom: 70px;
    }
</style>