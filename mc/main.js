NokedliMaster = function()
{
	self = this;
	
	Exp = require("express");
	Mem = require("memcached");
	
	self.mem = null;
	self.app = null;
	
	self.init = function(){
		
		self.mem = new Mem("127.0.0.1:11211");	
		
		console.log("connected to memcached at: 127.0.0.1:11211");
		
		self.app = new Exp();
		
		self.app.get("/pull/:id", function(req, res){
			self.mem.get("id", function(err, rec){
				if(err){
					console.log("get():err:" +err);
				};
				if(rec){
					console.log("get():rec:" +rec);
				};
			});
			res.send("pull():" +req.params.id);
		});
		
		self.app.get("/push/:id", function(req, res){
			self.mem.set("id", "value", 10, function(err, stat){
				if(err){
					console.log("set():err:" +err);
				}
				if(stat){
					console.log("set():stat:" +stat);
				}
			});
			res.send("push():" +req.params.id);
		});
		
		self.app.listen(3000);
		
		console.log("listening on 127.0.0.1:3000");
	}
}	

nm = new NokedliMaster();
nm.init();
