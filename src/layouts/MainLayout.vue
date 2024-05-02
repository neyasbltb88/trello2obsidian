<template>
    <q-layout view="hHh lpR fFf" class="MainLayout">
        <q-header class="MainLayout-header">
            <q-toolbar class="MainLayout-toolbar">
                <q-toolbar-title class="MainLayout-title"> Сохранить в .md формат Obsidian </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
    name: 'MainLayout'
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style lang="sass">
.MainLayout
    &-header
        background-image: linear-gradient(15deg, $primary 0%, $secondary 100%)
    &-toolbar
        min-height: 40px
    &-title
        font-size: 15px
        font-weight: 500
</style>
