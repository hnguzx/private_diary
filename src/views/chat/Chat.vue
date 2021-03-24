<template>
    <el-container style="padding-top: 44px">
        <nav-bar>
            <div slot="nav-left">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div slot="nav-center">聊天</div>
            <div slot="nav-right" @click="searchFriend">
                <i class="el-icon-setting"></i>
            </div>
        </nav-bar>
        <el-main>
            <el-row>
                <el-input placeholder="请输入聊天内容" v-model="msg" clearable></el-input>
            </el-row>
            <el-row>
                <el-input placeholder="请输入要发送的用户" type="number" v-model="receiver" clearable></el-input>
            </el-row>
            <el-row>
                <div v-for="item in messageList">
                    <h2>{{item.msgContent}}</h2>
                </div>
            </el-row>

            <!--<el-row>
                <h2>{{add}}</h2>
                <h2>{{webSocketIP}}</h2>
                <h2>{{token}}</h2>
                <h2>{{subtraction}}</h2>
            </el-row>-->
        </el-main>
        <el-footer>
            <el-row style="position: absolute;bottom: 50px">
                <el-button type="primary" @click="openConnect">Connected</el-button>
                <el-button type="primary" @click="disConnect">DisConnected</el-button>
                <el-button type="info" @click="sendMsg">send</el-button>
                <el-button type="info" @click="addFriend">send</el-button>
            </el-row>
        </el-footer>

    </el-container>
</template>

<script>


    import NavBar from "components/common/navbar/NavBar";
    import {mapState, mapGetters,mapMutations,mapActions} from 'vuex'

    export default {
        name: "Chat",
        components: {
            NavBar
        },
        data() {
            return {
                messageList: [],
                // stompClient: {},
                data:{},
                msg: '',
                receiver: 0
            }
        },
        methods: {
            searchFriend() {
                this.$prompt('请输入好友邮箱', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true,
                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '邮箱格式不正确'
                }).then((value) => {
                    addFriend(value)
                    this.$message({
                        type: 'success',
                        message: '发送请求查询好友信息'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        // message: '取消输入'
                    })
                });
            },
            addFriend(userEmail) {
                /*this.$store.commit({
                    type: 'token',
                    data: {
                        name:'aaa'
                    }
                })*/
                /*this.$store.dispatch('syncAction')
                this.$store.dispatch({
                    type:'syncAction',
                    data:{
                        name:'ccc'
                    }
                })*/
                /*this.syncAction({
                    data:{
                        name:'ggg'
                    }
                })*/
                this.asyncAction()
            },


            /**
             * mutations中的方法
             */
            ...mapMutations([
                'updateUserInfo',
                'asyncAction'
            ]),
            ...mapActions([
                'syncAction'
            ])
        },
        mounted() {
            // this.openConnect();
            // this.receivedMsg();
            let {x, y, ...z} = {x: 1, y: 2, a: 4, b: 4};
            console.log(z);
            // getters中可以传参

            console.log(this.$store.getters.token)

        },
        computed: {
            ...mapState({}),
            ...mapGetters([
                'webSocketIP',
                'token'
            ]),
            add() {
                return 2 + 2;
            },
            subtraction:{
                get(){
                    return '使用了set和get方法的计算属性';
                },
                set(value){

                }
            }
        }
    }
</script>

<style scoped>

</style>