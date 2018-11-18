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
width: 360px;
height: 360px;
margin-bottom: 0.5em;
display: block;
}
</style>

<div id="ctrlsbox" class="jxgbox mybox" style="height:100px;">
</div>
<div id="poincbox" class="jxgbox mybox" style="">
</div>

<!------------------------------------------------------------>
<!-- CODE -->

<script type="text/javascript" src="{{ site.url }}/assets/js/poincare-clicker-toy.js"></script>

<script type="text/javascript">
  var controller = new PoincareClickerController('ctrlsbox','poincbox');
</script>

## Explanation

## Acknowledgments

This toy makes use of [JSXGraph](http://jsxgraph.uni-bayreuth.de/wp/)

Suggestions welcome!
