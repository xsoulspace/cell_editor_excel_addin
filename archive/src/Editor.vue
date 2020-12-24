<template>
<div class="wcontainer" >
  <div ref="editor"></div>
</div>
</template>
<script>
import 'bulma/css/bulma.css' 
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css'
import Quill from 'quill';

//https://pineco.de/wrapping-quill-editor-in-a-vue-component/
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }, 
  },
  data() {
    return {
      editor: null,
      toolbarOptionsSnow: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
      ]
    };
  },
  mounted: function() {
    this.editor = new Quill(this.$refs.editor, {
      modules: {
        toolbar: this.toolbarOptionsSnow
        //https://quilljs.com/docs/quickstart/
      },
      placeholder: this.placeholder,
      theme: 'snow',
    });

    this.editor.root.innerHTML = this.value;

    this.editor.on('text-change', this.update);
  },
  watch: {
    value: function(value){
      this.editor.root.innerHTML = value;
    }
  },
  methods: {
    update() {
      this.$emit('input', this.editor.getText() ? this.editor.root.innerHTML : '');
    }
  }
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
