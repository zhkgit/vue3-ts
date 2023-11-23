<template>
    <div class="form">
        <el-form label-width="100px">
            <el-row>
                <template v-for="item in props.formItems" :key="item.label">
                    <el-col v-bind="props.colLayout">
                        <el-form-item
                            :label="item.label"
                            :rules="item.rules"
                            :style="props.itemLayout"
                        >
                            <template v-if="item.type == 'input' || item.type == 'password'">
                                <el-input
                                    :show-password="item.type === 'password'"
                                    :placeholder="item.placeholder"
                                    v-bind="item.otherOptions"
                                />
                            </template>
                            <template v-else-if="item.type == 'select'">
                                <el-select
                                    :placeholder="item.placeholder"
                                    v-bind="item.otherOptions"
                                    style="width: 100%"
                                >
                                    <el-option
                                        v-for="option in item.options"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                        {{ option.title }}
                                    </el-option>
                                </el-select>
                            </template>
                            <template v-else-if="item.type === 'datepicker'">
                                <el-date-picker
                                    style="width: 100%"
                                    v-bind="item.otherOptions"
                                ></el-date-picker>
                            </template>
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { IFormItem } from '../index'
const props = defineProps({
    formItems: {
        type: Array as PropType<IFormItem[]>,
        default: () => []
    },
    labelWidth: {
        type: String,
        default: '100px'
    },
    itemLayout: {
        type: Object,
        default: () => ({ padding: '10 40px' })
    },
    colLayout: {
        type: Object,
        default: () => ({
            xl: 6, // >1920px 4个
            lg: 8,
            md: 12,
            sm: 24,
            xs: 24
        })
    }
})
</script>

<style scoped></style>
