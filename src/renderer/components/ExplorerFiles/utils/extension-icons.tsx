import AlphaYBoxIcon from 'mdi-react/AlphaYBoxIcon';
import LanguageMarkdownIcon from 'mdi-react/LanguageMarkdownIcon';
import LanguageHtml5Icon from 'mdi-react/LanguageHtml5Icon';
import LanguageJavascriptIcon from 'mdi-react/LanguageJavascriptIcon';
import CodeBracesIcon from 'mdi-react/CodeBracesIcon';
import CubeIcon from 'mdi-react/CubeIcon';
import SassIcon from 'mdi-react/SassIcon';
import LanguageTypescriptIcon from 'mdi-react/LanguageTypescriptIcon';
import LanguageCss3Icon from 'mdi-react/LanguageCss3Icon';
import FileOutlineIcon from 'mdi-react/FileOutlineIcon';

export const extensionIconSize = 14;

export const extensionIcons: Record<string, any> = {
    '': <FileOutlineIcon size={extensionIconSize} />,
    css: <LanguageCss3Icon size={extensionIconSize} color="#4281A4" />,
    html: <LanguageHtml5Icon size={extensionIconSize} color="#48A9A6" />,
    js: <LanguageJavascriptIcon size={extensionIconSize} color="#D4B483" />,
    json: <CodeBracesIcon size={extensionIconSize} color="#ff7a59" />,
    module: <CubeIcon size={extensionIconSize} color="#E3DAFF" />,
    sass: <SassIcon size={extensionIconSize} color="#C1666B" />,
    scss: <SassIcon size={extensionIconSize} color="#C1666B" />,
    ts: <LanguageTypescriptIcon size={extensionIconSize} color="#96C5B0" />,
    yml: <AlphaYBoxIcon size={extensionIconSize} color="#80A1C1" />,
    md: <LanguageMarkdownIcon size={extensionIconSize} color="#D9CFC1" />,
};
