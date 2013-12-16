/*
 x(t) = v0 *t *cos(a)
 y(t) = v0 *t *sin(a) - (g /2) *t*t;
*/

/*
 0.142
 */

compute = function(v, a, t)
{
	hr = v *t *Math.cos(a /180 *Math.PI);
	vr = v *t *Math.sin(a /180 *Math.PI) -(g /2 *t *t);
	console.log(
		"hr: " +hr + "\t"+
		"vr :" +vr + "\t"+
		"v: " +v
	);
}

fps = 1;
v = 100;
a = 12;
t = 0;
g = 9.80665;
m = true;

l = 0.142;

while(m){
	compute(v, a, t);
	t += 1 /fps;
	v -= l /fps; 
	if(0 >= v){ v = 0; }
	if(vr < 0){
		console.log("bounce");
		m = false;
		/*
		if(v > 0){ t = 0; } 
		else { m = false; }
		*/
	}
}
