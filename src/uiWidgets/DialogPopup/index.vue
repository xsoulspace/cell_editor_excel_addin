<template lang="pug">
.modal(
  :class="{ '--is-active': isActive }"
  @click='updateIsDialogActive(false)'
)
  .modal__card(
    @click.stop
  )
    header.modal__card-head
      p.modal__card-title.--has-accent Настройки
      .modal__card-close(
        aria-label="close"
        @click='updateIsDialogActive(false)'
      )
        span.icon.--has-accent
          i.fas.fa-times
    
    section.modal__card-body
      .form 
        slot(name='body')         
        .form__field
          checkbox
          p.checkbox__label Перенос строки
        .form__field
          checkbox
          p.checkbox__label Использовать WYSIWYG(html) редактор по умолчанию
        .form__field
          checkbox


               
  
</template>
<script lang="ts">
import { inject } from 'vue'
import { FeatureWidgetProvider } from '@/constants/FeatureWidgetProvider'
import Checkbox from '@/uiWidgets/DialogPopup/Checkbox.vue'

export default {
  components: {
    Checkbox,
  },
  name: 'DialogPopup',
  props: {
    isActive: { type: Boolean, required: true },
  },
  setup() {
    const updateIsDialogActive = inject<updateIsDialogActive>(
      FeatureWidgetProvider.updateIsDialogActive
    )
    return { updateIsDialogActive }
  },
}
</script>
