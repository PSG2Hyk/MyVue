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
                <aplayer autoplay :music="music" :list="musicList" volume='0.05' listFolded="false" style="width: 430px" listMaxHeight="100px"></aplayer>
            </MenuItem>
        </Menu>
        <br>
        <RadioGroup v-model="theme1"></RadioGroup>
    </div>
</template>

<script>
    import Aplayer from "vue-aplayer";
    export default {
        name: "BlogHead",
        components: {
            Aplayer
        },
        data() {
            return {
                theme1: 'dark',
                foundText: "",
                 music:{
                     title: 'secret base ~君がくれたもの~',
                     artist: '茅野愛衣,戸松遥,早見沙織',
                     src: 'https://m801.music.126.net/20200313175416/14d41da1b7a7c3177db5a179121a8264/jdyyaac/5609/0708/050b/acbf261eb10b3f3490a22a60ea2f9698.m4a',
                     pic:'http://p2.music.126.net/daZcHVIJicL3wXJWMIjAng==/7926379325753633.jpg?param=130y130'
                 },
                musicList: [{
                    title: 'secret base ~君がくれたもの~',
                    artist: '茅野愛衣,戸松遥,早見沙織',
                    src: 'https://m801.music.126.net/20200313175416/14d41da1b7a7c3177db5a179121a8264/jdyyaac/5609/0708/050b/acbf261eb10b3f3490a22a60ea2f9698.m4a',
                    pic:'http://p2.music.126.net/daZcHVIJicL3wXJWMIjAng==/7926379325753633.jpg?param=130y130'
                },{
                    title: '七日seven days',
                    artist: '小野道ono / 真栗',
                    src: 'https://m10.music.126.net/20200313175508/c667cbddeb26b84e70b11b4e75faf89f/yyaac/5159/0552/055e/f3dba8954128357fd196244d0b4e3c72.m4a',
                    pic:'http://p1.music.126.net/LL_xNe6Q6Q9P04iOj6jC7A==/109951164651977024.jpg?param=130y130'
                },{
                    title: 'Memories',
                    artist: 'Maroon 5',
                    src: 'https://m10.music.126.net/20200313175548/7a65ea1a33f123b01918503e26d30f86/yyaac/0709/035b/525c/0c4804e2224107f3fa29e6a1884b5925.m4a',
                    pic:'http://p1.music.126.net/ff8QRXiKefz7qUj6VeFHHg==/109951164375334868.jpg?param=130y130'
                },{
                    title: 'Tell Your World',
                    artist: '花たん',
                    src: 'https://m701.music.126.net/20200313175614/fd4cb464ca7fe9757a490e7b64aa8426/jdyyaac/550c/040b/065a/bfe9ebff1d3aa46c6f2b10ed363bf58d.m4a'
                },
                ]
            }
        },
        methods: {
            found: function () {
                if (this.foundText == "") {
                    this.$router.push('/');
                } else {
                    this.$router.push({name: 'BlogList', params: {foundText: this.foundText}});
                }
            }
        }
    }

</script>

<style scoped>

</style>