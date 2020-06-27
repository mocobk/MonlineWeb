<template>
    <VueAceEditor
            height="300px"
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
            :fontSize='14'
            :lang="'python'"
            :theme="'monokai'"
            @init="editorInit">
    </VueAceEditor>
</template>

<script>
    import VueAceEditor from 'vue2x-ace-editor'

    export default {
        name: "PythonEdit",
        props: {
            content: {
                type: String,
                required: true
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
            }
        }
    }
</script>

<style scoped>

</style>
