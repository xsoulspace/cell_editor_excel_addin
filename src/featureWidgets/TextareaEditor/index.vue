<template lang="pug">
textarea.textearea(
  name="text"
  rows="1"
  placeholder="Some cell text.."
  v-model='textValue'
)
</template>
<script lang="ts">
import { computed } from 'vue'
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
            const formattedText = HtmlToTextCoverter.toText({
              html: props.modelValue,
            })
            return formattedText
          case SaveAsContentType.plainText:
            return props.modelValue
        }
      })()
      return finalText
    }
    const textValue = computed({
      set: updateValue,
      get: () => props.modelValue,
    })
    return { textValue }
  },
}
</script>
