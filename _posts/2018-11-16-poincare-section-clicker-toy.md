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
// width: 360px;
// height: 360px;
margin-bottom: 0.4em;
display: block;
}

button {
font-size: 12pt;
-webkit-appearance: push-button;
}

button[disabled] {
  color: #DCDAD1;
  cursor: not-allowed;
}
</style>

<div id="ctrlsbox" class="jxgbox mybox" style="width: 400px; height:2.5em;">
</div>
<div id="buttonbox" class="mybox" style="height: initial; width: initial;">
<button id="clear" type="button">Clear</button>
<button id="more" type="button">More from last orbit</button>
<button id="undo" type="button" disabled>Undo add</button>
<button id="undo" type="button" disabled>Redo</button>
</div>
<div id="poincbox" class="jxgbox mybox" style="width: 400px; height: 400px;">
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
