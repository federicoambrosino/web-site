---
title: Complex polynomial roots toy
categories: [tool]
excerpt: Interactive toy for visualizing relationship between polynomial roots and coefficients
tags: [interactive, algebra, polynomial, roots]
date: 2017-12-14
jsxgraph: true
published: true
pinned: false
---

<!------------------------------------------------------------>

<style>
.mybox {
width: 360px;
height: 360px;
margin-bottom: 1em;
display: inline-block;
}

.myDegInput {
width: 4em;
}

.myLabel {
display: inline-block;
}

.myBoxTitle {
padding: 10px;
text-decoration: underline;
}
</style>

<form>
<label for="degView" class="myLabel">Degree of polynomial:</label>
<input type="number" name="degView" id="degView" class="myDegInput" min="1" max="7" step="1" value="4">
</form>

<div id="coeffbox" class="jxgbox mybox" style="">
</div>
<div id="rootbox" class="jxgbox mybox" style="">
</div>

<!------------------------------------------------------------>
<!-- CODE -->

<script type="text/javascript" src="{{ site.url }}/assets/js/fraction.min.js"></script>
<script type="text/javascript" src="{{ site.url }}/assets/js/complex.min.js"></script>
<script type="text/javascript" src="{{ site.url }}/assets/js/quaternion.min.js"></script>
<script type="text/javascript" src="{{ site.url }}/assets/js/polynomial.min.js"></script>

<script type="text/javascript" src="{{ site.url }}/assets/js/poly-root-toy.js"></script>

<script type="text/javascript">
  var controller = new PolyRootController("rootbox","coeffbox", "degView");
</script>
