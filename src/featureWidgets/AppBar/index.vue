<template lang="pug">
div
  nav.nav
    div.tabs(
        is-centered is-boxed
      )
      ul
        li(
         :class="{'is-active': isEditorEnabled }"
         @click="isEditorEnabled = true"
        )
          a WYSIWYG
        
        li(
          :class="{ 'is-active': !isEditorEnabled }"
          @click="isEditorEnabled = false"
        )
          a Ввод

        li(
          @click="isSettingsActive = true"
        )
          a
            span.icon.is-small
              i.fas.fa-sliders-h
</template>
<script>


export default {
    

}
</script>              