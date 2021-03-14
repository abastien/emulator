import {
    dialog,
    OpenDialogReturnValue,
    BrowserWindow,
    MenuItemConstructorOptions
} from 'electron';
import * as fs from "fs";

const getMenuTemplate = (parentWindow: BrowserWindow): MenuItemConstructorOptions[] => [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                accelerator: 'CmdOrCtrl+O',
                click: (): void => {
                    dialog.showOpenDialog(
                        parentWindow,
                        {
                            filters: [
                                { name: 'NES', extensions: ['nes'] },
                            ],
                            properties:['openFile']
                        }
                    ).then((response: OpenDialogReturnValue) => {
                        if (!response.canceled) {
                            fs.readFile(response.filePaths[0], null, (err, data) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                parentWindow.webContents.send('rom-loaded', data);
                            })
                        }
                    })
                },
            },
        ]
    },
];

export default getMenuTemplate;
