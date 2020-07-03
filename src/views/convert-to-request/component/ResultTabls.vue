<template>
    <el-tabs class="tabs" v-model="activeTab">
        <el-tab-pane label="Body" name="Body">
            <div class="options">
                <el-radio-group v-model="bodyOption" size="mini">
                    <el-radio-button label="Pretty"></el-radio-button>
                    <el-radio-button label="Raw"></el-radio-button>
                </el-radio-group>
                <span class="icon">
                    <svg-icon icon-class="clipboard" title="复制" @click="copyText" />
                </span>
            </div>
            <div class="body-content">
                <JsonStaticHighlight :content="bodyContent"></JsonStaticHighlight>
            </div>
        </el-tab-pane>
        
        <el-tab-pane label="Headers" name="Headers">
            <div class="options">
                <span class="icon">
                    <svg-icon icon-class="clipboard" title="复制" @click="copyText" />
                </span>
            </div>
            <JsonStaticHighlight :content="headersContent"></JsonStaticHighlight>
        </el-tab-pane>
        
        <el-tab-pane name="Cookies">
            <span slot="label">
                Cookies
                <el-badge v-if="!!Object.keys(data.cookies).length" is-dot type="success"></el-badge>
            </span>
            <div class="options">
                <span class="icon">
                    <svg-icon icon-class="clipboard" title="复制" @click="copyText" />
                </span>
            </div>
            <JsonStaticHighlight :content="cookiesContent"></JsonStaticHighlight>
        </el-tab-pane>
        
        <!-- 显示状态信息 -->
        <el-tab-pane disabled>
            <span slot="label">
                <span class="info" v-for="(value, key) in info" :key="key">
                    {{key.charAt(0).toUpperCase() + key.slice(1)}}: <span class="info-value">{{value}}</span>
                </span>
            </span>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import JsonStaticHighlight from './JsonStaticHighlight'
    import handleClipboard from '@/utils/clipboard'
    
    export default {
        name: 'Tabls',
        props: {
            data: {
                type: Object,
            }
        },
        components: {
            JsonStaticHighlight
        },
        
        data() {
            return {
                activeTab: 'Body',
                bodyOption: 'Pretty',
            }
        },
        computed: {
            info() {
                const {status, method, elapsed: time} = this.data
                return {status, time, method}
            },
            bodyContent() {
                if (this.bodyOption === 'Pretty') {
                    try {
                        const obj = JSON.parse(this.data.text)
                        return this.jsonStringify(obj)
                    } catch (e) {
                        return this.data.text
                    }
                } else {
                    return this.data.text
                }
            },
            headersContent() {
                return this.jsonStringify(this.data.headers)
            },
            cookiesContent() {
                return this.jsonStringify(this.data.cookies)
            },
            currentContent() {
                const content = {
                    'Body': this.bodyContent,
                    'Headers': this.headersContent,
                    'Cookies': this.cookiesContent,
                }
                return content[this.activeTab]
            }
        },
        methods: {
            jsonStringify(obj) {
                return JSON.stringify(obj, null, 4)
            },
            copyText(event) {
                handleClipboard(this.currentContent, event)
            },
    
        }
        
    }
</script>

<style scoped lang="scss">
    .tabs {
        width: 100%;
        
        ::v-deep {
            .el-tabs__nav {
                width: 100%;
                
                #tab-3 {
                    float: right;
                }
            }
            
            .el-tabs__header {
                margin-bottom: 5px;
            }
        }
    }
    
    .info {
        color: #909399;
        margin-left: 25px;
        
        .info-value {
            color: rgb(39, 177, 72);
        }
    }
    
    .options {
        margin-bottom: 10px;
        height: 30px;
        line-height: 30px;
        
        .icon {
            float: right;
            svg {
                width: 1.2em;
                height: 1.2em;
                padding: 0.3em 0.7em 0.7em 0.7em;
            }
        }
        
        .icon svg:hover {
            color: #5cb6ff
        }
    }

</style>
