function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  // *** This styling is an extra step which is likely not required. ***

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
function setCookie(name, value, expiration){
	var d = new Date();
	d.setTime(d.getTime() + (expiration * 24 * 60 * 60 * 1000));

	document.cookie = name + "=" + value + "; expires=" + d.toUTCString() + "; path=/";
}
function handDrawCircle(ctx, cx, cy, r, rounds, callback) {

    rounds = rounds ? rounds : 3.0; // can be fractional, ie. 2.5
    
    var x, y,
    /// try to find the sweet-spot here:
    tol = Math.random() * (r * 0.03) + (r * 0.025),
    dx = Math.random() * tol * 0.75,
    dy = Math.random() * tol * 0.75,
    /// and here:
    ix = (Math.random() - 1) * (r * 0.2 * 0.022),
    iy = (Math.random() - 1) * (r * 0.15 * 0.022),
    rx = r + Math.random() * tol,
    ry = (r + Math.random() * tol) * 0.8,
    a = 0,
    ad = 3,
    i = 0,
    start = Math.random() + 50,
    tot = 360 * rounds + Math.random() * 50 - 100,
    deg2rad = Math.PI / 180,
    points = [],
    rotate = Math.random() * 0.5;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-rotate);
    ctx.translate(-cx, -cy);
    
    for (; i < tot; i += ad) {
        dx += ix;
        dy += iy;

        if (dx < -tol || dx > tol) ix = -ix;
        if (dy < -tol || dy > tol) iy = -iy;

        x = cx + (rx + dx * 2) * Math.cos(i * deg2rad + start);
        y = cy + (ry + dy * 2) * Math.sin(i * deg2rad + start);

        points.push(x, y);
        
        ad = Math.random() * 4 + 2;
    }

    i = 2;

	ctx.strokeStyle = '#7F7F7F';

    draw();

    function draw() {

        var t = 0;
        
        /// clear background, optimize by limiting the region
        ctx.clearRect(cx - r - tol, cy - r - tol, (r + tol) * 2, (r + tol) * 2);
        
        ctx.beginPath();
        ctx.moveTo(points[0], points[1]);

        for(;t <= i; t +=2) {
            ctx.lineTo(points[t], points[t + 1]);
        }
        ctx.stroke();

        i += 2;

        if (i < points.length) {
            draw();
        } else {
            ctx.restore();
        }
    }
}
/**
 * Draw's the root icon the the canvas
 * @param {Canvas} canvas The canvas to draw to
 */
function drawRoot(canvas) {
	var ctx = canvas.getContext('2d');
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#7F7F7F';

	ctx.beginPath();
	ctx.arc(24, 21, 8, 2 * Math.PI, false);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(18, 27);
	ctx.lineTo(12, 33);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(30, 27);
	ctx.lineTo(36, 33);
	ctx.stroke();
}
/**
 * Draw's the node icon the the canvas
 * @param {Canvas} canvas The canvas to draw to
 */
function drawNode(canvas) {
	var ctx = canvas.getContext('2d');
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#7F7F7F';

	ctx.beginPath();
	ctx.arc(24, 24, 8, 2 * Math.PI, false);
	ctx.stroke();
}
/**
 * Draw's the branch icon the the canvas
 * @param {Canvas} canvas The canvas to draw to
 */
function drawBranch(canvas) {
	var ctx = canvas.getContext('2d');
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#7F7F7F';

	ctx.beginPath();
	ctx.moveTo(16, 16);
	ctx.lineTo(32, 32);
	ctx.stroke();
}
/**
 * Draw's the parent icon the the canvas
 * @param {Canvas} canvas The canvas to draw to
 */
function drawParent(canvas) {
	var ctx = canvas.getContext('2d');
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#7F7F7F';

	ctx.beginPath();
	ctx.arc(24, 19, 8, 2 * Math.PI, false);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(24, 27);
	ctx.lineTo(24, 36);
	ctx.stroke();
}
/**
 * Draw's the child icon the the canvas
 * @param {Canvas} canvas The canvas to draw to
 */
function drawChild(canvas) {
	var ctx = canvas.getContext('2d');
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#7F7F7F';

	ctx.beginPath();
	ctx.moveTo(24, 8);
	ctx.lineTo(24, 16);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(24, 24, 8, 2 * Math.PI, false);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(24, 32);
	ctx.lineTo(24, 41);
	ctx.stroke();
}
/**
 * Draw's the sibling icon the the canvas
 * @param {Canvas} canvas The canvas to draw to
 */
function drawSibling(canvas) {
	var ctx = canvas.getContext('2d');
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#7F7F7F';

	ctx.beginPath();
	ctx.arc(24, 19, 4, 2 * Math.PI, false);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(20, 23);
	ctx.lineTo(14, 29);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(28, 23);
	ctx.lineTo(34, 29);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(10, 32, 4, 2 * Math.PI, false);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(38, 32, 4, 2 * Math.PI, false);
	ctx.stroke();
}
/**
 * Draw's the leaf icon the the canvas
 * @param {Canvas} canvas The canvas to draw to
 */
function drawLeaf(canvas) {
	var ctx = canvas.getContext('2d');
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#7F7F7F';

	ctx.beginPath();
	ctx.moveTo(24, 11);
	ctx.lineTo(24, 19);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(24, 27, 8, 2 * Math.PI, false);
	ctx.stroke();
}