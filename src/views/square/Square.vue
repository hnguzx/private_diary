<template>
    <el-container>
        <nav-bar>
            <div slot="nav-left">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div slot="nav-center">广场</div>
            <div slot="nav-right">
                <i class="el-icon-setting" @click="getVerifyCode"></i>
            </div>
        </nav-bar>
        <el-main class="el_main">
            <scroll class="content" ref="scrollRef"
                    @scroll="contentScroll"
                    :probe-type="3"
                    :pull-up-load="true"
                    :pull-down-refresh="true"
                    @pullingUp="getBlogList"
                    @pullingDown="refresh">
                <el-row v-for="(item,index) in blogList" :key="index">
                    <el-col @click.native="intoDetail(item)">
                        <el-card shadow="always" class="diary_item">
                            <p class="line_limit_length">{{item.diaryTitle}}</p>
                            <el-image v-if="item.diaryPhoto" :src="item.diaryPhoto" fit="contain" lazy>
                                <div slot="error">
                                    <el-image :src="errorImg"></el-image>
                                </div>
                            </el-image>
                            <div>
                                <p class="line_limit_length">{{item.diaryContent}}</p>
                            </div>


                            <div class="float_left">
                                <el-tag type="info" size="mini" class="diary_tag">
                                    {{getFormatTime(item.diaryCreateTime)}}
                                </el-tag>
                            </div>
                            <div class="float_left">
                                <el-tag type="info" size="mini" class="diary_tag line_limit_length">
                                    {{item.diaryLocation}}
                                </el-tag>
                            </div>
                            <div class="float_left">
                                <el-tag type="success" size="mini" class="diary_tag">
                                    {{getDataValue('weather',item.diaryWeather)}}
                                </el-tag>
                                <el-tag type="success" size="mini" class="diary_tag">
                                    {{getDataValue('mood',item.diaryMood)}}
                                </el-tag>
                                <el-tag type="success" size="mini" class="diary_tag">
                                    {{getDataValue('event',item.diaryEvent)}}
                                </el-tag>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </scroll>
            <back-top @click.native="backClick" v-show="isShow"/>
<!--            <el-image @click="addBlog" class="add_img" :src="addImg"></el-image>-->
            <el-image @click="getVerifyCode" class="add_img" :src="addImg"></el-image>
        </el-main>
    </el-container>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"
    import Scroll from "components/common/scroll/Scroll"
    import BackTop from "components/common/backTop/BackTop"

    import {getValue, formateDate} from "commonjs/tool"
    import {getVerifyCode} from "js/user/user"

    export default {
        name: "Square",
        components: {
            NavBar,
            Scroll,
            BackTop
        },
        data() {
            return {
                addImg: require('assets/img/other/add.svg'),
                isShow: false,
                errorImg: require('assets/img/other/imgLoadFail.svg'),
                diarySearch: '',
                blogList: []
            }
        },
        methods: {

            getVerifyCode() {
                debugger
                    let params = {
                        emailOrPhone: 'hnguzx@qq.com',
                    };
                    getVerifyCode(params).then(data => {
                        this.$message({
                            showClose: false,
                            message: '验证码发送成功!',
                            type: "success"
                        });
                        this.forbiddenButtonTime = 60
                        this.buttonText = this.forbiddenButtonTime + '秒后重新获取'
                        this.timer = setInterval(this.preventReSub, 1000)
                    })
            },
            /**
             * 获取数据字典信息
             * @param key
             * @param value
             * @returns {*}
             */
            getDataValue(key, value) {
                return getValue(key, value)
            },
            /**
             * 格式化时间
             * @param value
             * @returns {*}
             */
            getFormatTime(value) {
                return formateDate(value)
            },
            /**
             * 新增博客
             */
            addBlog() {
                console.log('新增博客')
            },
            /**
             * 监控滚动位置
             * @param position
             */
            contentScroll(position) {
                this.isShow = position.y < (-200);
            },
            /**
             * 返回顶部
             */
            backClick() {
                this.$refs.scrollRef.scrollTop(0, 0);
            },
            /**
             * 获取日记信息
             */
            getBlogList() {
                console.log('获取日记信息')
                this.$refs.scrollRef.finishPullUp()
            },
            /**
             * 下拉刷新
             */
            refresh() {
                console.log('刷新日记信息')
                this.$refs.scrollRef.finishPullDown()
            },
        }
    }
</script>

<style scoped>
    .add_img {
        position: fixed;
        left: calc(100vw / 2 - 25px);
        bottom: 70px;
        width: 50px;
        height: 50px;
    }

    .line_limit_length {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; /*加宽度width属来兼容部分浏览*/
    }

    .diary_image {
        width: 100%;
        height: 200px;
    }

    .diary_item {
        margin-bottom: 20px;
        padding: 10px
    }

    .diary_tag {
        margin-top: 10px;
        margin-right: 10px;
    }
</style>