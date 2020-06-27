<template>
    <div class="convert-to-request">
        <el-card class="main">
            <label-item>
                <span>输入</span>
                <template v-slot:icon>
                    <svg-icon icon-class="clear" title="清除" @click="clearInput" />
                </template>
            </label-item>
            <el-input
                    class="request-input"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 4}"
                    placeholder="请输入 Curl 命令 或 Fiddler raw 格式文本"
                    autofocus
                    v-model="requestText">
            </el-input>

            <label-item>
                <span>转换结果</span>
                <template v-slot:icon>
                    <svg-icon icon-class="clipboard" title="复制" @click="clearInput" />
                    <svg-icon icon-class="play" title="运行" @click="clearInput" />
                </template>
            </label-item>
            <python-edit :content="code"></python-edit>
        </el-card>
    </div>
</template>

<script>
    import LabelItem from "./component/LabelItem"
    import PythonEdit from "./component/PythonEdit"
    export default {
        name: "Convert2Request",
        components: {
            LabelItem,
            PythonEdit
        },
        data(){
            return {
                requestText: '',
                code: 'import os',
            }
        },
        methods: {
            clearInput(){
                this.requestText = ''
            }
        }
    }
</script>

<style scoped lang="scss">
.convert-to-request {
    background-color: #f9f9f9;
    .main {
        width: 75%;
        margin: auto;
        border: none;
        padding: 20px 50px;
        .request-input {
            ::v-deep {
                .el-textarea__inner {
                    border: none;
                    border-bottom: 2px solid #DCDFE6;
                    border-radius: unset;
                    resize:none;
                    padding: 5px 5px;
                    &:focus {
                        border-color: #409EFF;
                    }
                }
            }
        }
    }
}
</style>
