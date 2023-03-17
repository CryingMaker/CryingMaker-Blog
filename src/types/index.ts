

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

type linkData = {
    readonly id: string,
    readonly url: string,
    readonly imageUrl: string,
    readonly title: string,
    readonly subTitle: string,
}

type photoData = {
    readonly id: string,
    readonly time: string,
    readonly url: string,
}

export type {
    blogData,
    messageData,
    linkData,
    photoData
}