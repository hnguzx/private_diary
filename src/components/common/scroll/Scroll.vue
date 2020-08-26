<template>
    <div class="wrapper" ref="swiper">
        <!-- wrapper里面只能放一个元素，就是滚动的 -->
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';

    export default {
        name: "Scroll",
        props: {
            probeType: {
                type: Number,
                default() {
                    //默认是0， 不监听滚动
                    return 0;
                }
            },
            pullUpLoad: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            pullDownRefresh: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        },
        data() {
            return {
                scroll: null
            };
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.swiper, {
                click: true,
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad,
                pullDownRefresh: this.pullDownRefresh,

                pullUpLoad: {
                    threshold: -50 // 当上拉距离超过20px时触发 pullingUp 事件
                },
                pullDownRefresh: {
                    threshold: 90,
                    top: 40
                }
            })
            // 监听滚动的位置;
            this.scroll.on("scroll", position => {
                this.$emit("scroll", position);
            }),
            //监听上拉加载事件
            this.scroll.on('pullingUp', () => {
                //发射一个自定义事件
                this.$emit('pullingUp');
            }),
            //监听下拉刷新事件
            this.scroll.on('pullingDown', () => {
                //发射一个自定义事件
                this.$emit('pullingDown');
            }),
            this.scrollTop(0, 0)
        },
        created() {
        },
        methods: {
            //返回顶部
            scrollTop(x, y, time = 300) {
                //给它在外面做一层封装, 给它设置一个默认的滚动时间，300毫秒;
                this.scroll.scrollTo(x, y, time);
            },
            //每当图片加载完成后，重新计算可滚动的区域
            refresh() {
                this.scroll && this.scroll.refresh();
                // 因为this.scroll是写在mounted中
                //怕存在 还没有值的情况就调用函数;
                //意思是只有当 this.scroll 创建完成后 才会执行 this.scroll.refresh()
            },
            //当上拉加载事件完成后，调用此方法，才可以进行下一次上拉加载;
            finishPullUp() {
                this.scroll.finishPullUp();
                // this.scroll && this.scroll.finishPullUp();
            },
            //当上拉加载事件完成后，调用此方法，才可以进行下一次上拉加载;
            finishPullDown() {
                this.scroll.finishPullDown();
                // this.scroll && this.scroll.finishPullDown();
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        height: calc(100vh - 94px);
        background-color: #fff;
        overflow: hidden;
        margin-top: 44px;
        /*margin-top: 10px;*/
    }
</style>
