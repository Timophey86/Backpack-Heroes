import Vue from 'vue';

export const SHOW_MSG = 'show-msg';

export const eventBusService = new Vue();

export function showMsg(txt, type='success') {
    eventBusService.$emit(SHOW_MSG, { txt, type});
}


export function increaseCount() {
    eventBusService.$emit('addCount');
}

export function filterBtCategory(category) {
    console.log('from the event bus', category);
    eventBusService.$emit('filterByCategory', category )
}