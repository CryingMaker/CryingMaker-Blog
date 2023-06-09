

type blogData = {
    readonly carousel_img: Array<string>,
    readonly blog_item: Array<{
        image: string,
        title: string,
        pulishTime: string,
        subTitle: string,
    }>
}
type messageData = {
    readonly id: string,
    readonly time: string,
    readonly author: string,
    readonly content: string,
    readonly color: number,
}



type photoData = {
    readonly id: string,
    readonly time: string,
    readonly url: string,
}

export type {
    blogData,
    messageData,
    photoData
}