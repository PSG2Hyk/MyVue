<template>
    <div class="BlogList" style="height: 120vh">
        <div style="background:#eee;padding: 10px; width: 60%; margin: 0 auto" v-for="blog in showList" class="single-blog">
            <Card :bordered="false">
                <p slot="title">{{blog.blogTitle}}</p>
                <p>
                    <List>
                        <ListItem ><label style="text-align: left;text-indent: 2em">{{blog.blogContent.substr(0,200)}}...</label></ListItem>
                    </List>
                </p>
                <div class="li" style="list-style: none; display:block;float: left">
                    <li>
                        <Icon type="ios-star-outline" /> 123
                    </li>
                    <li>
                        <Icon type="ios-thumbs-up-outline" /> 234
                    </li>
                    <li>
                        <Icon type="ios-chatbubbles-outline" /> 345
                    </li>
                </div>
                <p style="text-align:right">{{blog.createTime}}</p>
                <div style="text-align: right; margin-right: 3%">
                    <Button @click="BlogTextLink(blog.blogId)" >阅读更多</Button>
                </div>
            </Card>
        </div>
        <Page :total="dataCount" :page-size="size" :current="currentPage" @on-change="changePage" style="margin: 10px 0px"/>
    </div>
</template>

<script>
    import axios from '../plugin/axios'
    export default {
        name: "BlogList",
        data(){
            return{
                blogs:[],
                showList:[],
                currentPage:1,
                size:5,
                dataCount:0,
                // foundText:''
            }
        },
        created: function () {
            // if (this.$store.state.foundList == ""){
            // }else {
            //     var foundList=this.$store.state.foundList;
            var foundText=this.$route.params.foundText;
            // alert(foundText);
            if (foundText == null){
                axios.get("http://localhost:8081/Blog/List")
                    .then((data)=>{this.blogs=data.data.data,
                            this.dataCount=this.blogs.length
                            if (this.dataCount <this.size){
                                this.showList=this.blogs;
                            }else {
                                this.showList=this.blogs.slice(0,this.size)
                            }
                        }
                    )
                // this.$store.commit("FoundList","");
            }else {
                axios.get("http://localhost:8081/Blog/findBy",{params:{blogContent:foundText}})
                    .then((data)=>{this.blogs=data.data.data,
                        this.dataCount=this.blogs.length
                        if (this.dataCount <this.size){
                            this.showList=this.blogs;
                        }else {
                            this.showList=this.blogs.slice(0,this.size)
                        }
                    })
            }
            // }
        },
       methods:{
            BlogTextLink(Bid){
                this.$router.push({name:'BlogText',params:{id:Bid}})
            },
           changePage(blog){
                var start =(blog - 1 ) * this.size;
                var end = blog * this.size;
                this.showList =this.blogs.slice(start,end);
           }
       },
        computed:{

        },
        watch:{
            '$route'(to,from){
                // alert("watch执行了")
                var foundText=this.$route.params.foundText;
                // alert(foundText);
                if (foundText == null){
                    axios.get("http://localhost:8081/Blog/List")
                        .then((data)=>{this.blogs=data.data.data;
                                this.dataCount=this.blogs.length;
                                if (this.dataCount <this.size){
                                    this.showList=this.blogs;
                                }else {
                                    this.showList=this.blogs.slice(0,this.size)
                                }
                            }
                        )
                    this.$store.commit("FoundList","");
                }else {
                    axios.get("http://localhost:8081/Blog/findBy",{params:{blogContent:foundText}})
                        .then((data)=>{this.blogs=data.data.data,
                            this.dataCount=this.blogs.length
                            if (this.dataCount <this.size){
                                this.showList=this.blogs;
                            }else {
                                this.showList=this.blogs.slice(0,this.size)
                            }
                        })
                }
            }
        }
    }
</script>

<style scoped>
    html,body{height: 100%;}
    .li li{
        display:block;float: left
    }
</style>