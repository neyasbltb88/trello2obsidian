<template>
    <div class="DefaultPopup">
        DefaultPopup:

        <!-- FIXME: На V3 дважды вызывается обработчик -->
        <MiniBtn @click="onClick" />

        <ListItem
            :item="item"
            controlType="add"
            dense
            clickable
            hovered
            selectable
            selectOnItemClick
            controlBaseColor="ms-theme-red"
        />
    </div>
</template>

<script setup lang="ts">
import ListItem from '@components/ListItem';
import MiniBtn from '@components/MiniBtn';

defineOptions({
    name: 'DefaultPopup'
});

const item = {
    value: 'example',
    label: 'Default args',
    icon: 'cancel'
};

const onClick = (e: MouseEvent) => {
    console.log('onClick: ', e);
};
</script>

<style lang="sass">
.DefaultPopup
    width: 300px
    height: 400px
</style>
