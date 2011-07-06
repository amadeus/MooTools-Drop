/*
---
description: MooTools Drop

license: MIT-style

authors:
- Amadeus Demarzi (http://amadeusamade.us)

provides: [Drop]
...
*/
(function(){

Object.append(Element.NativeEvents, {
	dragenter: 2,
	dragleave: 2,
	dragover: 2,
	dragend: 2,
	drop: 2
});

var Drop = this.Drop = new Class({

	Implements: [Events, Options, Class.Binds],

	options: {},

	over: false,

	initialize: function(el, options){
		this.element = document.id(el);
		this.parent = this.element.getParent();
		this.dropZone = new Element('div').inject(this.element, 'after');
		this.update();
		this.setOptions(options);
		this.attach();
	},

	update: function(){
		var info = this.element.getCoordinates(this.parent);
		this.dropZone.setStyles({
			position: 'absolute',
			width: info.width,
			height: info.height,
			left: info.left,
			top: info.top
		});
	},

	attach: function(){
		this.dropZone.addEvents({
			dragenter: this.bound('enter'),
			dragleave: this.bound('leave'),
			dragover: this.bound('over'),
			drop: this.bound('drop')
		});
	},

	detach: function(){
		this.dropZone.removeEvents({
			dragenter: this.bound('enter'),
			dragleave: this.bound('leave'),
			dragover: this.bound('over'),
			drop: this.bound('drop')
		});
	},

	enter: function(e){
		if (e && e.preventDefault) e.preventDefault();
		this.fireEvent('enter', e);
	},

	leave: function(e){
		if (e && e.preventDefault) e.preventDefault();
		this.fireEvent('leave', e);
	},

	over: function(e){
		if (e && e.preventDefault) e.preventDefault();
		this.fireEvent('over', e);
	},

	drop: function(e){
		if (e && e.preventDefault) e.preventDefault();
		this.fireEvent('drop', e);
	}

});

var stop = function(e){
	e.preventDefault();
	e.stopPropagation();
};

Drop.extend({

	safeMode: false,

	enableSafeMode: function(){
		if (Drop.safeMode) return;
		Drop.safeMode = true;

		document.documentElement.addEvents({
			dragenter: stop,
			dragleave: stop,
			dragover: stop,
			drop: stop
		});
	},

	disableSafeMode: function(){
		if (!Drop.safeMode) return;
		Drop.safeMode = false;

		document.documentElement.removeEvents({
			dragenter: stop,
			dragleave: stop,
			dragover: stop,
			drop: stop
		});
	}
});

}).call(this);