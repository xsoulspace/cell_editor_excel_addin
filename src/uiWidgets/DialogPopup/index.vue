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
        .form__field
          .checkbox__input
          .chechbox__label Перенос строки
        .form__field
          .checkbox__input  
          .chechbox__label Использовать WYSIWYG(html) редактор по умолчанию
  
  
  
  
  //- div.modal__background(@click="isSettingsActive = false")
  //-         //- .checkbox__input(
  //-         //-   v-model="wrapText" type="checkbox"
  //-         //- ) 
  //-     //- 
  //-     //-   .chechbox.input(
  //-     //-     v-model="defaultEditor" type="checkbox"
  //-     //-   )
  //-     //-    
   
  //-   footer.modal__card-foot
  //-     button.button.is-success.has-fluid-width.has-margin(
  //-       @click="modalApplyHandler"
  //-     ) Применить
  //-     button.button.has-fluid-width.has-margin(
  //-       @click="isSettingsActive = false"
  //-     ) Отменить 
</template>
<script lang="ts">
import { inject } from 'vue'
import { updateIsDialogActive } from '@/screens/Home.d'

export default {
  name: 'DialogPopup',
  props: {
    isActive: { type: Boolean, required: true },
  },
  setup() {
    const updateIsDialogActive = inject<updateIsDialogActive>(
      'updateIsDialogActive'
    )
    return { updateIsDialogActive }
  },
}
</script>
