Server = function()
{
	Ex = require("express");
	Mem = require("memcached");
	
	self = this;
	self.mem = null;
	self.app = null;
	
	self.init = function(){
		self.mem = new Mem("127.0.0.1:11211");	
		console.log("connected to memcached at: 127.0.0.1:11211");
		self.app = new Ex();
		self.app.get("/test", function(req, res){
			res.send("test()");	
		});
		self.app.get("/pull/:id", function(req, res){
			res.send("pull():" +req.params.id);
		});
		self.app.get("/push/:id", function(req, res){
			res.send("push():" +req.params.id);
		});
		self.app.listen(3000);
		console.log("listening on 127.0.0.1:3000");
	}

	
}	

Test = function()
{
	Mem = require("memcached");
	self = this;
	self.mem = null;
	
	self.init = function(quit){
		self.quit = null == quit ? self.quit : quit;
		self.mem = new Mem("127.0.0.1:11211");
		self.control("init()::done");
	},
	
	self.control = function(msg){
		switch(msg){
			case "init()::done":
				self.testSet();
				break;
			case "testSet()::done":
				self.testRead();
				break;
			case "testRead()::done":
				self.quit();
				break; 
		}
	},
	
	self.testSet = function(){
		self.mem.set("foo", "bar", 1, function(err, res){
			if(err){ self.log(err); }
			if(res){
				self.log(res);
				self.control("testSet()::done");
			}
		});
	},
	
	self.testRead = function(){
		self.mem.get("foo", function(err, res){
			if(err){ self.log(err); }
			if(res){
				self.log(res);
				self.control("testRead()::done");
			}
		});
	},
	
	self.log = function(msg){
		console.log(msg);
	},
	
	self.quit = function(){
		self.log("bye");
		process.exit();
	}
}

// test = new Test();
// test.init(function(){ console.log("i will not quit"); });
// test.init();

s = new Server();
s.init();
