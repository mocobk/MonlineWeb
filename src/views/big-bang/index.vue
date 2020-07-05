<template>
    <div class="container">
        <div class="content">
            <div class="header">

            </div>
            <div class="main">
                <van-tag
                        v-for="(item, index) in items"
                        :key="index"
                        :class="{'tag-selected': item.selected, 'tag-unselected': !item.selected}"
                        :number="index"
                        @touchstart="onTouchStart"
                        @touchmove="onTouchMove"
                >
                    {{item.word}}
                </van-tag>

            </div>
            <div class="footer">

            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "BigBang",
        data() {
            return {
                words: [
                    '我',
                    '是',
                    '中国人',
                    '，',
                    '来自',
                    '湖南',
                    '，',
                    '18566772480',
                    '我',
                    '是',
                    '中国人',
                    '，',
                    '来自',
                    '湖南',
                    '，',
                    '18566772480',
                    '我',
                    '是',
                    '中国人',
                    '，',
                    '来自',
                    '湖南',
                    '，',
                    '18566772480',
                ],
                items: {},
                startIndex: 0,
                selectedItems: {},
                selectMode: false

            }
        },
        computed: {},
        created() {
            this.items = this.generateItems()
        },
        methods: {
            generateItems() {
                let itemsObj = {}
                this.words.map((item, index) => {
                    itemsObj[index] = {word: item, selected: false}
                })
                return itemsObj
            },
            handleTouch(msg, event = '') {
                console.log(msg)
                console.log(event)
            },

            getItemByElement(element) {
                return this.items[element.getAttribute('number')]
            },
            getElementIndex(element) {
                return Number(element.getAttribute('number'))
            },

            onTouchStart(event) {
                const item = this.getItemByElement(event.target)
                this.selectMode = !item.selected
                this.startIndex = this.getElementIndex(event.target)
            },
            onTouchMove(event) {
                const {pageX, pageY} = event.targetTouches[0]
                const touchElement = document.elementFromPoint(pageX, pageY)
                if (touchElement.hasAttribute('number')) {
                    const endIndex = this.getElementIndex(touchElement)
                    const [start, end] = endIndex >= this.startIndex ? [this.startIndex, endIndex] : [endIndex, this.startIndex]
                    for (let i = start; i <= end; i++) {
                        this.items[i].selected = this.selectMode
                    }

                }
            },


        }
    }
</script>

<style scoped lang="scss">
    .container {
        background-color: #f9f9f9;
        display: flex;
        display: -webkit-flex;
        display: -moz-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;

        .content {
            width: 100%;

            .header {
                height: 10vh;
                background-color: #5cb6ff;
            }

            .main {
                margin: 5px 5px;
                max-height: 80vh;
                min-height: 30vh;

                .van-tag {
                    margin: 2.5px 2.5px;
                }

                .tag-selected {
                    background-color: #ff4d4f;
                    color: white;
                }

                .tag-unselected {
                    background-color: white;
                    color: black;
                    border: 1px solid rgb(128, 128, 128, 0.25);
                }
            }

            .footer {
                height: 10vh;
                background-color: #409EFF;
            }
        }

    }

</style>
