(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c7b4f"],{5284:function(e,n,t){"use strict";t.r(n);var a=t("7a23"),c=Object(a["g"])("div",null,"App Settings",-1),l=Object(a["f"])("Theme"),o=Object(a["f"])("Language"),u=Object(a["f"])("Save As Content Type:");function i(e,n,t,i,p,g){return Object(a["r"])(),Object(a["c"])("div",null,[c,Object(a["g"])("div",null,[l,Object(a["g"])("div",{onClick:n[1]||(n[1]=function(){return i.changeTheme&&i.changeTheme.apply(i,arguments)})},Object(a["B"])(i.theme),1)]),Object(a["g"])("div",null,[o,Object(a["g"])("div",{onClick:n[2]||(n[2]=function(){return i.changeLocale&&i.changeLocale.apply(i,arguments)})},Object(a["B"])(i.locale),1)]),Object(a["g"])("div",null,[u,Object(a["g"])("div",{onClick:n[3]||(n[3]=function(){return i.changeSaveAsContentType&&i.changeSaveAsContentType.apply(i,arguments)})},Object(a["B"])(i.saveAsContentType),1)])])}var p=t("54c9"),g=t("a4c2"),s=t("b392"),h=t("8b5a"),r=t("8388"),v={name:"AppSettings",setup:function(){var e=h["a"].get(p["a"]),n=e.stateRef,t=n.theme,a=n.locale,c=n.saveAsContentType,l=function(){e.theme=t.value==s["a"].dark?s["a"].light:s["a"].dark},o=function(){e.locale=a.value==g["a"].rus?g["a"].eng:g["a"].rus},u=function(){e.saveAsContentType=c.value==r["a"].html?r["a"].plainText:r["a"].html};return{theme:t,changeTheme:l,locale:a,changeLocale:o,saveAsContentType:c,changeSaveAsContentType:u}}};v.render=i;n["default"]=v}}]);