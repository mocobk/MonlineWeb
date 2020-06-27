<template>
    <div class="label-item">
        <div class="label">
            <slot></slot>
        </div>

        <div class="icon">
            <slot name="icon"></slot>
        </div>

    </div>

</template>

<script>
    export default {
        name: "LabelItem"
    }
</script>

<style scoped lang="scss">
    $item-header-height: 2em;
    .label-item {
        font-size: $item-header-height;
        height: $item-header-height;
        line-height: $item-header-height;
        margin: 30px 0 10px 0;
        .label {
            float: left;
        }
        .icon {
            float: right;
            height: 100%;
            line-height: 100%;
            svg {
                width: 0.6em;
                height: 0.6em;
                padding: 0.7em;
            }
        }
        .icon svg:hover {
            color: #5cb6ff
        }

    }
</style>
