<template>
    <div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <tab-bar>
            <tab-bar-item path="/main/home">
                <img slot="tabbar-icon" src="~assets/img/tabbar/home.svg">
                <img slot="tabbar-icon-active" src="~assets/img/tabbar/home_act.svg">
                <div slot="tabbar-text">{{tabTest[0]}}</div>
            </tab-bar-item>
            <tab-bar-item path="/main/square">
                <img slot="tabbar-icon" src="~assets/img/tabbar/square.svg">
                <img slot="tabbar-icon-active" src="~assets/img/tabbar/square_act.svg">
                <div slot="tabbar-text">{{tabTest[1]}}</div>
            </tab-bar-item>
            <tab-bar-item path="/main/history">
                <img slot="tabbar-icon" src="~assets/img/tabbar/history.svg">
                <img slot="tabbar-icon-active" src="~assets/img/tabbar/history_act.svg">
                <div slot="tabbar-text">{{tabTest[2]}}</div>
            </tab-bar-item>
            <tab-bar-item path="/main/mine">
                <img slot="tabbar-icon" src="~assets/img/tabbar/mine.svg">
                <img slot="tabbar-icon-active" src="~assets/img/tabbar/mine_act.svg">
                <div slot="tabbar-text">{{tabTest[3]}}</div>
            </tab-bar-item>
        </tab-bar>
    </div>
</template>

<script>
    import {TabBar, TabBarItem} from "components/common/tabbar"

    export default {
        name: "Home",
        components: {
            TabBar,
            TabBarItem
        },
        data() {
            return {
                tabTest: ['首页', '广场', '历史', '我的']
            }
        },
    }
</script>

<style scoped>

</style>
