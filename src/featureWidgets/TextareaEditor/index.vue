<template lang="pug">
textarea.textearea(
  name="text"
  rows="1"
  placeholder="Some cell text.."
  v-model='value'
)
</template>
<script lang="ts">
import { computed } from 'vue'
export default {
  name: 'TextareaEditor',
  props: {
    modelValue: {
      type: String,
      required: true,
      default: '',
    },
  },
  emits: ['update:modelValue'],

  setup(props, context) {
    const value = computed({
      set: (val: string) => {
        context.emit('update:modelValue', val)
      },
      get: () => props.modelValue,
    })
    return { value }
  },
}
</script>
