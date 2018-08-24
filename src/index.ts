import { IRenderMime } from '@jupyterlab/rendermime-interfaces';


import { JSONObject } from '@phosphor/coreutils';


import { Widget } from '@phosphor/widgets';

import '../style/index.css';

/**
 * The default mime type for the extension.
 */
const MIME_TYPE = 'application/cx';

/**
 * The class name added to the extension.
 */
const CLASS_NAME = 'mimerenderer-cx';

/**
 * A widget for rendering cx.
 */
export class OutputWidget extends Widget implements IRenderMime.IRenderer {
  /**
   * Construct a new output widget.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();

    console.log('Instanciated')
    this._mimeType = options.mimeType;
    this.addClass(CLASS_NAME);
  }

  /**
   * Render cx into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    let data = model.data[this._mimeType] as JSONObject;
    console.log('CX renderer called: ', data)

    const dataSize = data.length
    this.node.textContent = 'This file contains ' + dataSize + ' entries.';
    
    return Promise.resolve();
  }

  private _mimeType: string;
}

/**
 * A mime renderer factory for cx data.
 */
export const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: options => new OutputWidget(options)
};

/**
 * Extension definition.
 */
const extension: IRenderMime.IExtension = {
  id: 'mime-rend1:plugin',
  rendererFactory,
  rank: 0,
  dataType: 'json',
  fileTypes: [
    {
      name: 'cx',
      mimeTypes: [MIME_TYPE],
      extensions: ['.cx']
    }
  ],
  documentWidgetFactoryOptions: {
    name: 'My Viewer',
    primaryFileType: 'cx',
    fileTypes: ['cx'],
    defaultFor: ['cx']
  }
};

export default extension;
