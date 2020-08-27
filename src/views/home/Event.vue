<template>

    <el-container>
        <el-header>
            <el-page-header @back="pre" title=""></el-page-header>
        </el-header>
        <el-main class="el_main">
            <keep-alive>
                <el-carousel ref="carousel" :autoplay="false" :loop="false" height="170px" indicator-position="outside"
                             arrow="never">
                    <el-carousel-item v-for="(eventTow,i) in eventList" :key="i">
                        <v-touch @swipeleft="left" @swiperight="right">
                            <el-radio-group v-model="event" @change="moodChange">
                                <el-row style="margin-top: 10px;margin-bottom: 10px" :gutter="20"
                                        v-for="(eventThree,i) in eventTow" :key="i">
                                    <el-col :span="8" v-for="(event,i) in eventThree">
                                        <el-radio-button size="medium" class="radio_width" :label="event" :key="i">
                                            {{getValue(event)}}
                                        </el-radio-button>
                                    </el-col>
                                </el-row>
                            </el-radio-group>
                        </v-touch>
                    </el-carousel-item>
                </el-carousel>
            </keep-alive>
            <el-row>
                <el-button type="primary" :disabled="event===''" @click="next">下一步</el-button>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import {getValue} from "commonjs/tool"

    export default {
        name: "Event",
        data() {
            return {
                eventList: [
                    [
                        ['MOVIE', 'GAME', 'FAMILY'],
                        ['TOURISM', 'RELATIONSHIP', 'FOOD'],
                        ['MUSIC', 'WORK', 'REST'],
                    ],
                    [
                        ['IMAGINATION', 'LEARNING', 'READING'],
                        ['MOVEMENT', 'ADJUST', 'FITNESS'],
                        ['LOVE', 'SHOPPING', 'ADVENTURE'],
                    ],
                    [
                        ['SICK', 'STAR', 'PET'],
                        ['AFTER_PLAY', 'CARTOON', 'INTERNET'],
                        ['ONLINE_SHOPPING', 'EAT_THE_MELON', 'STAY_UP_LATE'],
                    ],
                    [
                        ['DRAWING', 'COOKING', 'PLANT'],
                        ['BALANCE', 'BECOME_BEAUTIFUL', 'MILK_TEA'],
                        ['KEEPING_IN_GOOD_HEALTH', 'CLOTHES', 'OTHER'],
                    ]
                ],
                mood: '',
                weather: '',
                event: ''
            }
        },
        methods: {
            getValue(key) {
                return getValue('event', key)
            },
            moodChange() {
                this.$root.$data.sharedState.diaryContent.event = this.event
            },
            left() {
                this.$refs.carousel.next()
            },
            right() {
                this.$refs.carousel.prev()
            },
            next() {
                this.$router.push('/content')
            },
            pre() {
                this.$router.back()
            }

        },
        mounted() {
            this.event = this.$root.$data.sharedState.diaryContent.event
        }
    }
</script>

<style scoped>
    .weather_icon {
        width: 50px;
        height: 50px;
        display: inline;
    }
</style>