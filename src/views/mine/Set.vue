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

    export default {
        name: "Set",
        methods:{
            pre() {
                this.$parent.closeDrawer()
            },
            logout(){
                logout().then(() =>{
                    this.$store.commit({
                        type: 'updateUserInfo',
                        data: {}
                    })
                    this.$router.push('/')
                    return
                });
            }
        }
    }
</script>

<style scoped>

</style>