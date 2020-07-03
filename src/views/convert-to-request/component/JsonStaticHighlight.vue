<template>
    <VueStaticHighlight
        class="static-highlight"
        height="100%"
        :content="content"
        :options="{
                showPrintMargin: false,
                showLineNumbers: false,
                showGutter: false,
                highlightActiveLine: false,
                minLines: 2,
                maxLines: 30,
            }"
        :fontSize='16'
        :lang="'json'"
        :theme="'xcode'"
        :readonly="true"
        :gutter="false"
        @init="editorInit">
    </VueStaticHighlight>
</template>

<script>
    import VueStaticHighlight from 'vue2x-ace-editor'
    export default {
        name: 'JsonStaticHighlight',
        props: {
            content: {
                type: String,
                default: ''
            }
        },
        components: {
            VueStaticHighlight
        },
        methods: {
            editorInit() {
                require("brace/mode/json")
                require("brace/theme/xcode")
            }
        }
    }
</script>

<style scoped lang="scss">
    .static-highlight {
        ::v-deep {
            .ace_cursor {
                display: none;
            }
        }
    }
</style>
