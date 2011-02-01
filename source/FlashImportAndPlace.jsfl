var foo =
{
	doc : null,
	timeline : null,
	library : null,
	mode : 0,
	mode_timeline : 0,
	mode_library : 1,

	init : function()
	{
		this.doc = fl.getDocumentDOM();
		if (!this.doc)
		{
			alert("No document found!");
			return;
		}

		this.library = this.doc.library;
		this.timeline = this.doc.getTimeline();

		this.mode = parseFloat(prompt("Where is your selection?\n(0) timeline | (1) library",0));
		switch (this.mode)
		{
			case this.mode_library:
				this.placeLibrary();
				break;

			case this.mode_timeline:
				this.placeTimeline();
				break;

			default:
				fl.trace("You should have chosen 0 or 1.");
				break;
		}

		this.doc.selectNone();
	},

	placeTimeline : function()
	{
		var to_arrange = this.doc.selection;
		if (to_arrange.length<0)
		{
			fl.trace("Nothing to arrange");
			return;
		}

		for (prop in to_arrange)
		{
			to_arrange[prop] = {
				name: to_arrange[prop].libraryItem.name,
				target:to_arrange[prop]
			};
		}
		
		to_arrange = this.sort(to_arrange).reverse();

		for (prop in to_arrange)
		{
			var o = to_arrange[prop].target;
			if (o)
			{
				var p = this.getPositionFromName( to_arrange[prop].name );
				if (p)
				{
					o.x = p.x;
					o.y = p.y;
				}
			}
			else
			{
				fl.trace("This object doesn't belong to the library."+ o);
			}
		}
		this.doc.distributeToLayers();
		this.doc.selectNone();
	},
	
	sort : function( array )
	{
		array = array.sort(function(a,b){
			return a.name<b.name ? -1 : 1;
		});
		return array;
	},

	placeLibrary : function()
	{
		var to_arrange = this.library.getSelectedItems();
		if (to_arrange.length==0)
		{
			alert("Select in your library the files you want to add.");
			return;
		}

		to_arrange = this.sort( to_arrange );

		var count = 0;
		while(count<to_arrange.length)
		{
			if (to_arrange[count] && to_arrange[count].name)
			{
				var point = this.getPositionFromName( to_arrange[count].name );
				if (point)
				{
					var name = to_arrange[count].name;
					// create a new layer based on image's name.
					this.timeline.addNewLayer( name );
					// add image into the new layer.
					this.library.addItemToDocument( {x:point.x,y:point.y}, name );
					// get the added item and fix the position because when flash adds 
					// an [object BitmapItem] they use a centered register point.
					if (this.doc.selection && this.doc.selection.length==1 && to_arrange[count].toString()=="[object BitmapItem]")
					{
						this.doc.selection[0].x+=this.doc.selection[0].width*0.5;
						this.doc.selection[0].y+=this.doc.selection[0].height*0.5;
					}
				}
				count++;
			}
		}
	},

	getPositionFromName : function(name)
	{
		var result = name.match(/_([\-0-9\.]+)x([\-0-9\.]+)\./);
		if (result)
		{
			return {
				x : parseFloat(result[1]) || 0,
				y : parseFloat(result[2]) || 0
			};
		}
		else
		{
			fl.trace("The name:"+name+" doesn't match with the pattern.");
		}
		return null;
	}
};
foo.init();