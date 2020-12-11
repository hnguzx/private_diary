<template>
    <el-container>
        <nav-bar>
            <div slot="nav-left">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div slot="nav-center">聊天</div>
            <div slot="nav-right" @click="searchFriend">
                <i class="el-icon-setting"></i>
            </div>
        </nav-bar>
        <el-card style="margin-top: 44px">
            <div v-for="item in messageList">
                <p>{{item}}</p>
            </div>
        </el-card>

    </el-container>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"

    export default {
        name: "Chat",
        components: {
            NavBar
        },
        data(){
            return {
                messageList:[
                    'hi',
                    'hello'
                ]
            }
        },
        methods:{
            searchFriend(){
                this.$prompt('请输入好友邮箱','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    center:true,
                    inputPattern:/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '邮箱格式不正确'
                }).then((value) => {
                    addFriend(value)
                    this.$message({
                        type:'success',
                        message:'发送请求查询好友信息'
                    })
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    })
                });
            },
            addFriend(userEmail){

            },
            initWebSocket(){
                debugger
                var webSocket = null;
                // 判断游览器是否支持websocket
                if (typeof (WebSocket) != "undefined") {
                    // var userId = $("#userId").val();
                    var url = 'ws://'+window.location.host+'/ws';
                    webSocket = new WebSocket(url)
                } else {
                    alert("该游览器不支持！")
                }
            },
            sendMessage(){

            }
        },
        mounted() {
            this.initWebSocket();
        }
    }
</script>

<style scoped>

</style>