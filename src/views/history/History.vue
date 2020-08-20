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
            <scroll class="content" ref="scrollRef"
                    @scroll="contentScroll"
                    :probe-type="3"
                    :pull-up-load="true"
                    @pullingUp="getDiaryList">
                <el-row v-for="(item,index) in diaryList" :key="index">
                    <el-col @click="intoDetail(item.diaryId)">
                        <el-card shadow="always" class="diary_item">
                            <p class="line_limit_length">{{item.diaryTitle}}</p>
                            <el-image :src="item.detailPhoto" fit="contain" lazy>
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
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
        </el-main>
    </el-container>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"
    import Scroll from "components/common/scroll/Scroll"
    import BackTop from "components/common/backTop/BackTop";

    import {getValue, formateDate} from "commonjs/tool"

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
                diaryList: [
                    {
                        diaryId: '1',
                        diaryTitle: '日记标题日记标题日记标题日记标题日记标题日记标题日记标题日记标题',
                        diaryContent: '日记主要内容日记主要内容日记主要内容日记主要内容日记主要内容',
                        detailPhoto: 'http://10.239.74.180:81/File/20200817/2/2/1/7/7ff9ff8cfa9740.png',
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
                        detailPhoto: 'http://10.239.74.180:81/File/20200817/2/2/1/7/7ff9ff8cfa9740.png',
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
            getDataValue(key, value) {
                return getValue(key, value)
            },
            getFormatTime(value) {
                return formateDate(value)
            },
            contentScroll(position) {
                this.isShow = position.y < (-100);
            },
            backClick() {
                this.$refs.scrollRef.scrollTop(0, 0);
            },
            getDiaryList() {
                console.log('获取日记信息1')
                this.$refs.scrollRef.finishPullUp();
            },
            intoDetail() {
                console.log('日记详情')
            }
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