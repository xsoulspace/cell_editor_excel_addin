<template lang="pug">
div.header 
  div.tabs(
    is-centered is-boxed
  )
    div.tabs_tab(
      :class="{'is-active': isEditorEnabled }"
      @click="isEditorEnabled = true"
    ) 
      div.button.--has-accent
        span.icon
          i.fas.fa-sliders-h WYSIWYG     
    
    div.tabs_tab(
      :class="{ 'is-active': !isEditorEnabled }"
      @click="isEditorEnabled = false"
    )
      div.button.--has-accent
        span.icon
          i.fas.fa-sliders-h Ввод

    div.tabs_tab(
      @click="isSettingsActive = true"
    )
      div.button.--has-accent 
        span.icon.is-small
          i.fas.fa-sliders-h Настройки

    div.tabs_tab
      div.button.--has-accent
        span.icon info
          i.fas.fa-sliders-h
</template>

<script lang="ts">
export default {}
</script>
