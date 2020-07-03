<template>
    <VueAceEditor
            height="100%"
            ref="python-editor"
            :content="content"
            :options="{
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true,
                tabSize:4,
                showPrintMargin: false,
                showLineNumbers: false,
                showGutter: false,
                minLines: 12,
                maxLines: 30,
            }"
            :fontSize='16'
            :lang="'python'"
            :theme="'monokai'"
            @onChange="onChange"
            @init="editorInit">
    </VueAceEditor>
</template>

<script>
    import VueAceEditor from 'vue2x-ace-editor'

    export default {
        name: "PythonEdit",
        props: {
            content: {
                type: String
            }
        },
        components: {
            VueAceEditor
        },
        methods: {
            editorInit() {
                require("brace/ext/language_tools")
                require("brace/mode/python")
                require("brace/snippets/python")
                require("brace/theme/monokai")
            },
            onChange(edit){
                this.$emit('editChange', edit.getValue())
            }
        }
        
    }
</script>

<style scoped>

</style>
