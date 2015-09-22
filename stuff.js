var myVar;
var num=0;
var numForm=new Intl.NumberFormat();

var Helper = (function(){
	//Private Vars
	var nextID   = 1;
	var cps      = 0;
	var cpsLabel = document.getElementById("cps");
	var button0=document.getElementById("button0");
	
	// constructor
	var cls = function (name, base, mod) {
		// private
		var id = nextID++;
		var cost = base;
		var count=0;
		var label = document.getElementById("label"+id);
		var button = document.getElementById("button"+id);
		button.innerHTML="Get Help: "+numForm.format(base);
		button.style.visibility="hidden";
		

		// public (this instance only)
		this.getID   = function () { return id; };
		this.getName = function () { return name; };
		this.getCount= function () { return count; };
		this.getMod  = function () { return count*mod };
		this.showMod = function () { return mod*10 };
		this.button  = function () { return button; };
		this.label   = function () { return label; };
		this.buy     = function () { 
			count++;
			cps+=mod;
			cpsLabel.innerHTML=numForm.format(Math.round(cps*100)/10);
		};
		this.getCost = function () { 
			if(count==0) return base;
			else return Math.floor(base*Math.pow(1.15, count)); 
		};
	};
	// public static
	cls.getNextID = function () {
		return nextID;
	};
	cls.showCPS = function () {
		return Math.round(cps*100)/10;
	};
	cls.getCPS = function () {
		return Math.round(cps*100)/100;
	};
	// public (shared across instances)
	cls.prototype = {
		announce: function () {
			alert('Hi there! My id is ' + this.getID() + ' and my name is "' + this.getName() + '"!\r\n' +
				  'The next fellow\'s id will be ' + Helper.getNextID() + '!');
		}
	};
	return cls;
})();


function click0() {
	if(num==0){
		helper[0].button().style.visibility="visible";
		myVar = setInterval(loop, 100);
	}
	num++;
	if(num>100) button0.innerHTML=numForm.format(Math.round(num));
	else button0.innerHTML=numForm.format(Math.round(num*10)/10);
}

function loop() {
	num += Helper.getCPS();
	if(num>100) button0.innerHTML=numForm.format(Math.round(num));
	else button0.innerHTML=numForm.format(Math.round(num*10)/10);
	
	helper.forEach(function(h, i){
		if      ((h.button().disabled)  && (num>=h.getCost()))
			h.button().disabled=false;
		else if ((!h.button().disabled) && (num<h.getCost()))
			h.button().disabled=true;
	});
}

var helper = new Array();
helper[0]  = new Helper("First",             15,        .01);
helper[1]  = new Helper("Second",           100,        .2 );
helper[2]  = new Helper("Third",            500,        .4 );
helper[3]  = new Helper("Fourth",          3000,       1   );
helper[4]  = new Helper("Fifth",          10000,       4   );
helper[5]  = new Helper("Sixth",          40000,      10   );
helper[6]  = new Helper("Seventh",       200000,      40   );
helper[7]  = new Helper("Eighth",       1666666,     666.6 );
helper[8]  = new Helper("Ninth",      123456789,    9876.5 );
helper[9]  = new Helper("Tenth",     3999999999,   99999.9 );
helper[10] = new Helper("Eleventh", 75000000000, 1000000   );
function clicker(id) {
	var cost  = helper[id].getCost();
	var count = helper[id].getCount();
	var mod   = helper[id].showMod();
	if(num>=cost){
		if(count==0) helper[id+1].button().style.visibility="visible";
		num-=cost;
		helper[id].buy();
		cost = helper[id].getCost();
		helper[id].button().innerHTML = "Get Help: "+numForm.format(cost);
		helper[id].label().innerHTML  = +numForm.format(++count);
	}
}
helper.forEach(function(h, i){
	h.button().onclick=function(){ clicker(i); };
});