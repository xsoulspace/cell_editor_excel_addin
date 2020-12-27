<template>
  <div class="wcontainer">
    <div ref="editorReference"></div>
  </div>
</template>
<script lang="ts">
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'

//https://pineco.de/wrapping-quill-editor-in-a-vue-component/
export default {
  name: 'QuillEditor',
  props: {
    modelValue: {
      type: String,
      required: true,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    // Value Setup
    const updateValue = (val: string) => {
      context.emit('update:modelValue', val)
    }
    const textValue = computed({
      set: updateValue,
      get: () => props.modelValue,
    })
    // Editor Setup

    const editorReference = ref(null)
    const toolbarOptionsSnow = [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['clean'], // remove formatting button
    ]
    let editor: Maybe<any> = null
    watch(
      textValue,
      (val, oldVal) => {
        if (editor) {
          editor.root.innerHTML = val
        }
      },
      { immediate: true }
    )
    onMounted(() => {
      ;(editorReference.value as any).innerHTML = ''
      editor = new Quill(editorReference.value, {
        modules: {
          toolbar: toolbarOptionsSnow,
          //https://quilljs.com/docs/quickstart/
        },
        placeholder: props.placeholder,
        theme: 'snow',
      })
      // FIXME:
      // editor.on('text-change', () => updateValue(editor.root.innerHTML))
    })
    return { editorReference }
  },
}
</script>
<style lang="scss">
.wcontainer {
  // border: 1px solid #ccc;
  // display: inline-block;
  height: 70vh;
  width: 97%;
}
</style>
