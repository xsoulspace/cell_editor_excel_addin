(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0de507"],{"84b7":function(t,a,c){"use strict";c.r(a);var e=c("7a23"),s={class:"header"},n={class:"tabs"},i=Object(e["g"])("div",{class:"button --has-accent"},[Object(e["g"])("span",null,"WYSIWYG ")],-1),b=Object(e["g"])("div",{class:"button --has-accent"},[Object(e["g"])("span",{class:"icon"},[Object(e["g"])("i",{class:"fas fa-pencil"},"Simple")])],-1),o=Object(e["g"])("div",{class:"button --has-accent"},[Object(e["g"])("span",{class:"icon is-small"},[Object(e["g"])("i",{class:"fas fa-sliders-h"})])],-1),l=Object(e["g"])("div",{class:"tabs__tab"},[Object(e["g"])("div",{class:"button --has-accent"},[Object(e["g"])("span",{class:"icon"},[Object(e["g"])("i",{class:"fas fa-info"})])])],-1);function d(t,a,c,d,r,u){return Object(e["r"])(),Object(e["c"])("div",s,[Object(e["g"])("div",n,[Object(e["g"])("div",{class:"tabs__tab",onClick:a[1]||(a[1]=function(t){return d.changeTextEditor(d.TextEditor.WYSIWYG)})},[i]),Object(e["g"])("div",{class:"tabs__tab",onClick:a[2]||(a[2]=function(t){return d.changeTextEditor(d.TextEditor.plainText)})},[b]),Object(e["g"])("div",{class:"tabs__tab",onClick:a[3]||(a[3]=function(t){return d.updateIsDialogActive(!0)})},[o]),l])])}var r=c("f7f2"),u=c("8b5a"),g=c("54c9"),j=c("7e2a"),O={name:"AppBar",setup:function(){var t=Object(e["l"])(r["a"].updateIsDialogActive),a=u["a"].get(g["a"]),c=(a.stateRef.textEditor,function(t){a.textEditor=t});return{updateIsDialogActive:t,changeTextEditor:c,TextEditor:j["a"]}}};O.render=d;a["default"]=O}}]);