<template>
    <el-container>
        <el-header>
            <el-button @click="pre">返回</el-button>
            <span>正式编写日记</span>
        </el-header>
        <el-main>
            <!--<el-upload action="#" :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload">
                <el-avatar></el-avatar>
                <img v-if="imageUrl" :src="imageUrl"/>
                <i v-else class="el-icon-plus">添加标题图片</i>
            </el-upload>-->
            <el-input placeholder="请输入日记标题" clearable v-model="diaryTitle"></el-input>
            <el-input type="textarea" :raws="4" v-model="diaryContent" :autosize="{minRows:4,maxRows:4}"
                      placeholder="请输入日记内容"></el-input>
            <el-input placeholder="请选择当前位置" clearable v-model="location"></el-input>
            <el-button @click="openMap">获取当前位置</el-button>
            <div id="container" style="width: 500px;height: 300px">

            </div>
        </el-main>
    </el-container>
</template>

<script>
    import AMap from 'AMap'
    import location from 'commonjs/positionLocation'

    export default {
        name: "Diary",
        data() {
            return {
                imageUrl: '',
                diaryTitle: '',
                diaryContent: '',
                location: ''
            }
        },
        mounted() {
            // this.getLocation(); // 调用获取地理位置
        },
        methods: {
            next() {
                this.$router.push('/diary')
            },
            pre() {

                this.$router.push('/event')
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            openMap(){
                let map = new AMap.Map('container',{
                    zoom:15, //地图的缩放等级
                    // center:[], // 地图的中心点坐标

                })

                AMap.plugin([
                    'AMap.ToolBar',
                    'AMap.Scale',
                    'AMap.OverView',
                    'AMap.MapType',
                    'AMap.Geolocation'
                ],function () {
                    map.addControl(new AMap.Geolocation());
                    map.addControl(new AMap.ToolBar());
                })
            },
            /** 获取高德地图定位 */
            getLocation() {
                let _that = this
                let geolocation = location.initMap('map-container') // 定位
                AMap.event.addListener(geolocation, 'complete', result => {
                    console.log(result)
                    _that.lat = result.position.lat
                    _that.lng = result.position.lng
                    _that.location = result.addressComponent.building
                })
            }

        }
    }
</script>

<style scoped>

</style>