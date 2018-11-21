---
title: Poincare section clicker toy
categories: [tool]
excerpt: Interactive toy for understanding Poincare sections and chaos
tags: [interactive]
date: 2018-11-16
jsxgraph: true
published: true
pinned: false
---

<!------------------------------------------------------------>

<style>
.mybox {
width: 400px;
// height: 360px;
margin-bottom: 0.4em;
display: block;
}

input[type=button] {
font-size: 12pt;
-webkit-appearance: push-button;
}

input[type=button,disabled] {
  color: #DCDAD1;
  cursor: not-allowed;
}
</style>

<div id="ctrlsbox" class="jxgbox mybox" style="height:75px;">
</div>
<div id="buttonbox" class="mybox" style="height: initial; width: initial;">
<input id="clear" type="button" value="Clear"/>
<input id="more" type="button" value="More from last orbit"/>
<input id="undo" type="button" disabled value="Undo add"/>
<input id="redo" type="button" disabled value="Redo"/>
<input id="zoom100" type="button" disabled value="Zoom 100%"/>
</div>
<div id="poincbox" class="jxgbox mybox" style="height: 400px;">
</div>

<!------------------------------------------------------------>
<!-- CODE -->

<script type="text/javascript" src="{{ site.url }}/assets/js/poincare-clicker-toy.js"></script>

<script type="text/javascript">
  var controller = new PoincareClickerController('ctrlsbox','buttonbox','poincbox');
</script>

## Explanation

## Acknowledgments

This toy makes use of [JSXGraph](http://jsxgraph.uni-bayreuth.de/wp/)

Suggestions welcome!
