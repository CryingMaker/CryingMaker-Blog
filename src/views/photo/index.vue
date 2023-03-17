<template>
    <div class="photo">
        <div class="item" v-for="(item, index) in photoList" :key="item.id" @click="handleClick(item.url)">
            <img :src="`http://rr7bir25x.hd-bkt.clouddn.com/${item.url}`">
        </div>

        <n-button @click="showModal = true">添加一张图片</n-button>
        <n-modal v-model:show="showModal" transform-origin="center" :onMaskClick="onClose" class="modal">
            <n-card style="width: 80%;" title="留下一张图片吧!(一次只能上传一张照片哦)" :bordered="true" size="huge" role="dialog"
                aria-modal="true">
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
                        <n-space>
                            <n-button :loading="loading" @click="handleUpload()">上传图片</n-button>
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
                    <img :src="`http://rr7bir25x.hd-bkt.clouddn.com/${viewerUrl}`">
                </div>
                <div class="r">
                    <div class="close" @click="closeViewer()">
                        <svg class="icon svg-icon" aria-hidden="true">
                            <use xlink:href="#icon-guanbi"></use>
                        </svg>
                    </div>
                    <div @click="next()">
                        <svg class="icon svg-icon" aria-hidden="true">
                            <use xlink:href="#icon-next"></use>
                        </svg>
                    </div>
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
const contentStore = useContentStore();
const message = useMessage();


//按钮是否显示加载状态
const loading = ref()

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

//取消图片上传
const cancelUpload = () => {
    onClose();
    showModal.value = false;
    //在上传过程中也可以取消
    if (subscription) {
        subscription.unsubscribe();
        message.warning('取消上传成功')
    }
}


//真实文件
const file = ref();

//临时文件
const tempUrl = ref()


let subscription: any;
//上传图片
const upload = async () => {
    let key = nanoid() + new Date().getTime();
    let token = await getToken();
    let putExtra = {};
    let config = {};
    const observable = qiniu.upload(file.value.files[0], key, token, putExtra, config)

    const observer = {
        next(res: any) {
        },
        error(err: any) {
            message.error('图片上传失败!');
            loading.value = false;
            console.log(err);
        },
        async complete(res: any) {
            await sendPhotos(res.key);
            loading.value = false;
            isShowViewer.value = false;
            showModal.value = false;
            message.success('图片上传成功!');
        }
    }
    subscription = observable.subscribe(observer) // 上传开始
}


//是否显示添加照片modal
let showModal = ref(false);
//是否显示添加图片按钮
let isShowAdd = ref(true);

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
    reader.readAsDataURL(file.value.files[0])
    isShowAdd.value = false;
}



//照片数据
let photoList = ref<Array<photoData>>([]);

//上传照片
const sendPhotos = async (url: string) => {
    try {
        let tempData = { id: nanoid(), time: getTime(), url }
        await sendPhoto(tempData);
        photoList.value.unshift(tempData);
        message.success('图片上传成功!')
    } catch (error) {
        console.error(error);
        message.error('图片上传失败!')
    }
}

// 请求照片信息
const getPhotos = async () => {
    try {
        if (contentStore.pageNum) {
            let res: Array<photoData> = await getPhoto(contentStore.pageNum, contentStore.pageSize);
            photoList.value = photoList.value.concat(...res);
            contentStore.incrementPageNum();

            if (res.length < contentStore.pageSize) {
                contentStore.setPageNum(0);
                message.info('没有更多照片了!');
                return false;
            }
            return true;
        }
    } catch (error) {
        console.error(error);
        message.error('获取照片失败!');
        return false;
    }
}


//处理点击图片事件
const handleClick = (url: string) => {
    viewerUrl.value = url;
    isShowViewer.value = true;
}


let viewerUrl = ref<string>('')
let isShowViewer = ref(false);
//是否显示viewer
const closeViewer = () => {
    isShowViewer.value = false;
}

//图片的切换
const next = () => {
    console.log('next');
}
const previous = () => {
    console.log('previous');
}


onMounted(async () => {
    await getPhotos();
})

</script>

<style lang="scss" scoped>
@media screen and (max-width:1350px) {
    .photo {
        column-count: 2 !important;

        .item {
            margin-bottom: 15px !important;
        }
    }
}

@media screen and (max-width:1100px) {
    .photo {
        column-count: 1 !important;

        .item {
            margin-bottom: 30px !important;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all .2s ease-in-out;
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.modal {
    margin-top: 60px;


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
            border: 1px solid $gray-1;
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

        .footer {
            margin-top: 20px;
        }
    }
}


.photo {
    width: 100%;
    padding: 20px 10px;
    column-count: 3;
    column-gap: 20px;




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

        .r {
            .close {
                position: absolute;
                top: 0px;
                opacity: .8;
            }
        }

        .m {
            overflow-y: scroll;
            width: 78%;
            margin: 0px 1%;

            &::-webkit-scrollbar {
                width: 0px;
                height: 0px;
            }

            img {
                width: 100%;
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
            color: $gray-10;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: $gray-1;
            opacity: 0;
            transition: all .2s linear;
            z-index: 9;
        }

        &::after {
            content: '查看大图';
            letter-spacing: 3px;
            font-size: $size-20;
            color: $gray-10;
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