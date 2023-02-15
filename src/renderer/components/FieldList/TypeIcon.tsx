import AlphaIIcon from 'mdi-react/AlphaIIcon';
import AlignHorizontalLeftIcon from 'mdi-react/AlignHorizontalLeftIcon';
import AsteriskCircleOutlineIcon from 'mdi-react/AsteriskCircleOutlineIcon';
import BorderStyleIcon from 'mdi-react/BorderStyleIcon';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import CalendarClockIcon from 'mdi-react/CalendarClockIcon';
import CheckboxMultipleOutlineIcon from 'mdi-react/CheckboxMultipleOutlineIcon';
import CreditCardOutlineIcon from 'mdi-react/CreditCardOutlineIcon';
import CursorDefaultClickOutlineIcon from 'mdi-react/CursorDefaultClickOutlineIcon';
import TableRowIcon from 'mdi-react/TableRowIcon';
import TableIcon from 'mdi-react/TableIcon';
import EmailOutlineIcon from 'mdi-react/EmailOutlineIcon';
import EmailArrowRightOutlineIcon from 'mdi-react/EmailArrowRightOutlineIcon';
import CodeBracesIcon from 'mdi-react/CodeBracesIcon';
import FileOutlineIcon from 'mdi-react/FileOutlineIcon';
import FocusFieldHorizontalIcon from 'mdi-react/FocusFieldHorizontalIcon';
import FormSelectIcon from 'mdi-react/FormSelectIcon';
import FormatParagraphSpacingIcon from 'mdi-react/FormatParagraphSpacingIcon';
import FormatAlignLeftIcon from 'mdi-react/FormatAlignLeftIcon';
import FormatSizeIcon from 'mdi-react/FormatSizeIcon';
import GradientHorizontalIcon from 'mdi-react/GradientHorizontalIcon';
import GroupIcon from 'mdi-react/GroupIcon';
import ImageOutlineIcon from 'mdi-react/ImageOutlineIcon';
import ImageSizeSelectActualIcon from 'mdi-react/ImageSizeSelectActualIcon';
import ImageTextIcon from 'mdi-react/ImageTextIcon';
import LinkIcon from 'mdi-react/LinkIcon';
import LinkVariantIcon from 'mdi-react/LinkVariantIcon';
import MenuIcon from 'mdi-react/MenuIcon';
import Numeric1BoxIcon from 'mdi-react/Numeric1BoxIcon';
import PaletteIcon from 'mdi-react/PaletteIcon';
import PageLayoutBodyIcon from 'mdi-react/PageLayoutBodyIcon';
import PostOutlineIcon from 'mdi-react/PostOutlineIcon';
import TagOutlineIcon from 'mdi-react/TagOutlineIcon';
import TextLongIcon from 'mdi-react/TextLongIcon';
import ToggleSwitchOffOutlineIcon from 'mdi-react/ToggleSwitchOffOutlineIcon';
import VideoOutlineIcon from 'mdi-react/VideoOutlineIcon';
import { defaultGroup } from '../FrameContext/defaultFields/group';
import { defaultAlignment } from '../FrameContext/defaultFields';
import { defaultBackgroundImage } from '../FrameContext/defaultFields/backgroundimage';
import { defaultBlog } from '../FrameContext/defaultFields/blog';
import { defaultBoolean } from '../FrameContext/defaultFields/boolean';
import { defaultBorder } from '../FrameContext/defaultFields/border';
import { defaultChoice } from '../FrameContext/defaultFields/choice';
import { defaultColor } from '../FrameContext/defaultFields/color';
import { defaultCTA } from '../FrameContext/defaultFields/cta';
import { defaultCRMObject } from '../FrameContext/defaultFields/crmobject';
import { defaultCRMObjectProperty } from '../FrameContext/defaultFields/crmobjectproperty';
import { defaultDate } from '../FrameContext/defaultFields/date';
import { defaultDateTime } from '../FrameContext/defaultFields/datetime';
import { defaultEmail } from '../FrameContext/defaultFields/email';
import { defaultEmbed } from '../FrameContext/defaultFields/embed';
import { defaultFile } from '../FrameContext/defaultFields/file';
import { defaultFollowupEmail } from '../FrameContext/defaultFields/followupemail';
import { defaultFont } from '../FrameContext/defaultFields/font';
import { defaultForm } from '../FrameContext/defaultFields/form';
import { defaultGradient } from '../FrameContext/defaultFields/gradient';
import { defaultHubDBRow } from '../FrameContext/defaultFields/hubdbrow';
import { defaultHubDBTable } from '../FrameContext/defaultFields/hubdbtable';
import { defaultIcon } from '../FrameContext/defaultFields/icon';
import { defaultImage } from '../FrameContext/defaultFields/image';
import { defaultLink } from '../FrameContext/defaultFields/link';
import { defaultLogo } from '../FrameContext/defaultFields/logo';
import { defaultMenu } from '../FrameContext/defaultFields/menu';
import { defaultPage } from '../FrameContext/defaultFields/page';
import { defaultNumber } from '../FrameContext/defaultFields/number';
import { defaultRichText } from '../FrameContext/defaultFields/richtext';
import { defaultSimpleMenu } from '../FrameContext/defaultFields/simplemenu';
import { defaultSpacing } from '../FrameContext/defaultFields/spacing';
import { defaultTag } from '../FrameContext/defaultFields/tag';
import { defaultText } from '../FrameContext/defaultFields/text';
import { defaultTextAlignment } from '../FrameContext/defaultFields/textalignment';
import { defaultUrl } from '../FrameContext/defaultFields/url';
import { defaultVideo } from '../FrameContext/defaultFields/video';

export const typeIconSize = 24;

export const typeIconLookup = {
    alignment: <AlignHorizontalLeftIcon size={typeIconSize} />,
    backgroundimage: <ImageSizeSelectActualIcon size={typeIconSize} />,
    boolean: <ToggleSwitchOffOutlineIcon size={typeIconSize} />,
    border: <BorderStyleIcon size={typeIconSize} />,
    blog: <PostOutlineIcon size={typeIconSize} />,
    choice: <CheckboxMultipleOutlineIcon size={typeIconSize} />,
    color: <PaletteIcon size={typeIconSize} />,
    crmobject: <FocusFieldHorizontalIcon size={typeIconSize} />,
    crmobjectproperty: <FocusFieldHorizontalIcon size={typeIconSize} />,
    cta: <CursorDefaultClickOutlineIcon size={typeIconSize} />,
    date: <CalendarBlankIcon size={typeIconSize} />,
    datetime: <CalendarClockIcon size={typeIconSize} />,
    email: <EmailOutlineIcon size={typeIconSize} />,
    embed: <CodeBracesIcon size={typeIconSize} />,
    file: <FileOutlineIcon size={typeIconSize} />,
    followupemail: <EmailArrowRightOutlineIcon size={typeIconSize} />,
    font: <FormatSizeIcon size={typeIconSize} />,
    form: <FormSelectIcon size={typeIconSize} />,
    gradient: <GradientHorizontalIcon size={typeIconSize} />,
    group: <GroupIcon size={typeIconSize} />,
    groupstyletab: <GroupIcon size={typeIconSize} />,
    hubdbrow: <TableRowIcon size={typeIconSize} />,
    hubdbtable: <TableIcon size={typeIconSize} />,
    icon: <AlphaIIcon size={typeIconSize} />,
    image: <ImageOutlineIcon size={typeIconSize} />,
    link: <LinkIcon size={typeIconSize} />,
    logo: <AsteriskCircleOutlineIcon size={typeIconSize} />,
    menu: <MenuIcon size={typeIconSize} />,
    number: <Numeric1BoxIcon size={typeIconSize} />,
    page: <PageLayoutBodyIcon size={typeIconSize} />,
    richtext: <ImageTextIcon size={typeIconSize} />,
    simplemenu: <MenuIcon size={typeIconSize} />,
    spacing: <FormatParagraphSpacingIcon size={typeIconSize} />,
    tag: <TagOutlineIcon size={typeIconSize} />,
    text: <TextLongIcon size={typeIconSize} />,
    textalignment: <FormatAlignLeftIcon size={typeIconSize} />,
    url: <LinkVariantIcon size={typeIconSize} />,
    videoplayer: <VideoOutlineIcon size={typeIconSize} />,

    // ...
    payment: <CreditCardOutlineIcon size={typeIconSize} />,
};

export const fieldsChoices = {
    group: {
        label: 'Group',
        default: defaultGroup,
    },
    groupstyletab: {
        label: 'Style Group',
        default: {
            ...defaultGroup,
            label: 'Default Style Group',
            tab: 'STYLE',
        },
    },
    alignment: {
        label: 'Alignment',
        default: defaultAlignment,
    },
    backgroundimage: {
        label: 'Background Image',
        default: defaultBackgroundImage,
    },
    blog: {
        label: 'Blog',
        default: defaultBlog,
    },
    boolean: {
        label: 'Boolean',
        default: defaultBoolean,
    },
    border: {
        label: 'Border',
        default: defaultBorder,
    },
    choice: {
        label: 'Choice',
        default: defaultChoice,
    },
    color: {
        label: 'Color',
        default: defaultColor,
    },
    cta: {
        label: 'CTA',
        default: defaultCTA,
    },
    crmobject: {
        label: 'CRM Object',
        default: defaultCRMObject,
    },
    crmobjectproperty: {
        label: 'CRM Object Property',
        default: defaultCRMObjectProperty,
    },
    date: {
        label: 'Date',
        default: defaultDate,
    },
    datetime: {
        label: 'DateTime',
        default: defaultDateTime,
    },
    email: {
        label: 'Email',
        default: defaultEmail,
    },
    embed: {
        label: 'Embed',
        default: defaultEmbed,
    },
    file: {
        label: 'File',
        default: defaultFile,
    },
    followupemail: {
        label: 'Followup Email',
        default: defaultFollowupEmail,
    },
    font: {
        label: 'Font',
        default: defaultFont,
    },
    form: {
        label: 'Form',
        default: defaultForm,
    },
    gradient: {
        label: 'Gradient',
        default: defaultGradient,
    },
    hubdbrow: {
        label: 'HubDB Row',
        default: defaultHubDBRow,
    },
    hubdbtable: {
        label: 'HubDB Table',
        default: defaultHubDBTable,
    },
    icon: {
        label: 'Icon',
        default: defaultIcon,
    },
    image: {
        label: 'Image',
        default: defaultImage,
    },
    link: {
        label: 'Link',
        default: defaultLink,
    },
    logo: {
        label: 'Logo',
        default: defaultLogo,
    },
    menu: {
        label: 'Menu',
        default: defaultMenu,
    },
    number: {
        label: 'Number',
        default: defaultNumber,
    },
    page: {
        label: 'Page',
        default: defaultPage,
    },
    richtext: {
        label: 'RichText',
        default: defaultRichText,
    },
    simplemenu: {
        label: 'Simple Menu',
        default: defaultSimpleMenu,
    },
    spacing: {
        label: 'Spacing',
        default: defaultSpacing,
    },
    tag: {
        label: 'Tag',
        default: defaultTag,
    },
    text: {
        label: 'Text',
        default: defaultText,
    },
    textalignment: {
        label: 'Text Alignment',
        default: defaultTextAlignment,
    },
    url: {
        label: 'Url',
        default: defaultUrl,
    },
    videoplayer: {
        label: 'Video',
        default: defaultVideo,
    },
};
