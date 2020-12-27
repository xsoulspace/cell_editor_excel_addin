<template lang="pug">
textarea.textearea(
  name="text"
  rows="1"
  placeholder="Some cell text.."
  v-model='localValue'
)
</template>
<script lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { SaveAsContentType } from '@/constants/SaveAsContentType'
import { HtmlToTextCoverter } from '@/modules/HtmlToTextConverter'
import { AppSettingsModel } from '../AppSettings/Model'
import { Provider } from '@/modules/Provider'
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
    const appSettingsModel = Provider.get<AppSettingsModel>(AppSettingsModel)
    const { saveAsContentType } = appSettingsModel.stateRef
    const updateValue = (text: string) => {
      const finalText = (() => {
        switch (saveAsContentType.value) {
          case SaveAsContentType.html:
            const formattedHtml = HtmlToTextCoverter.toHtml({ text })
            return formattedHtml
          case SaveAsContentType.plainText:
            return text
        }
      })()
      context.emit('update:modelValue', finalText)
    }
    const getValue = () => {
      const finalText = (() => {
        switch (saveAsContentType.value) {
          case SaveAsContentType.html:
            const formattedHtml = HtmlToTextCoverter.toHtml({
              text: props.modelValue,
            })
            return formattedHtml
          case SaveAsContentType.plainText:
            const formattedText = HtmlToTextCoverter.toText({
              html: props.modelValue,
            })
            return formattedText
        }
      })()
      return finalText
    }
    const textValue = computed({
      set: updateValue,
      get: getValue,
    })
    const localValue = ref('')
    watch(saveAsContentType, (newContentType, oldContentType) => {
      console.log('conver')
      console.log(textValue.value)
      localValue.value = textValue.value
    })
    onMounted(() => {
      localValue.value = textValue.value
    })
    watch(localValue, (newValue, oldValue) => {
      updateValue(newValue)
    })
    return { localValue }
  },
}
</script>
