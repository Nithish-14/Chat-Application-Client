import {atom} from 'recoil'

export const roomState = atom({
    key: 'roomState',
    default: 'join'
})

export const dataState = atom({
    key: 'dataState',
    default: {
        name: '',
        room: ''
    }
})
