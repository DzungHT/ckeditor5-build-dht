import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import downloadWordImg from '../../themes/icons/file-word-solid.svg'


export default class DownloadWord extends Plugin {

    init() {
        const editor = this.editor;
        var cfg = Object.assign(
            {
                label: 'Download file word',
                icon: downloadWordImg,
                action: function(){}
            },
            editor.config.get('downloadWord')
        );

        editor.ui.componentFactory.add('downloadWordFile', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: cfg.label,
                icon: cfg.icon,
                tooltip: true
            });

            // Callback executed once the image is clicked.
            view.on('execute', () => {
                cfg.action();
            });

            return view;
        });
    }
}