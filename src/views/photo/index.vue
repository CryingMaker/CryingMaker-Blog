<template>
    <div class="photo">
        <div class="item" v-for="(item, index) in photoList" :key="item.id" @click="handleClick(index)">
            <img :src="prefixUrl + item.url">
        </div>

        <div class="add" @click="showModal = true">添加一张图片</div>

        <n-modal v-model:show="showModal" transform-origin="mouse" :on-after-leave="onModalClose" :onMaskClick="onClose"
            class="modal">
            <n-card title="留下一张图片吧!" :bordered="true" size="huge" role="dialog" aria-modal="true">
                <template #header-extra>
                    <svg class="icon svg-icon close-icon" aria-hidden="true" @click="showModal = false">
                        <use xlink:href="#icon-guanbi"></use>
                    </svg>
                </template>
                <div class="add-box" for="file">
                    <label class="add-btn" v-show="isShowAdd">
                        <input type="file" id="file" name="flie" ref="file" accept="image/*" @change="fileChange()">
                        <svg class="icon svg-icon" aria-hidden="true">
                            <use xlink:href="#icon-tianjia"></use>
                        </svg>
                    </label>

                    <div class="photo-box" v-show="!isShowAdd">
                        <img :src="tempUrl">
                    </div>

                    <div class="footer">
                        <n-space class="btn-group">
                            <n-button :loading="loading" @click="handleUpload()">上传图片</n-button>
                            <n-button type="primary" v-if="!isShowAdd"><label for="file"
                                    class="label">换一张图</label></n-button>
                            <n-button type="error" @click="cancelUpload()">取消上传</n-button>
                        </n-space>
                    </div>
                </div>
            </n-card>
        </n-modal>

        <Transition name="fade" mode="out-in">
            <div class="viewer" v-show="isShowViewer">
                <div class="l">
                    <div @click="previous()">
                        <svg class="icon svg-icon" aria-hidden="true">
                            <use xlink:href="#icon-prev"></use>
                        </svg>
                    </div>
                </div>
                <div class="m">
                    <img :src="prefixUrl + viewerUrl">
                </div>
                <div class="r">
                    <div @click="next()">
                        <svg class="icon svg-icon" aria-hidden="true">
                            <use xlink:href="#icon-next"></use>
                        </svg>
                    </div>
                </div>
                <div class="close" @click="isShowViewer = false;">
                    <svg class="icon svg-icon" aria-hidden="true">
                        <use xlink:href="#icon-guanbi"></use>
                    </svg>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid';
import { useMessage } from 'naive-ui';
import { getToken, getPhoto, sendPhoto } from '../../api/photo'
import { useContentStore } from '../../store';
import { photoData } from '../../types';
import { getTime } from '../../utils'
import { prefixUrl } from '../../constant';
const contentStore = useContentStore();
const message = useMessage();


//按钮是否显示加载状态
const loading = ref()
//input框 用来获取上传的文件
const file = ref();
//临时文件 预览
const tempUrl = ref();
//是否显示添加照片modal
let showModal = ref(false);
//是否显示添加图片按钮
let isShowAdd = ref(true);
//七牛云上传返回的对象 可以用来取消上传
let subscription: any;
//所有照片数据
let photoList = ref<Array<photoData>>([]);
//当前查看的照片的索引
let selectdIndex = ref(0);
//用来做临时图片路径
let viewerUrl = ref<string>('')
//是否显示 查看图片
let isShowViewer = ref(false);

//处理图片上传
const handleUpload = () => {
    loading.value = true;

    if (!file.value.files[0]) {
        message.error('图片不能为空');
        loading.value = false;
        return;
    }
    upload();
}

//上传图片
const upload = async () => {
    let key = nanoid() + new Date().getTime();
    let putExtra = {};
    let config = {};
    let token: string = '';
    try {
        token = await getToken();
    } catch (error) {
        message.error('获取token失败!')
        console.error(error);
    }

    const observable = qiniu.upload(file.value.files[0], key, token, putExtra, config)

    const observer = {
        next(res: any) {
        },
        error(err: any) {
            message.error('图片上传失败!');
            loading.value = false;
            onModalClose();
            console.log(err);
        },
        async complete(res: any) {
            await sendPhotos(res.key);
            loading.value = false;
            isShowViewer.value = false;
            showModal.value = false;
            onModalClose();
        }
    }
    subscription = observable.subscribe(observer) // 上传开始
}

//取消图片上传
const cancelUpload = () => {
    onClose();
    showModal.value = false;
    //在上传过程中也可以取消
    if (subscription) {
        subscription.unsubscribe();
        message.warning('取消上传成功');
    }
}

//将上传的图片数据(上传时间 图片路径)插入数据库
const sendPhotos = async (url: string) => {
    try {
        let tempData: photoData = { id: nanoid(), time: getTime(), url }
        await sendPhoto(tempData);
        photoList.value.unshift(tempData);
        message.success('图片上传成功!')
    } catch (error) {
        console.error(error);
        message.error('图片上传失败!')
    }
}

//取消添加图片
const onClose = () => {
    isShowAdd.value = true;
}

//实时检测图片是否改变 并且显示
const fileChange = () => {
    let reader = new FileReader();
    reader.onload = () => {
        // 当 FileReader 读取文件时候，读取的结果会放在 FileReader.result 属性中
        tempUrl.value = reader.result;
    }
    if (file.value.files[0]) {
        reader.readAsDataURL(file.value.files[0])
        isShowAdd.value = false;
    }
}

// 请求照片信息
const getPhotos = async () => {
    try {
        if (contentStore.photoPageNum) {
            let res: Array<photoData> = await getPhoto(contentStore.photoPageNum, 10);
            photoList.value = photoList.value.concat(...res);
            contentStore.photoPageNum++;

            if (res.length < 10) {
                contentStore.photoPageNum = 0;
                message.info('没有更多照片了!');
            }
        }
    } catch (error) {
        contentStore.photoPageNum = 0;
        console.error(error);
        message.error('获取照片失败!');
    }
}
//将获取照片的方法给到center
defineExpose({ getPhotos });

//处理点击图片事件
const handleClick = (index: number) => {
    selectdIndex.value = index;
    viewerUrl.value = photoList.value[selectdIndex.value].url;
    isShowViewer.value = true;
}

//图片的切换 循环切换
const next = () => {
    if (selectdIndex.value + 1 > photoList.value.length - 1)
        selectdIndex.value = -1;
    handleClick(++selectdIndex.value)
}
const previous = () => {
    if (selectdIndex.value - 1 < 0)
        selectdIndex.value = photoList.value.length;
    handleClick(--selectdIndex.value)
}

//当 modal 关闭时清空数据
const onModalClose = () => {
    viewerUrl.value = '';
}

//首次加载 获取照片数据
onMounted(async () => {
    await getPhotos();
})

//所有center的组件已经被缓存 当切换的时候 关闭弹窗
onDeactivated(() => {
    showModal.value = false;
})

</script>

<style lang="scss" scoped>
//媒体查询适应 移动端
@media screen and (max-width:1350px) {

    :deep(.n-card-header) {
        padding: 20px 15px;
    }

    :deep(.n-card__content) {
        padding: 10px 15px;
    }

    :deep(.n-card) {
        width: 80%;
    }

    .photo {
        column-count: 2 !important;

        .item {
            margin-bottom: 15px !important;
        }
    }
}

@media screen and (max-width:1100px) {

    .modal {
        width: 100% !important;
        margin-top: 60px !important;

        .close-icon {
            font-size: 40px !important;
        }
    }

    .photo {
        column-count: 1 !important;

        .item {
            margin-bottom: 30px !important;
        }

        .viewer {

            .l,
            .r {
                position: absolute;
                bottom: 0;

                div {
                    opacity: 1 !important;
                }

            }

            .l {
                left: 0;
            }

            .r {
                right: 0;
            }

            .m {
                width: 100% !important;
                justify-content: inherit !important;
            }
        }
    }

    .add-btn {
        height: 200px !important;
    }


}

.fade-enter-active,
.fade-leave-active {
    transition: all .3s ease-in-out;
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

//弹窗
.modal {
    margin-top: 60px;
    width: 80%;

    .close-icon {
        font-size: 50px;
        color: $gray-3;
        cursor: pointer;
        transition: all .2s linear;

        &:hover {
            color: $gray-1;
        }
    }

    .add-box {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-content: center;
        flex-direction: column;
        margin-top: 20px;

        .add-btn {
            width: 100%;
            height: 300px;
            font-size: 50px;
            border-radius: 10px;
            border: 1px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            #file {
                display: none;
            }
        }

        .photo-box {
            width: 100%;

            img {
                width: 100%;
            }
        }

        .btn-group {
            gap: 0px !important;

            justify-content: space-between !important;
        }

        .footer {
            margin-top: 20px;
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
.photo {
    width: 100%;
    padding: 20px 10px;
    column-count: 3;
    column-gap: 20px;
    position: relative;



    .viewer {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999999;
        display: flex;
        color: #FFFFFF;

        .l,
        .r {
            width: 10%;
            display: flex;
            justify-content: center;
            align-items: center;

            div {
                font-size: 50px;
                user-select: none;
                cursor: pointer;
                opacity: .5;
                transition: all .2s linear;

                &:hover {
                    opacity: 1;
                }
            }
        }

        .close {
            position: absolute;
            right: 3%;
            top: 0px;
            opacity: .8;
            font-size: 60px;
            cursor: pointer;
        }

        .m {
            overflow: scroll;
            width: 78%;
            height: 100%;
            margin: 0px 1%;
            display: flex;
            justify-content: center;

            &::-webkit-scrollbar {
                width: 0px;
                height: 0px;
            }

            img {
                width: auto;
                height: 100%;
            }
        }


        &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: .5;
            background-color: #202020;
            z-index: -1;
        }
    }


    .item {
        margin-bottom: 8px;
        overflow: hidden;
        border-radius: 5px;
        position: relative;
        transition: all .2s linear;
        cursor: pointer;

        img {
            height: auto;
            object-fit: cover;
            width: 100%;
            transform: scale(1.1);
        }

        &:hover::before {
            opacity: .5;
        }

        &:hover::after {
            opacity: 1;
        }

        &:hover .img {
            transform: scale(1);
        }

        &::before {
            content: '';
            text-align: center;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: #202020;
            opacity: 0;
            transition: all .2s linear;
            z-index: 9;
        }

        &::after {
            content: '查看大图';
            letter-spacing: 3px;
            font-size: $size-20;
            color: #FFFFFF;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            opacity: 0;
        }

    }
}
</style>