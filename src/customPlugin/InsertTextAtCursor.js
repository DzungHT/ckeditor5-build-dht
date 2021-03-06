import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Command from '@ckeditor/ckeditor5-core/src/command'

class InsertTextAtCursorCommand extends Command {
    execute( message ) {
        this.editor.model.change( writer => {
            this.editor.model.insertContent( writer.createText( message ) );
        } );
    }
}

export default class InsertTextAtCursor extends Plugin {
    init() {
        const editor = this.editor;
        
        editor.commands.add( 'insertTextAtCursor', new InsertTextAtCursorCommand( editor ) );
        // Register a component which could be added to the toolbar.
        // editor.ui.componentFactory.add( 'insertDropdownItem', locale => {
        //     // Create a new collection and add items to it.
        //     const items = new Collection();
            
        //     items.add( {
        //         type: 'button',
        //         model: {
        //             withText: true,
        //             label: 'First item'
        //         }
        //     } );

        //     items.add( {
        //          type: 'button',
        //          model: {
        //             withText: true,
        //             label: 'Second item'
        //         }
        //     } );
            
        //     // Create a dropdown and add items from the collection to it. 
        //     const dropdown = createDropdown( locale );
        //     addListToDropdown( dropdown, items );

        //     // Insert dropdown item's value to the editor at current position.
        //     dropdown.on( 'execute', evt => {
        //         editor.model.change( writer => {
        //             editor.model.insertContent( writer.createText( evt.source.text ) );
        //         } );
        //     } );

        //     return dropdown;
        // } );

    }
}