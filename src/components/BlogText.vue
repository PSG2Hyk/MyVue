<template>
    <div class="BlogText">
        <div style="background:#eee;padding: 10px; width: 60%;margin: 0 auto;">
            <Card :bordered="false" style="margin-bottom: 20px">
                <p slot="title">{{blogs.blogId}}、{{blogs.blogTitle}}</p>
                <p>
                    <List>
                        <ListItem style="text-align: left;text-indent: 2em">{{blogs.blogContent}}</ListItem>
                    </List>
                </p>
            </Card>
            <Modal v-model="modal" :loading="modalLoading" :maskClosable="false" ref="model" @on-ok="ok">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="width: 60%; margin: 0 auto; ">
                    <FormItem label="Name" prop="name">
                        <Input v-model="formValidate.name" placeholder="输入你的用户名"></Input>
                    </FormItem>
                    <FormItem label="E-mail" prop="mail">
                        <Input v-model="formValidate.mail" placeholder="输入你的邮箱"></Input>
                    </FormItem>
                    <FormItem label="Desc" prop="desc">
                        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入评论内容..."></Input>
                    </FormItem>
                </Form>
            </Modal>
            <Modal v-model="modal2" :loading="modalLoading" :maskClosable="false" ref="model" @on-ok="ok" width="70%">
                <div class="Comment" style="background: gainsboro;border: 2px solid cadetblue; width: 95%; margin:0 auto 3px" v-for="comment in clickComments" >
                    <List style="margin: 0px 5px" >
                        <ListItem>
                            <ListItemMeta style="text-align: left;" avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" :title="comment.userName" :description="comment.commentText" />
                            <Button style="text-align: right; margin-top: 20px" @click="open(comment.commentId)">回复</Button>
                            <Button style="text-align: right; margin-top: 20px" @click="click(comment.commentId)">查看回复</Button>
                        </ListItem>
                    </List>
                </div>
            </Modal>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="width: 60%; margin: 0 auto; ">
                <FormItem label="Name" prop="name">
                    <Input v-model="formValidate.name" placeholder="输入你的用户名"></Input>
                </FormItem>
                <FormItem label="E-mail" prop="mail">
                    <Input v-model="formValidate.mail" placeholder="输入你的邮箱"></Input>
                </FormItem>
                <FormItem label="Desc" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入评论内容..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">清空</Button>
                </FormItem>
            </Form>
        </div>
        <div class="Comment" style="background: gainsboro;border: 2px solid cadetblue; width: 60%; margin:0 auto 3px"v-for="comment in comments" >
            <List style="margin: 0px 5px">
                <ListItem>
                    <ListItemMeta style="text-align: left;" avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" :title="comment.userName" :description="comment.commentText" />
                    <Button style="text-align: right; margin-top: 20px" @click="open(comment.commentId)">回复</Button>
                    <Button style="text-align: right; margin-top: 20px" @click="click(comment.commentId)">查看回复</Button>
                </ListItem>
            </List>
        </div>
    </div>
</template>

<script>
    import axios from '../plugin/axios'
    export default {
        name: "BlogText",
        data () {
            return {
                comments:[],
                clickComments:[],
                formValidate: {
                    name: '',
                    mail: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入内容', trigger: 'blur' },
                        { type: 'string', min: 5, message: '输入的评论不能少于5个字', trigger: 'blur' }
                    ]
                },
                id:'',
                blogs:[],
                modal:false,
                modal2:false,
                modalLoading: true,
                parentId:'0'
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('成功!');
                        this.$store.commit("UserSave",{name:this.formValidate.name,mail:this.formValidate.mail});
                        this.id=this.$route.params.id;
                        axios.post("http://localhost:8081/Comment/Save",{blogId:this.id,userName:this.$store.state.name,userMail:this.$store.state.mail,commentText:this.formValidate.desc,parentId:this.parentId})
                            .then(()=>{
                                axios.get("http://localhost:8081/Comment/List",{params:{id:this.id}})
                                    .then((data)=>{this.comments=data.data.data})
                            })
                        this.modal = false;
                        this.formValidate.desc=''
                    } else {
                        this.$Message.error('失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            open(parentId){
                this.parentId=parentId;
                this.modal = true;
            },
            click(parentId){
                this.parentId=parentId;
                this.modal2=true;
                axios.get("http://localhost:8081/Comment/Son",{params:{parentId:this.parentId}})
                    .then((data)=>{this.clickComments=data.data.data;
                    if (this.clickComments<1){
                        this.$Message.error('暂无回复!');
                        // this.modal2=false;
                    }
                    })
            },
            ok () {
                this.modal2=false;
            }
        },
        created() {
            this.formValidate.name=this.$store.state.name;
            this.formValidate.mail=this.$store.state.mail;
            this.id=this.$route.params.id;
            axios.get("http://localhost:8081/Blog/findOne",{params:{id:this.id}})
                .then((data)=>{this.blogs=data.data.data})
            axios.get("http://localhost:8081/Comment/List",{params:{id:this.id}})
                .then((data)=>{this.comments=data.data.data})
        }
    }
</script>

<style scoped>
    html,body,.BlogText {height: 100%;}
</style>