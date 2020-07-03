<template>
    <div class="convert-to-request">
        <el-card class="main">
            <label-item>
                <span>输入
                    <i class="el-icon-warning-outline" @click="dialogVisible=true"></i>
                </span>
                <template v-slot:icon>
                    <svg-icon icon-class="clear" title="清除" @click="init" />
                </template>
            </label-item>
            <el-input
                class="request-input"
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 5}"
                placeholder="请输入 Curl 命令 或 Fiddler raw 格式文本"
                autofocus
                v-model="requestText">
            </el-input>
            
            <label-item>
                <span>转换结果</span>
                <template v-slot:icon>
                    <svg-icon icon-class="clipboard" title="复制" @click="copyCode" />
                    <svg-icon icon-class="play" title="运行" @click="runCode" />
                </template>
            </label-item>
            <python-edit
                v-loading="loading"
                element-loading-text="正在加载，请稍后..."
                element-loading-background="rgba(0, 0, 0, 0.5)"
                :content="initCode"
                @editChange="updateCode">
            
            </python-edit>
            
            <div v-if="!!runData.status && !clear">
                <label-item>
                    <span>运行结果</span>
                </label-item>
                <ResultTabls :data="runData"></ResultTabls>
            </div>
            
            <div v-if="!!runData.print_out  && !clear ">
                <label-item>
                    <span>打印输出</span>
                </label-item>
                <el-alert
                    type="info"
                    :closable="false"
                    :description="runData.print_out">
                </el-alert>
            </div>
        
        </el-card>
        
        <el-dialog
            title="帮助说明"
            :visible.sync="dialogVisible"
            width="60%"
            center>
            <VueMarkdown class="help" :anchorAttributes="{target: '_blank'}">{{helpText}}</VueMarkdown>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">我知道了</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import LabelItem from './component/LabelItem'
    import PythonEdit from './component/PythonEdit'
    import ResultTabls from './component/ResultTabls'
    import handleClipboard from '@/utils/clipboard'
    import {convert, run} from '@/api/comvert2request'
    import {delayRequest} from '@/utils/request'
    import VueMarkdown from 'vue-markdown'
    import help from './component/help.md'
    
    export default {
        name: 'Convert2Request',
        components: {
            LabelItem,
            PythonEdit,
            ResultTabls,
            VueMarkdown
        },
        data() {
            return {
                requestText: '',
                initCode: '# -*- coding:utf-8 -*-\n',
                code: '',
                runData: {
                    headers: {},
                    text: '',
                    cookies: {},
                    status: null,
                    elapsed: 0,
                    method: null,
                    image: '',
                    print_out: '',
                },
                loading: false,
                clear: false,
                helpText: help,
                dialogVisible: false
            }
        },
        watch: {
            requestText: function (newVal) {
                if (newVal.length > 20) {
                    delayRequest(this.getCode, 300)
                }
            }
        },
        
        methods: {
            init() {
                this.requestText = ''
                this.initCode = ''
                this.code = ''
                this.clear = true
                this.loading = false
            },
            copyCode(event) {
                handleClipboard(this.code, event)
            },
            updateCode(value) {
                this.code = value
            },
            getCode() {
                this.loading = true
                convert(this.requestText).then(res => {
                    this.initCode = res.code
                    this.code = res.code
                    this.loading = false
                })
            },
            runCode() {
                if (!this.code.trim()) {
                    this.$message({
                        message: '运行代码不能为空',
                        type: 'warning',
                        duration: 1500
                    })
                    return
                }
                this.loading = true
                run(this.code).then(res => {
                    this.runData = res
                    this.loading = false
                    this.clear = false
                })
            },
        }
    }
</script>

<style lang="scss">

</style>


<style scoped lang="scss">
    .convert-to-request {
        background-color: #f9f9f9;
        height: 100%;
        width: 100%;
        position: absolute;
        
        .main {
            width: 60%;
            margin: 10px auto;
            border: none;
            padding: 20px 50px;
            
            .request-input {
                ::v-deep {
                    .el-textarea__inner {
                        border: none;
                        border-bottom: 2px solid #DCDFE6;
                        border-radius: unset;
                        resize: none;
                        padding: 5px 5px;
                        
                        &:focus {
                            border-color: #409EFF;
                        }
                    }
                }
            }
            
            .el-alert {
                white-space: pre;
                
                ::v-deep {
                    .el-alert__content {
                        padding: 10px 0;
                        overflow-x: auto;
                    }
                    
                }
            }
            
            .el-icon-warning-outline {
                font-size: 0.6em;
                cursor: pointer;
            }
            
        }
        
        .help {
            ::v-deep {
                img {
                    width: 100%;
                    border-radius: 3px;
                    border: 1px solid #dddddd;
                }
            }
        }
        
    }
</style>
