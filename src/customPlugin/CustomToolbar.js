import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

import iconDefault from '../../themes/icons/dice-d6-solid.svg';

export default class CustomToolbar extends Plugin {

    init() {
        const editor = this.editor;

        var cfg = Object.assign(
            {
                name: 'customToolbar',
                label: 'Tiện ích mở rộng',
                icon: iconDefault,
                items: []
            },
            editor.config.get('customToolbar')
        );

        cfg = cfg || {};


        // Thêm toolbar riêng lẻ cho từng phần tử        
        cfg.items.forEach(toolbar => {
            editor.ui.componentFactory.add(toolbar.name, locale => {
                const view = new ButtonView(locale);

                view.set({
                    label: toolbar.label,
                    icon: toolbar.icon || iconDefault,
                    tooltip: toolbar.tooltip
                });

                // Callback executed once the image is clicked.
                view.on('execute', () => {
                    toolbar.action();
                });

                return view;
            });
        });


        // Thêm toolbar tổng hợp thành dropdown của tất cả cfg
        editor.ui.componentFactory.add(cfg.name, locale => {
            // Create a new collection and add items to it.
            const items = new Collection();

            cfg.items.forEach(toolbar => {
                items.add({
                    type: 'button',
                    model: {
                        withText: true,
                        label: toolbar.label,
                        icon: toolbar.icon || iconDefault,
                        action: toolbar.action || function () { }
                    }
                });
            });


            // Create a dropdown and add items from the collection to it. 
            const dropdownView = createDropdown(locale);
            addListToDropdown(dropdownView, items);
            // Configure dropdown properties an behavior.
            dropdownView.buttonView.set({
                label: cfg.label,
                icon: cfg.icon,
                tooltip: true,
            });

            // Insert dropdown item's value to the editor at current position.
            dropdownView.on('execute', evt => {
                evt.source.action();
            });

            return dropdownView;
        });


    }
}