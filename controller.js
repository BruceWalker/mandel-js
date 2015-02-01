var controller = function() {
    var canvas = document.getElementById('canvas1'),
        context = canvas.getContext('2d'),
        width = context.canvas.width,
        height = context.canvas.height,
        imgd = context.createImageData(width,height),
        pix = imgd.data,

        xmin, xmax, ymin, ymax, 
        kx, ky, i, i, offset, 
        maxIt, x = 0.0, y = 0.0, zx = 0.0, zx0 = 0.0, zy = 0.0;
    return {
        iterate: function()  {
            var p;
            for (ky = 0; ky < height; ky++) {
                y = ymin + (ymax - ymin) * ky / height;
                for (kx = 0; kx < width; kx++) {
                    x = xmin + (xmax - xmin) * kx / width;
                    zx = x;
                    zy = y;
                    for (i = 0; i < maxIt; i++) {
                            if (zx * zx + zy * zy > 4.0) break;
                            zx0 = zx * zx - zy * zy + x;
                            zy = 2.0 * zx * zy + y;
                            zx = zx0;
                    }
                    p = (width * ky + kx) * 4; 
                    if (i>=maxIt) {
                        // paint it black
                        pix[p]=0; pix[p+1]=0; pix[p+2]=0; pix[p+3] = 255;
                     } 
		     pix[p] = i % 8 * 32;    // red
                     pix[p+1] = i % 16*16; // green
                     pix[p+2] = i % 32 * 8;  // blue
                     pix[p+3] = 255; //alpha
                     //    for (offset = 0; offset < 3; offset ++) {
                     //        pix[p+offset] = 55 +(i / maxIt * 200);
                     //    }
                     pix[p+4] = 255;
                    
                    
                    
                }
                //context.putImageData(imgd, 0,0);// draw each row 
            }

            context.putImageData(imgd, 0,0);
        },
    
        relMouseCoords:  function (event) {
            var x=event.clientX;
            var y=event.clientY;
            alert("X coords: " + x + ", Y coords: " + y);
        },
        
        draw: function() {
            // get the coordinates
            xmin = parseFloat(document.getElementById("xmin").value);
            xmax = parseFloat(document.getElementById("xmax").value);
            ymin = parseFloat(document.getElementById("ymin").value);
            ymax = parseFloat(document.getElementById("ymax").value);
            maxIt = parseFloat(document.getElementById("maxIter").value);
            this.iterate();
        },
        
        populateMin: function(event) {
            document.getElementById("xmin").value = xmin + (xmax - xmin) * event.clientX / width;
            document.getElementById("ymin").value = ymin + (ymax - ymin) * event.clientY / height;
            
        },
        populateMax: function(event) {            
            document.getElementById("xmax").value = xmin + (xmax - xmin) * event.clientX / width;
            document.getElementById("ymax").value = ymin + (ymax - ymin) * event.clientY / height;
        }
    }
} (); // invoke the function to return the controller
    
    