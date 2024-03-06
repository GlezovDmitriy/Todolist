import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import React from "react";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";

export  default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}


export const AppWithReduxBaseExample = () =>{
    return <>
        <AppWithRedux/>
    </>
}