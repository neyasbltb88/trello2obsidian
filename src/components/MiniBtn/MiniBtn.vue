<template>
    <q-btn
        class="MiniBtn"
        :class="{ active, loading }"
        :style="{ '--active-color': activeColorValue }"
        dense
        :round="round"
        :flat="flat"
        :disable="disable"
        :loading="loading"
        :size="size + 'px'"
        :title="title"
        @click.prevent.stop="onClick"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
        ref="btn"
    >
        <QIconCustom :name="stateIcon" :colors="{ ...otherColors, primary: stateColor }" :size="iconSize" />
        <QIconCustom
            class="MiniBtn-corner"
            v-if="cornerIcon"
            :name="cornerIcon"
            :colors="{ ...otherColors, primary: 'ms-theme-green' }"
            :size="cornerIconSize"
        />
        <q-tooltip
            :content-class="tooltipContentClass"
            v-if="tooltip"
            :anchor="anchor"
            :self="self"
            :delay="tooltipDelay"
            :offset="tooltipOffset"
            :transition-show="tooltipTransitionShow"
            :transition-hide="tooltipTransitionHide"
            :content-style="tooltipStyleVars"
            v-model="tooltipModel"
        >
            {{ tooltip }}
        </q-tooltip>
    </q-btn>
</template>

<script>
import QIconCustom from '@components/QIconCustom';
import withTooltipProps from '@mixins/withTooltipProps';
import { getColorPaletteValue, getColorPaletteName } from '@utils';
import miniBtnProps from './miniBtnProps';

export default {
    name: 'MiniBtn',
    components: { QIconCustom },
    mixins: [withTooltipProps()],
    props: {
        ...miniBtnProps
    },

    data() {
        return {
            hover: false,
            tooltipModel: false
        };
    },

    computed: {
        iconSize() {
            return this.size * 2 - this.size / 2 + 1;
        },
        stateIcon() {
            return this.active && this.activeIcon ? this.activeIcon : this.icon;
        },
        stateColor() {
            return this.active || this.hover
                ? getColorPaletteName(this.activeColor, this.$refs?.btn?.$el)
                : getColorPaletteName(this.color, this.$refs?.btn?.$el);
        },
        activeColorName() {
            return getColorPaletteName(this.activeColor, this.$refs?.btn?.$el);
        },
        activeColorValue() {
            return getColorPaletteValue(this.activeColor, this.$refs?.btn?.$el);
        },

        tooltipStyleVars() {
            return {
                'background-color': this.tooltipBackgroundColor,
                'color': this.tooltipColor
            };
        }
    },

    methods: {
        onClick(e) {
            this.$emit('click', e);
        }
    },
    deactivated() {
        this.tooltipModel = false;
    },
    beforeDestroy() {
        this.tooltipModel = false;
    }
};
</script>

<style lang="sass">
.MiniBtn
    position: relative
    transition: color 250ms ease-in-out
    &.active, &.loading
        color: var(--active-color) !important
        .q-icon
            color: var(--active-color) !important
    .q-icon
        transition: color 250ms ease-in-out
    &-corner
        position: absolute
        right: 0px
        bottom: 0px

.MiniBtn:not(.disabled)
    &:hover
        color: var(--active-color) !important
        .q-icon
            color: var(--active-color) !important
    &:focus
        color: var(--active-color) !important
        .q-icon
            color: var(--active-color) !important
</style>
