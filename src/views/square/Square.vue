<template>
    <el-container>
        <nav-bar>
            <div slot="nav-left">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div slot="nav-center">广场</div>
            <div slot="nav-right">
                <i class="el-icon-setting"></i>
            </div>
        </nav-bar>
        <el-main class="el_main">
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
                            <el-image v-if="item.detailPhoto" :src="item.detailPhoto" fit="contain" lazy>
                                <div slot="error" class="image-slot">
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
            <el-image class="add_img" :src="addImg"></el-image>
        </el-main>
    </el-container>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"
    import Scroll from "components/common/scroll/Scroll"
    import BackTop from "components/common/backTop/BackTop"

    import {getValue, formateDate} from "commonjs/tool"

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
                diaryList: [
                    {
                        diaryId: '1',
                        diaryTitle: '日记标题日记标题日记标题日记标题日记标题日记标题日记标题日记标题',
                        diaryContent: '日记主要内容日记主要内容日记主要内容日记主要内容日记主要内容',
                        diaryCreateTime: '20200301',
                        diaryLocation: '广东省深圳市南山区南山街道永新工业区永新汇',
                        diaryWeather: 'SUNNY_NIGHT',
                        diaryMood: 'HAPPY',
                        diaryEvent: 'MUSIC'
                    },
                    {
                        diaryId: '2',
                        diaryTitle: '日记标题日记标题日记标题日记标题日记标题日记标题日记标题日记标题',
                        diaryContent: '日记主要内容日记主要内容日记主要内容日记主要内容日记主要内容',
                        detailPhoto: '123',
                        diaryCreateTime: '20200301',
                        diaryLocation: '广东省深圳市南山区南山街道永新工业区永新汇',
                        diaryWeather: 'SUNNY_NIGHT',
                        diaryMood: 'HAPPY',
                        diaryEvent: 'MUSIC'
                    },
                    {
                        diaryId: '3',
                        diaryTitle: '日记标题日记标题日记标题日记标题日记标题日记标题日记标题日记标题',
                        diaryContent: '日记主要内容日记主要内容日记主要内容日记主要内容日记主要内容',
                        detailPhoto: 'http://10.239.74.180:81/File/20200817/2/2/1/7/7ff9ff8cfa9740.png',
                        diaryCreateTime: '20200301',
                        diaryLocation: '广东省深圳市南山区南山街道永新工业区永新汇',
                        diaryWeather: 'SUNNY_NIGHT',
                        diaryMood: 'HAPPY',
                        diaryEvent: 'MUSIC'
                    }
                ]
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