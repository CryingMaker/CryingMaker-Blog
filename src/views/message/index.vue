<template>
    <div>
        <div class="message" ref="message">
            <div class="message-box">
                <div class="list" v-for="(item, index) in messageList" :key="index"
                    :style="`background:${color[item.color]}`">
                    <div class="m-top">
                        <div class="name">作者: <span>{{ item.author }}</span></div>
                        <div class="time">{{ item.time }}</div>
                    </div>
                    <div class="m-bottom">{{ item.content }}</div>
                </div>
            </div>

            <div class="add" @click="showModal = true">
                添加一条留言
            </div>

            <n-modal v-model:show="showModal" :on-after-leave="onModalClose" transform-origin="mouse" class="modal">
                <n-card title="留下一条留言吧!" :bordered="true" size="huge" role="dialog" aria-modal="true">
                    <template #header-extra>
                        <svg class="icon svg-icon close-icon" aria-hidden="true" @click="showModal = false">
                            <use xlink:href="#icon-guanbi"></use>
                        </svg>
                    </template>
                    <div class="top">
                        <div class="colors">
                            <div v-for="(item, index) in color" :style="`background:${item}`" :key="index"
                                @click="colorActive = index" :class="{ active: colorActive == index }"></div>
                        </div>

                        <div class="author">
                            <span class="text">作者:</span>
                            <n-space vertical>
                                <n-input-group>
                                    <n-input placeholder="请输入名字..." maxlength="20" v-model:value="author" />
                                    <n-button type="success" @click="submit()">发送</n-button>
                                </n-input-group>
                            </n-space>
                        </div>
                    </div>
                    <div class="textarea">
                        <textarea name="comment" id="textarea" maxlength="240" :style="`background:${color[colorActive]}`"
                            v-model="content" placeholder="请输入内容...."></textarea>
                    </div>
                </n-card>
            </n-modal>
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
import { color } from '../../constant'
const message = useMessage();
const contentStore = useContentStore();

//是否显示留言框
let showModal = ref(false);
//选中的颜色
let colorActive = ref(0);
//绑定作者和留言内容
let author = ref<string>('')
let content = ref<string>('')
//所有留言数据
let messageList = ref<Array<messageData>>([]);

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
            showModal.value = false;
        } catch (error) {
            message.error('留言失败!')
        }
    }
}

// 请求留言信息
const getMessage = async () => {
    try {
        if (contentStore.messagePageNum) {
            let res: Array<messageData> = await getMessages(contentStore.messagePageNum, 20);
            messageList.value = messageList.value.concat(...res);
            contentStore.messagePageNum++;
            if (res.length < 20) {
                contentStore.messagePageNum = 0;
            }
        }
    } catch (error) {
        contentStore.messagePageNum = 0;
        console.error(error);
    }
}
//将获取信息的方法给到center
defineExpose({ getMessage });
onMounted(async () => {
    await getMessage();
})

//当对话框关闭 清除所有数据
const onModalClose = () => {
    author.value = content.value = ''
}

//所有center的组件已经被缓存 当切换的时候 关闭弹窗
onDeactivated(() => {
    showModal.value = false;
})

</script>

<style lang="scss" scoped>
//媒体查询适应 移动端
@media screen and (max-width: 1350px) {

    :deep(.n-card-header) {
        padding: 20px 15px;
    }

    :deep(.n-card__content) {
        padding: 10px 15px;
    }

    :deep(.n-card) {
        width: 80%;
    }

    .top {
        flex-direction: column;

        .colors {
            margin-bottom: 30px;
        }
    }
}

@media screen and (max-width:1100px) {

    .modal {
        width: 100% !important;
        margin-top: 50px !important;

        .close-icon {
            font-size: 40px;
        }

        .colors {
            justify-content: space-between !important;
        }

        #textarea {
            height: 250px;
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

//弹窗
.modal {
    margin-top: 100px;
    width: 60%;

    .close-icon {
        font-size: 50px;
        color: $gray-3;
        cursor: pointer;
        transition: all .2s linear;

        &:hover {
            color: $gray-1;
        }
    }

    .top {
        width: 100%;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;


        .author {
            color: $gray-1;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .text {
                margin-right: 20px;
                min-width: 50px;
                font-size: $size-18;
            }
        }

        .colors {

            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;

            .active {
                transform: scale(1);
            }

            div {
                cursor: pointer;
                width: 50px;
                height: 50px;
                transition: all .2s ease-out;
                border-radius: 5px;
                transform: scale(.8);
            }
        }
    }

    .textarea {
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
        opacity: .8;

        #textarea {
            width: 100%;
            min-height: 200px;
            resize: none;
            color: $gray-1;
            font-size: $size-20;
            padding: 10px 20px;
            letter-spacing: 2px;
            border: 0;
            border-radius: 10px;
        }
    }
}

//添加按钮
.add {
    position: fixed;
    left: 50%;
    bottom: 0%;
    background-color: $gray-10;
    color: $gray-1;
    z-index: 9;
    transition: all .2s ease-in;
    user-select: none;
    transform: translateX(-50%);
    padding: 3px 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    cursor: pointer;
    letter-spacing: 3px;

    &:hover {
        font-size: $size-16;
    }
}

//主要样式
.message {
    width: 100%;
    padding: 20px 10px 30px 10px;
    position: relative;

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
</style>