<template lang="pug">
.checkbox
  .checkbox__input
    svg.checkbox__svg(
      v-show="isChecked"
      viewBox="0 0 10 10"
    )
      path(
        d="M 2,6 L 5,8 L 8,2"
      )
  p.checkbox__label {{ text }}
</template>
