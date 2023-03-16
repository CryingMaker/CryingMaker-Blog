<template>
    <div>
        <div class="message" ref="message">
            <div class="message-box">
                <div class="list" v-for="(item, index) in messageList" :key="index"
                    :style="`background:${solidColor[item.color]}`">
                    <div class="m-top">
                        <div class="name">作者: <span>{{ item.author }}</span></div>
                        <div class="time">{{ item.time }}</div>
                    </div>
                    <div class="m-bottom">{{ item.content }}</div>
                </div>
            </div>
        </div>

        <div class="comment" :class="{ isShow: isShowComment }">
            <div class="btn" @click="trigger()">
                {{ isShowComment ? '展开' : '关闭' }}
                <div class="line"></div>
            </div>

            <div class="top">
                <div class="colors">
                    <div v-for="(item, index) in solidColor" :style="`background:${item}`" :key="index"
                        @click="colorActive = index" :class="{ active: colorActive == index }"></div>
                </div>

                <div class="author">
                    <span class="text"></span>
                    <n-space vertical>
                        <n-input-group>
                            <n-input size="medium" placeholder="请输入名字..." maxlength="20" v-model:value="author" />
                            <n-button type="success" @click="submit()">发送</n-button>
                        </n-input-group>
                    </n-space>
                </div>
            </div>
            <div class="textarea">
                <textarea name="comment" id="textarea" maxlength="240" :style="`background:${solidColor[colorActive]}`"
                    v-model="content" placeholder="请输入内容...."></textarea>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getTime } from '../../utils'
import { useMessage } from 'naive-ui'
import { messageData } from '../../types';
import { getMessages, sendMessage } from '../../api/message';
import { nanoid } from 'nanoid';
import { useContentStore } from '../../store'
const message = useMessage();
const contentStore = useContentStore();

const solidColor = [//11条
    'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
    'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)',
    'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
    'linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
    'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
    'linear-gradient(to top, #37ecba 0%, #72afd3 100%)',
]
//选中的颜色
let colorActive = ref(0);

//是否显示评论对话框
let isShowComment = ref(true);
const trigger = () => {
    isShowComment.value = !isShowComment.value;
}
//绑定作者和留言内容
let author = ref<string>('')
let content = ref<string>('')

// 处理留言提交
const submit = async () => {
    if (!author.value.trim() || !content.value.trim()) {
        message.error('姓名和内容不能为空!')
    } else {
        let tempData: messageData = {
            author: author.value,
            id: nanoid(),
            time: getTime(),
            content: content.value,
            color: colorActive.value
        }
        try {
            await sendMessage(tempData)
            message.success('留言成功!')
            messageList.value.unshift(tempData)
            author.value = content.value = ''
        } catch (error) {
            message.error('留言失败!')
        }
    }
}

//留言数据
let messageList = ref<Array<messageData>>([]);


// 请求留言信息
const getMessage = async () => {
    try {
        if (contentStore.pageNum) {
            let res: Array<messageData> = await getMessages(contentStore.pageNum, contentStore.pageSize);
            messageList.value = messageList.value.concat(...res);
            contentStore.incrementPageNum();

            if (res.length < contentStore.pageSize) {
                contentStore.setPageNum(0);
                message.info('没有更多留言了!');
                return false;
            }
            return true;
        }
    } catch (error) {
        message.error('获取留言失败!');
        return false;
    }
}
//将获取信息的方法给到center
defineExpose({ getMessage });
onMounted(async () => {
    await getMessage();
})




</script>

<style lang="scss" scoped>
.message {
    width: 100%;
    padding: 20px 10px 30px 10px;

    .message-box {
        width: 100%;
        column-count: 3;

        .list {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 10px 10px;
            justify-content: flex-start;
            border-radius: 10px;
            transition: all .5s linear;
            overflow: hidden;
            min-height: 100px;
            margin-bottom: 30px;
            color: #202020;
            font-size: $size-14;


            &:hover {
                border-radius: 20px;
                animation: card .5s cubic-bezier(0.315, 0.605, 0.375, 0.925) 0s 1 forwards alternate;
                box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
            }


            .m-top {
                width: 100%;
                height: 20%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .name {
                    overflow: hidden;
                    -webkit-line-clamp: 1;
                    word-break: break-all;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;

                    span {
                        text-decoration: underline;
                    }
                }
            }

            .m-bottom {
                width: 100%;
                padding: 5px 0px;
                word-break: break-all;
                letter-spacing: 1px;
            }
        }
    }
}


@media screen and (max-width: 1350px) {
    .comment {
        left: 20.2% !important;
        width: 75.2% !important;
    }
}

@media screen and (max-width:1100px) {
    .comment {
        left: 0% !important;
        width: 100% !important;

        .top {
            width: 100%;

            .colors {
                height: 100%;


                div {
                    width: 35px !important;
                    height: 35px !important;
                    margin-right: 3px !important;
                }
            }

            .author {
                flex-direction: column;
            }
        }

    }

    .message-box {
        column-count: 2 !important;

        .list {
            .m-top {
                flex-direction: column-reverse;
            }
        }
    }
}

.isShow {
    transform: translateY(100%);
}

.comment {
    width: 66.3%;
    height: 250px;
    position: fixed;
    bottom: 0;
    left: 20.5%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #202020;
    padding: 0px 10px;
    transition: all .2s linear;
    border-top: 1px solid $gray-3;

    .btn {
        width: 20%;
        height: 10%;
        position: relative;
        top: -10%;
        background-color: $gray-1;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        color: $gray-10;
        text-align: center;
        cursor: pointer;


        .line {
            width: 100%;
            height: 1px;
            background-color: $gray-2;
            position: absolute;
            bottom: 0;
        }
    }

    .top {
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: -5%;

        .author {
            height: 100%;
            color: $gray-3;
            display: flex;
            justify-content: space-between;
            align-items: center;

            :deep(.n-input__input-el) {
                color: #202020;
                border: transparent;
            }

            .text {
                padding-right: 10px;
                min-width: 48px;
            }
        }

        .colors {
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;

            .active {
                transform: scale(.7);
            }

            div {
                cursor: pointer;
                width: 50px;
                height: 50px;
                transition: all .2s ease-out;
                border-radius: 999px;
                transform: scale(.5);
            }
        }
    }

    .textarea {
        width: 100%;
        height: 60%;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        overflow: hidden;
        opacity: .8;

        #textarea {
            width: 100%;
            height: 100%;
            resize: none;
            color: $gray-1;
            font-size: $size-14;
            padding: 5px 10px;
            letter-spacing: 2px;
            border: 0;
            transition: all .2s ease-out;
        }
    }
}
</style>