<template>
    <div class="BlogHead">
        <Menu mode="horizontal" :theme="theme1" active-name="1">
            <MenuItem name="1">
                <h2 style="color: aliceblue">天博个人博客</h2>
            </MenuItem>
            <MenuItem name="2">
                <router-link to="/" style="color: gainsboro"><Icon type="ios-people"/>首页</router-link>
            </MenuItem>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="ios-stats" />
                    技术分享
                </template>
                <MenuItem name="3-1" to="/BlogList/Type/Java">Java</MenuItem>
                <MenuItem name="3-2" to="/BlogList/Type/Jquery">Jquery</MenuItem>
                <MenuItem name="3-3" to="/BlogList/Type/C++">C++</MenuItem>
                <MenuItem name="3-4" to="/BlogList/Type/Vue">Vue</MenuItem>
            </Submenu>
            <MenuItem name="4">
                <Input :search="true" placeholder="文章搜索" v-model="foundText" icon="md-search" @on-click="found" @on-enter="found"/>
            </MenuItem>
            <MenuItem name="5" style="float: right">
                <Icon type="ios-contact" />注册
            </MenuItem>
            <MenuItem name="5" style="float: right">
                <Icon type="ios-contact"/>登录
            </MenuItem>
        </Menu>
        <br>
        <RadioGroup v-model="theme1"></RadioGroup>
    </div>
</template>

<script>
    import axios from '../plugin/axios'
    export default {
        name: "BlogHead",
        data () {
            return {
                theme1: 'dark',
                foundText:""
            }
        },
        methods:{
            found:function () {
                if (this.foundText==""){
                    this.$router.push('/');
                }else{
                    // this.$store.commit("FoundList",this.foundText);
                    this.$router.push({name:'BlogList',params:{foundText:this.foundText}});
                }
            }
        }
    }

</script>

<style scoped>

</style>