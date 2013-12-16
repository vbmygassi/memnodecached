compute = function(l, a)
{
	x = l *Math.cos(a *Math.PI /180);
	y = l *Math.sin(a *Math.PI /180);
	console.log("x: " +x +" y: " +y +" a: " +a);
} 

a = 1;
a = 46;
a = 91;
a = 136;
a = 181;
a = 226;
a = 271;
a = 316;
a = 361;
a = 91;

l = 10;

compute(l, a);
