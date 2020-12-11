<template>
    <el-container>
        <nav-bar>
            <div slot="nav-left">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div slot="nav-center">历史</div>
            <div slot="nav-right">
                <i class="el-icon-setting"></i>
            </div>
        </nav-bar>
        <el-main class="el_main">
            <!--<el-input
                    placeholder="请输入内容"
                    v-model="diarySearch" style="margin-top: 40px">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>-->
            <scroll class="content" ref="scrollRef"
                    @scroll="contentScroll"
                    :probe-type="3"
                    :pull-up-load="true"
                    :pull-down-refresh="true"
                    @pullingUp="getDiaryList"
                    @pullingDown="refresh">
                <el-row v-for="(item,index) in diaryList" :key="index">
                    <el-col @click.native="intoDetail(item)">
                        <el-card shadow="always" class="diary_item">
                            <p class="line_limit_length">{{item.diaryTitle}}</p>
                            <el-image v-if="item.diaryPhoto" :src="item.diaryPhoto" fit="contain">
                                <div slot="error" class="image-slot">
                                    <el-image :src="errorImg"></el-image>
                                </div>
                            </el-image>
                            <div>
                                <p class="line_limit_length"
                                      style="color: rgb(144,144,144)">{{item.diaryContent}}</p>
                            </div>


                            <div class="float_left">
                                <el-tag type="info" size="mini" class="diary_tag">
                                    {{getFormatTime(item.diaryCreateTime)}}
                                </el-tag>
                            </div>
                            <div class="float_left" v-if="item.diaryLocation">
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
        </el-main>
    </el-container>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"
    import Scroll from "components/common/scroll/Scroll"
    import BackTop from "components/common/backTop/BackTop"

    import {getValue, formateDate} from "commonjs/tool"
    import {getDiaryList} from "../../js/diary/diary"

    export default {
        name: "History",
        components: {
            NavBar,
            Scroll,
            BackTop
        },
        data() {
            return {
                isShow: false,
                errorImg: require('assets/img/other/imgLoadFail.svg'),
                diarySearch: '',
                start: 0,
                size: 10,
                diaryList: []
            }
        },
        methods: {
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
            getDiaryList() {
                let params = {
                    userId: this.$store.getters.userInfo.userId,
                    diarySearch: this.diarySearch,
                    start: this.start,
                    size: this.size,
                }
                getDiaryList(params).then(data => {
                    if (data.code == '200') {
                        this.diaryList = data.data.result.filter(function (item) {
                            return item;
                        });
                        this.start++
                    }
                })
            },
            /**
             * 下拉刷新
             */
            refresh() {
                console.log('刷新日记信息')
                this.start = 0
                this.diaryList = []
                this.getDiaryList()
                this.$refs.scrollRef.finishPullDown()
            },
            /**
             * 进入日记详情
             */
            intoDetail(diary) {
                console.log('日记详情')
                this.$router.push({
                    name: '/diaryDetail',
                    params: {
                        diary: diary
                    }
                })
            }
        },
        mounted() {

        },
        created() {
            this.getDiaryList()
        }
    }
</script>

<style scoped>
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