<template>
    <div class="form">
        <slot name="header"></slot>
        <el-form :label-width="props.labelWidth">
            <el-row>
                <template v-for="item in props.formItems" :key="item.label">
                    <el-col v-bind="props.colLayout">
                        <el-form-item
                            :label="item.label"
                            :rules="item.rule"
                            :style="props.itemLayout"
                        >
                            <template v-if="item.type == 'input' || item.type == 'password'">
                                <el-input
                                    :show-password="item.type === 'password'"
                                    :placeholder="item.placeholder"
                                    v-bind="item.otherOptions"
                                    v-model="formData[`${item.field}`]"
                                />
                            </template>
                            <template v-else-if="item.type == 'select'">
                                <el-select
                                    :placeholder="item.placeholder"
                                    v-bind="item.otherOptions"
                                    style="width: 100%"
                                    v-model="formData[`${item.field}`]"
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
                                    v-model="formData[`${item.field}`]"
                                ></el-date-picker>
                            </template>
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </el-form>
        <slot name="footer"></slot>
    </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref, watch, defineEmits, defineExpose } from 'vue'
import { IFormItem } from '../index'
const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({})
    },
    formItems: {
        type: Array as PropType<IFormItem[]>,
        required: true
    },
    labelWidth: {
        type: String,
        default: ''
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

const emit = defineEmits(['update:modelValue'])

// @update:modelValue 清空事件
// const handleValueChange = (value: any, field: string) => {
//     emit('update:modelValue', { ...props.modelValue, [field]: value })
// }
const formData = ref({ ...props.modelValue })
watch(formData, (newValue) => emit('update:modelValue', newValue), { deep: true })
// const resetForm = () => {
//     formData.value = { ...props.moduleValue }
// }

// defineExpose({ resetForm })
</script>

<style scoped></style>
