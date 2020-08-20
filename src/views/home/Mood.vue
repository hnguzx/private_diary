<template>


    <el-container>
        <el-header>
            <el-page-header @back="pre" title=""></el-page-header>
        </el-header>

        <el-main class="el_main">
            <keep-alive>
                <el-carousel ref="carousel" :autoplay="false" :loop="false" height="170px" indicator-position="outside"
                             arrow="never">
                    <el-carousel-item v-for="(moodTow,i) in moodList" :key="i">
                        <v-touch @swipeleft="left" @swiperight="right">
                            <el-radio-group v-model="mood" @change="moodChange">
                                <el-row style="margin-top: 10px;margin-bottom: 10px" :gutter="20"
                                        v-for="(moodThree,i) in moodTow" :key="i">
                                    <el-col :span="8" v-for="(mood,i) in moodThree">
                                        <el-radio-button size="medium" class="radio_width" :label="mood" :key="i">
                                            {{getValue(mood)}}
                                        </el-radio-button>
                                    </el-col>
                                </el-row>
                            </el-radio-group>
                        </v-touch>
                    </el-carousel-item>
                </el-carousel>
            </keep-alive>

            <el-row>
                <el-button type="primary" :disabled="mood===''" @click="next">下一步</el-button>
            </el-row>

        </el-main>
    </el-container>
</template>

<script>
    import {getValue} from "commonjs/tool"

    export default {
        name: "Mood",
        data() {
            return {
                moodList: [
                    [
                        ['HAPPY', 'ENRICH', 'SURPRISED'],
                        ['PROUD', 'WARM', 'TOUCH'],
                    ],
                    [
                        ['SORRY', 'AGITATED', 'LOST'],
                        ['LONELY', 'ANGRY', 'EMBARRASSED'],
                    ],
                    [
                        ['INJUSTICE', 'SWEET', 'DREAM'],
                        ['TIRED', 'ESCAPE', 'IT_IS_A_LONG_STORY'],
                    ]
                ],
                mood: '',
                weather: ''
            }
        },
        methods: {
            getValue(key) {
                return getValue('mood', key)
            },
            next() {
                this.$router.push('/event')
            },
            pre() {
                this.$router.back()
            },
            moodChange() {
                this.$root.$data.sharedState.diaryContent.mood = this.mood
            },
            left() {
                this.$refs.carousel.next()
            },
            right() {
                this.$refs.carousel.prev()
            }

        },
        mounted() {
            this.mood = this.$root.$data.sharedState.diaryContent.mood
        },
        created() {
            console.log('create...')
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