<template>
    <q-item
        v-if="!isDivider_"
        class="ListItem ms-list-item"
        :class="{ [itemClass]: itemClass, 'ms-list-item--hovered': hovered, crossed, customColor: colorKey }"
        activeClass="ListItem-active"
        :clickable="clickable && !(disable || item.disable)"
        :disable="disable || item.disable"
        :dense="dense"
        :tag="getTagName"
        :target="getTarget"
        :href="getHref"
        :active="!selectable && active"
        :to="getTo"
        v-ripple="ripple"
        :data-item-id="itemId"
        @click.native="onItemClick($event)"
        :style="styleVars"
        ref="item"
    >
        <q-item-section v-if="selectable && controlSide === 'left'" side class="ListItem-section-checkbox">
            <template v-if="controlType !== 'add'">
                <component
                    :is="`q-${controlType}`"
                    class="ListItem-checkbox"
                    :class="{ [`${itemClass}-checkbox`]: itemClass, [`ms-${controlType}`]: true }"
                    keep-color
                    :disable="disable || item.disable"
                    :color="active ? controlActiveColor : controlBaseColor"
                    :dense="dense"
                    :value="value"
                    :val="itemId"
                    @input="onSelect"
                />
            </template>
            <template v-else>
                <MiniBtn
                    icon="add"
                    :size="10"
                    color="ms-theme-black-light"
                    @click="onSelect"
                    :disable="disable || item.disable"
                />
            </template>
        </q-item-section>
        <q-item-section v-if="$slots['left-chevron']" class="ListItem-section-left-chevron" side>
            <slot name="left-chevron" v-bind="listItemProps" />
        </q-item-section>
        <q-item-section v-if="getIcon && !getIconRightPosition" side>
            <QIconCustom
                class="ListItem-icon"
                :color="active ? controlActiveColor : controlBaseColor"
                :name="getIcon"
                :size="getIconSize"
            />
        </q-item-section>
        <q-item-section v-if="$slots.left" class="ListItem-section-left" side>
            <slot name="left" v-bind="listItemProps" />
        </q-item-section>
        <q-item-section v-if="getLoading" class="ListItem-section-loader" side>
            <q-spinner class="ListItem-loader" :size="loadingSize" :color="loadingColor" draggable="false" />
        </q-item-section>
        <q-item-section class="ListItem-section-label">
            <q-item-label class="ListItem-label" :class="{ [`${itemClass}-label`]: itemClass }" :lines="lines">
                <template v-if="$slots['before-label']">
                    <slot name="before-label" v-bind="listItemProps" />
                </template>

                {{ getLabel }}

                <template v-if="$slots['after-label']">
                    <slot name="after-label" v-bind="listItemProps" />
                </template>
            </q-item-label>
            <q-item-label
                class="ListItem-caption"
                :class="{ [`${itemClass}-caption`]: itemClass }"
                v-for="(caption, index) in getCaptions"
                :key="caption + index"
                caption
                :lines="captionLines"
            >
                {{ caption }}
            </q-item-label>

            <q-tooltip
                v-if="tooltip"
                :content-class="tooltipContentClass"
                :anchor="anchor"
                :self="self"
                :delay="tooltipDelay"
                :offset="tooltipOffset"
                :transition-show="tooltipTransitionShow"
                :transition-hide="tooltipTransitionHide"
            >
                {{ getTooltipLabel }}
            </q-tooltip>
        </q-item-section>
        <q-item-section v-if="getIcon && getIconRightPosition" side>
            <QIconCustom
                class="ListItem-icon"
                :color="active ? controlActiveColor : controlBaseColor"
                :name="getIcon"
                :size="getIconSize"
            />
        </q-item-section>
        <q-item-section v-if="$slots.right" class="ListItem-section-right" side>
            <slot name="right" v-bind="listItemProps" />
        </q-item-section>
        <q-item-section v-if="$slots['right-chevron']" class="ListItem-section-right-chevron" side>
            <slot name="right-chevron" v-bind="listItemProps" />
        </q-item-section>
        <q-item-section v-if="selectable && controlSide === 'right'" side class="ListItem-section-checkbox">
            <template v-if="controlType !== 'add'">
                <component
                    :is="`q-${controlType}`"
                    class="ListItem-checkbox"
                    :class="{ [`${itemClass}-checkbox`]: itemClass, [`ms-${controlType}`]: true }"
                    keep-color
                    :disable="disable || item.disable"
                    :color="active ? controlActiveColor : controlBaseColor"
                    :dense="dense"
                    :value="value"
                    :val="itemId"
                    @input="onSelect"
                />
            </template>
            <template v-else>
                <MiniBtn
                    icon="add"
                    :size="10"
                    color="ms-theme-black-light"
                    @click="onSelect"
                    :disable="disable || item.disable"
                />
            </template>
        </q-item-section>
        <q-item-section v-if="$slots['after-right-control']" class="ListItem-section-right-after" side>
            <slot name="after-right-control" v-bind="listItemProps" />
        </q-item-section>
    </q-item>
    <div v-else class="ListItem-divider" :class="{ dense }"></div>
</template>

<script>
// FIXME: В V3 заменить $scopedSlots на $slots

import QIconCustom from '@components/QIconCustom';
import MiniBtn from '@components/MiniBtn';

// FIXME: В V3(или из-за Q2) пришлось явно импортировать компоненты, которые использовались в динамическом компоненте
import { QCheckbox } from 'quasar';

import withTooltipProps from '@mixins/withTooltipProps';
import withProps from '@mixins/withProps';

import { castToArray, getColorPaletteValue, getProperty } from '@utils';

import listItemProps from './listItemProps';

export default {
    name: 'ListItem',
    emits: ['selectItem', 'itemClick'],
    components: { QIconCustom, MiniBtn, QCheckbox },
    mixins: [
        withTooltipProps(),
        // listItemProps идут через миксин withProps, чтобы их целиком можно было вешать на слоты с помощью v-bind
        withProps({ listItemProps })
    ],
    computed: {
        value() {
            if (this.controlType == 'radio') {
                if (this.active) {
                    return this.itemId;
                } else {
                    return null;
                }
            } else {
                return this.active;
            }
        },

        itemId() {
            return getProperty(this.item, this.valueKey);
        },
        isDivider_() {
            return this.item.isDivider ?? this.isDivider;
        },
        ripple() {
            if (!this.clickable || this.disable || this.noRipple) return false;

            return { color: this.rippleColor };
        },
        getCaptions() {
            const captions = getProperty(this.item, this.captionKey);
            if (!captions) return [];

            return castToArray(captions);
        },
        getTarget() {
            return this.item.target ?? '_self';
        },
        getTagName() {
            if (this.item.tag) return this.item.tag;

            // Имя тега из пропса. По умолчанию там пустая строка,
            // но можно переопределить ее, чтобы когда был включен selectable,
            // айтемы не оборачивались в label
            if (this.tag) return this.tag;

            if (this.item.href || this.getTo) return 'a';
            if (this.selectable) return 'label';

            return 'div';
        },
        getLabel() {
            return getProperty(this.item, this.labelKey);
        },
        getTooltipLabel() {
            return getProperty(this.item, this.tooltipKey) ?? this.getLabel;
        },
        getHref() {
            return this.ignoreHref ? undefined : this.item?.href;
        },
        getIcon() {
            return getProperty(this.item, this.iconKey);
        },
        getIconSize() {
            return getProperty(this.item, this.iconSizeKey) ?? this.iconSize;
        },
        getIconRightPosition() {
            return getProperty(this.item, this.iconPositionKey) === 'right' || this.iconPosition === 'right';
        },
        getTo() {
            if (this.to) return this.to;
            if (this.routeKey !== undefined) return getProperty(this.item, this.routeKey);

            return undefined;
        },
        getLoading() {
            return this.loading || getProperty(this.item, this.loadingKey);
        },
        styleVars() {
            const styleVars = {};

            if (this.color_) styleVars['--list-item-color'] = this.color_;

            return styleVars;
        },
        color_() {
            if (!this.colorKey) return;

            const property = getProperty(this.item, this.colorKey);
            return getColorPaletteValue(property);
        }
    },
    methods: {
        onSelect() {
            this.$emit('selectItem', this.item);

            if (this.emitClickWithSelect) {
                const event = new Event('click');
                this.$refs?.item?.$el?.dispatchEvent(event);
            }
        },
        onItemClick(e) {
            this.$emit('itemClick', { e, item: this.item });
        }
    }
};
</script>

<style lang="sass">
.ListItem
    &.customColor
        color: var(--list-item-color)!important
        .ListItem-icon
            color: var(--list-item-color)!important

    // FIXME: В Q2 эту высоту нужно удалить
    // &-section-label
    //     height: 100%
    &-label
        &.ellipsis
            overflow: hidden
            text-overflow: ellipsis
            white-space: normal
            word-break: break-all
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 1
    &:focus.q-item--clickable:not(.ListItem-active)
        .q-focus-helper
            opacity: 0.6
    &-divider
        border-bottom: 1px solid #ccc
        pointer-events: none
        &:not(.dense)
            margin-bottom: 3px
            padding-bottom: 3px
</style>
