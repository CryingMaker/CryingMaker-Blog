import { App, defineAsyncComponent } from 'vue';

const components = import.meta.glob('../globalComponents/*.vue'); // 异步方式

export default function install(app: App) {
    for (const [key, value] of Object.entries(components)) {
        const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
        console.log(typeof value);
        app.component(name, defineAsyncComponent(value as any));
    }
}

