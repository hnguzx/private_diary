<template>
    <div>
        <el-header>
            <el-page-header @back="pre" title=""></el-page-header>
        </el-header>

        <el-container>
            <el-row>
                <el-button plain @click="logout">退出当前账号</el-button>
            </el-row>
        </el-container>
    </div>
</template>

<script>
    import {logout} from "js/user/user"
    import {disConnect} from "js/login/login";

    export default {
        name: "Set",
        data(){
            return{
            }
        },
        methods:{
            pre() {
                this.$parent.closeDrawer()
            },
            logout(){
                let params = {
                    username:this.$store.getters.userInfo.userName
                }
                logout(params).then(() =>{
                    this.$store.commit({
                        type: 'updateUserInfo',
                        data: {}
                    })
                    disConnect()
                    this.$router.push('/')
                    return
                });
            }
        }
    }
</script>

<style scoped>

</style>