<template>
    <el-container>
        <el-header>
            <el-page-header @back="pre" title=""></el-page-header>
        </el-header>
        <el-main class="el_main">
            <el-image :src="detailPhoto" fit="contain" lazy>
                <div slot="error" class="image-slot">
                    <el-image :src="errorImg"></el-image>
                </div>
            </el-image>
            <p>{{diary.diaryTitle}}</p>
            <div>
                <span>{{diary.diaryContent}}</span>
            </div>
            <div>
                <span>天气：{{diary.diaryWeather}}</span>
                <span>心情：{{diary.diaryMood}}</span>
                <span>事件：{{diary.diaryEvent}}</span>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import {getDiaryDetail} from 'js/diary/diary'
    import {login} from "js/login/login";

    export default {
        name: "Diary",
        data() {
            return {
                errorImg: require('assets/img/other/imgLoadFail.svg'),
                diary: null,
            }
        },
        mounted() {
            if (this.$route.params.diary !== undefined && this.$route.params.diary !== '') {
                this.diary = this.$route.params.diary
            }
            this.getDiaryDetail(this.$route.params.diaryId)

        },
        methods: {
            pre() {
                this.$router.back()
            },
            getDiaryDetail(diaryId) {
                let params = {
                    diaryId
                }
                getDiaryDetail(params).then(data => {
                    console.log('查询成功')
                    console.log(data)
                    this.diary = data
                })
            }

        },
        created() {
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
</style>