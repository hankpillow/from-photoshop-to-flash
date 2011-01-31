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
		for (prop in this.doc.selection){
			var o = this.doc.selection[prop];
			if (o)
			{
				var p = this.getPositionFromName( o.libraryItem.name );
				if (p)
				{
					this.doc.selection[prop].x = p.x;
					this.doc.selection[prop].y = p.y;
				}
			}
			else
			{
				fl.trace("this object doesn't belong to the library or its not a bitmap object."+ o);
			}
		}
	},

	placeLibrary : function()
	{
		var to_arrange = this.library.getSelectedItems();
		if (to_arrange.length==0)
		{
			alert("Select in your library the files you want to add.");
			return;
		}

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