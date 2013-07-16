/*

jOffset
-------

Version 1.1


Copyright (C) 2013 Milosz Falinski
Twitter: @miloszfalinski
Web: http://milosz.is
Github page: https://github.com/miloszfalinski/jOffset

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


(function($) {
    $.fn.extend({

        jOffset: function (options) {

            var defaults = {
                offsetX: '15',
                offsetY: '15',
                snapToCenter: true,
                triggerEvent: 'mousemove',
                framerate: 60,
                diag: false
            };

            // if user defined options, use them instead
            options = $.extend(defaults, options);

            // fire the functon for all matched elements
            return this.each(function () {
                var o = options;
                var $this = $(this);

                // define vars that don't need to be recalculated on frame
                var eltWidth = $this.width();
                var eltHeight = $this.height();
                // find center of each panel - will only work for square things.
                var centerX = (eltWidth/2);
                var centerY = (eltHeight/2);
                if (o.diag) {
                    console.log('eltWidth, centerX, centerY: ',
                        eltWidth, centerX, centerY);
                }

                // center and set image size to 100% + 2*offset
                // if o.resizeImage is true
                var image = $this.find('img');
                image.width((100 + 2*o.offsetX + '%'))
                     .height((100 + 2*o.offsetY + '%'))
                     .css({
                        // (image width - frame width) / 2
                        'left': '-' + (image.width() - eltWidth) / 2 + 'px',
                        'top': '-' + (image.height() - eltHeight) / 2 + 'px'
                    });
                if (o.snapToCenter) {
                    image.css({
                        'transition-property': 'left, top',
                        'transition-duration': '0.25s'
                    });
                }

                if (o.diag) {
                    console.log('Image - left, top: ',
                        image.css('left'), image.css('top'));
                }

                // set enableHandler to true every frame
                var timeout = 1000/o.framerate;
                var enableHandler;
                timer = window.setInterval(function(){
                    enableHandler = true;
                }, timeout);

                // define main functions
                function offsetHandler (event) {

                    // relative mouse position from top left corner of each panel
                    var mouseX = event.pageX - $this.offset().left;
                    var mouseY = event.pageY - $this.offset().top;
                    if (o.diag) {
                        console.log('mouseX, mouseY: ', mouseX, mouseY);
                    }

                    // absolute mouse distance from center -> between 0 and 1
                    var mouseDistX = (mouseX / centerX) * 100 - 100;
                    var mouseDistY = (mouseY / centerY) * 100 - 100;
                    if (o.diag) {
                        console.log('mouseDistX, mouseDistY: ', mouseX, mouseY);
                    }

                    // after all's defined do the actual position.
                    image.css({
                        // -(absolute_distance_from_center/ (100/offset -
                        // brings it down to 1:1 scale with positions))
                        // finally account for initial offset and add a unit.
                        'left': -(mouseDistX/(100/o.offsetX)) - o.offsetX + "%",
                        'top':  -(mouseDistY/(100/o.offsetY)) - o.offsetY + "%"
                    });
                }

                function snapHandlerIn (argument) {
                    if (o.diag) {
                        console.log('mouseenter fired.');
                    }
                    setTimeout(function() {
                        image.css({
                            'transition-property': 'none',
                            'transition-duration': '0'
                        });
                    }, 200);

                }
                function snapHandlerOut (event) {
                    if (o.diag) {
                        console.log('mouseleave fired.');
                    }

                    //animate left & top css to right position
                    image.animate({
                        left: '-' + (image.width() - eltWidth) / 2 + 'px',
                        top: '-' + (image.height() - eltHeight) / 2 + 'px'
                    }, 200, 'swing').css({
                        'transition-property': 'left, top',
                        'transition-duration': '0.25s'
                    });
                }

                // set events to fire when necessary
                $this.on(o.triggerEvent, function (event) {
                    // only fires if enableHandler is true, that is every frame
                    if (enableHandler) {
                        offsetHandler(event);
                        enableHandler = false;
                    }

                });

                // fires snapToCenter function, if enabled
                if (o.snapToCenter) {
                    $this.on('mouseenter', snapHandlerIn);
                    $this.on('mouseleave', snapHandlerOut);
                }
            });
        }
    });
})(jQuery);