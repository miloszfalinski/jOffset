jOffset
=======


## What is jOffset
jOffset is a simple effect plugin. It takes a wrapped image and sets its position relative to the mouse. The plugin is based on the effect I created for [androidwallpape.rs](http://androidwallpape.rs/)

## Installation
A couple of things are required to get the plugin to work.

First off, you need correct HTML. An img wrapped in a HTML element is sufficient.

    <figure id="yourID">
        <img src="yourimage.jpg"/>
    </figure>

The plugin also requires some CSS to function. **Any width and height will work as long as the container has the same ratio as the image.**

    #yourID{
        width:400px;
        height:400px;
        overflow: hidden;
        position: relative;
    }

    #yourID img{
        position: absolute;
        top:0;
        left:0;
    }

Finally, JavaScript in the footer should look something like this:

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="jquery.joffset.js"></script>
    <script type="text/javascript">
        $("#yourID").jOffset({
            offsetX: '15',
            offsetY: '15'
        });
    </script>

## Options
###offsetX, offsetY [%]
Default: **15**

how much an image is offset with relation to its full size, unit must **NOT** be included

###snapToCenter [bool]
Default: **true**

enable/disable snap to center effect triggered when mouse cursor leaves the image area

###triggerEvent [event]
Default: **mousemove**

enables to change the default event triggering the offset, e.g. could be replaced with an accelerometer detection.

###framerate [num]
Default: **60**

limits the amount of times the offset event is fired, set to lower if you're experiencing issues

###diag [bool]
Default: **false**

enables some useful console.log functions, set to yes for debugging