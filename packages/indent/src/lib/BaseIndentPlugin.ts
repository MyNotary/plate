import { type PluginConfig, createTSlatePlugin, KEYS } from 'platejs';

import { withIndent } from './withIndent';

export type IndentConfig = PluginConfig<
  'indent',
  {
    /** Maximum number of indentation. */
    indentMax?: number;
    /**
     * Indentation offset used in `(offset * element.indent) + unit`.
     *
     * @default 40
     */
    offset?: number;
    /**
     * Indentation unit used in `(offset * element.indent) + unit`.
     *
     * @default 'px'
     */
    unit?: string;
  }
>;

export const BaseIndentPlugin = createTSlatePlugin<IndentConfig>({
  key: KEYS.indent,
  inject: {
    isBlock: true,
    nodeProps: {
      nodeKey: 'indent',
      styleKey: 'marginLeft',
      transformNodeValue: ({ getOptions, nodeValue }) => {
        const { offset, unit } = getOptions();

        return nodeValue * offset! + unit!;
      },
    },
    targetPlugins: [KEYS.p],
  },
  options: {
    offset: 24,
    unit: 'px',
  },
}).overrideEditor(withIndent);
