# SVG Transition Plugin
This plugin is a quick and convenient way to generate fancy animated SVG transitions using the techniques used in the awesome codedrops site:
http://tympanus.net/codrops/2014/04/23/page-loading-effects/

It depends on Snap SVG to work, so call the Snap javascript file before this plugin.

## How to Use

### HTML Setup
Add something like this somewhere in your page:
$ <div id="transition-container" class="transition-overlay">
$   <svg preserveAspectRatio="none" viewBox="0 0 80 60" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" $ id="load-svg">
$ 			<polygon points="-55.375,60 -45.375,60 0,0 -55.375,0 " id="transition-shape"/>
$   </svg>
$ </div>

The polygon tag can be any SVG shape, and is the initial state of the transition. You can style this as you please with CSS.

### Javascript
#### Steps
You will need to know the steps you want to animate through. The SVG shape will morph to the points in the next step. The steps are stored in an array of objects, with each object defining the points for that step. This will be different depending on the shape type you are using, but in this example I will be using polygon.

You can define both 'in' and 'out' steps allowing 2 custom animations, allowing you to be flexible with callbacks. You can save the steps in a variable as below:

```javascript
var steps_in = [
 {points: '-24.167,60 80,60 80,0 0,0'}
];
var steps_out = [
 {points: '86.167,60,80,60,80,0,80,0'}
];
```
#### Call the plugin
Create a handle for the plugin, using the SVG tag as the selector. Include the steps you defined above:

```javascript
var transition = $('#load-svg').svgTransition({
  steps_in: steps_in,
  steps_out: steps_out
});
```

#### Play the transition
Whenever you want to play the transition, you can run the .play() method like so:

```javascript
//This will play the "in" animation
transition.play('in');
```


