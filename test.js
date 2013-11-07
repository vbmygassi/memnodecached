Mem = require("memcached");

Test = function()
{
	self = this;
	self.mem = null;
	
	self.init = function(){
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
	
	self.log = function(message){
		console.log(message);
	},
	
	self.quit = function(){
		self.log("bye");
		process.exit();
	}
}

test = new Test();
test.init();

// :: Mann, mann mann... 
