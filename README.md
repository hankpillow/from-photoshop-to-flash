# About

This project was created to do easily the work of export images from your Photoshop's Layout and import them into your Flash file keeping the layout's position properly.

Importing psd files using the 'Import' menu in Flash is not a big deal because the Photoshop don't allow You to choose the quality, and the by default is low quality.

These scripts doesn't have to work together but these fellows are really powerful when used in the recommended way.

First you choose in your psd file which layers you want to export than you run the <code>PhotoshopExportLayers</code> in the File/Scripts menu. It will export your list into a specific folder into the same level as your psd file are (the export always uses png24 format with 100% of quality).

Then it's time to move to your flash file and run the <code>FlashImportAndPlace</code> in the Command/ menu and follow the dialog box.

To know better hot it works and how to install it, see bellow:

* * *

## PhotoshopExportLayers.jsx
**Instalation:**

*"Save file as a text file with a .jsx file name extension in the Presets/Scripts folder in your Adobe
Photoshop CS4 directory."*

[documentation](https://docs.google.com/viewer?url=http://www.adobe.com/content/dam/Adobe/en/devnet/photoshop/pdfs/photoshop_cs4_scripting_guide.pdf) page 20.

*Tip: Save your git files wherever you want and just copy an alias for them into these Adobe's structure.*

### How it works?

- A folder with name {psd_path}/{psd_name}-layers/ will be created to place all exported images.
If you have a psd called ~/tmp.psd, the exported folder will be like this: ~/tmp.psd-layers/

- The script works in two modes:

* (0) All visible layers - This mode will export every visible layer in your psd file, including groups and sub-groups. 

* (1) Only selected - You can select **only one** layer, but if you want to select more than one **you have to** put it into a layer group and select the **group**.

* * *

## FlashImportAndPlace.jsx
**Instalation:**

*Windows Vista*<br>boot drive\Users\username\Local Settings\Application Data\Adobe\Flash CS4\language\Configuration\Commands

*Windows XP*<br>boot drive\Documents and Settings\user\Local Settings\Application Data\Adobe\Flash CS4\language\Configuration\Commands

*Mac OS X*<br>Macintosh HD/Users/userName/Library/Application Support/Adobe/Flash CS4/language/Configuration/Commands

[documentation](http://help.adobe.com/en_US/Flash/10.0_ExtendingFlash/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7fe8.html#WS5b3ccc516d4fbf351e63e3d118a9024f3f-7fe3).

*Tip: Save your git files wherever you want and just copy an alias for them into these Adobe's structure.*

### How it works?

The FlashImportAndPlace basically reads your selection (in the timeline or library) and, based on the file's names the script will figure out where they should be added and positioned.

I strongly recommend using only the files You have exported using the PhotoshopExportLayers.jsx because they have the proper names that this script understands.

If you prefer exporting everything by yourself, its up to you!
Just follow the pattern <code>file_name_PosXxPosY.extension</code>.
I.E.: background_100x20.png = background will be placed in x 100 and y 20.

This script works in two different ways:

**A - Importing to Flash:**

	1. Go to File/Import, and select the files you want to add.

	2. After importing usually Flash keeps all imported files selected (if not, select just the files you want do place properly).

	3. Go to Command menu and choose the FlashImportAndPlace option.

	4. When the dialog box is opened, type "1" (without quotes) and confirm.

**B - Adding existents items from your library:**

	1. Select in your flash's library the images you want to add. 

	2. Go to Command menu and choose the FlashImportAndPlace option.

	3. When the dialog box is opened, type "0" (without quotes) and confirm.

	4. Well done! Now the script will add every selected image into a new layer and place them all in the right place.

**Important:** This script was developed and tested basically for the very first moment You create the flash file and added its assets. All default Flash's configurations were kept.

You can also create your own Movieclip and name it following the pattern above, and it will works, but if you change the register point is almost certain that the script will fail.

Remeber, this is almost a kick-off script!

* * *

## For more information:

[photoshop](http://www.adobe.com/devnet/photoshop/scripting.html)

[flash api](https://docs.google.com/a/ialmeida.com/viewer?url=http://help.adobe.com/en_US/Flash/10.0_ExtendingFlash/flash_cs4_extending.pdf)

[flash docs](http://help.adobe.com/en_US/Flash/10.0_ExtendingFlash/)

These scripts were test in cs4 and cs5.

Happy coding!