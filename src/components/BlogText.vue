<template>
    <div class="BlogText">
        <div style="background:#eee;padding: 10px; width: 60%; height: 100%;margin: 0 auto;">
            <Card :bordered="false" style="margin-bottom: 20px">
                <p slot="title">{{blogs.blogId}}、{{blogs.blogTitle}}</p>
                <p>
                    <List>
                        <ListItem style="text-align: left;text-indent: 2em">{{blogs.blogContent}}</ListItem>
                    </List>
                </p>
            </Card>
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
            <div class="Comment" style="background: gainsboro;border: 2px solid cadetblue; text-align: left">
                <List style="margin: 0px 5px">
                    <ListItem>
                        <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" description="This is description, this is description." />
                    </ListItem>
                </List>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "BlogText",
        data () {
            return {
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
                id:[],
                blogs:[]
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('成功!');
                    } else {
                        this.$Message.error('失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        created() {
            this.id=this.$route.params.id;
            axios.get("http://localhost:8081/Blog/findOne",{params:{id:this.id}})
                .then((data)=>{this.blogs=data.data.data})
        }
    }
</script>

<style scoped>
    html,body,.BlogText {height: 100%;}
</style>