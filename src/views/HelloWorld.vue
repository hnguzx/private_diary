<template>
    <el-container>
        <el-aside width="20px" style="background-color: green;height: 2000px"></el-aside>
        <el-container>
            <el-header style="background-color: red">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple-dark"></div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple-dark"></div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple-dark"></div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple-dark">
                            <el-button type="primary" @click="testQuest()">测试接口</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main style="background-color: yellow"></el-main>
            <el-footer style="background-color: black"></el-footer>
        </el-container>
    </el-container>
</template>

<script>
    import {testQuest} from "../js/HelloWorld";


    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data() {
            return {}
        },
        methods: {
            testQuest() {
                testQuest().then(data => {
                    var repo = JSON.stringify(data)
                    console.log("success：" + repo)
                }).catch(error => {
                    console.log("fail：" + error)
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-row {
        margin-bottom: 20px;

    &
    :last-child {
        margin-bottom: 0;
    }

    }
    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
