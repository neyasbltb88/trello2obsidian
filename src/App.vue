<template>
    <router-view />
</template>

<script setup lang="ts">
import objectForEach from '@utils/objectForEach';

const passingUtilsToWindow = (utils: Record<string, Function>) => {
    objectForEach(utils, (fn, name) => {
        // @ts-ignore
        window['_' + name] = fn;
    });
};

import * as utils from '@utils';
// @ts-ignore
window.utils = utils;
passingUtilsToWindow(utils);

defineOptions({
    name: 'App'
});
</script>
