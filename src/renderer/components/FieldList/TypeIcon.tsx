import AlphaIIcon from 'mdi-react/AlphaIIcon';
import AlignHorizontalLeftIcon from 'mdi-react/AlignHorizontalLeftIcon';
import BorderStyleIcon from 'mdi-react/BorderStyleIcon';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import CalendarClockIcon from 'mdi-react/CalendarClockIcon';
import CheckboxMultipleOutlineIcon from 'mdi-react/CheckboxMultipleOutlineIcon';
import CreditCardOutlineIcon from 'mdi-react/CreditCardOutlineIcon';
import CursorDefaultClickOutlineIcon from 'mdi-react/CursorDefaultClickOutlineIcon';
import EmailOutlineIcon from 'mdi-react/EmailOutlineIcon';
import EmailArrowRightOutlineIcon from 'mdi-react/EmailArrowRightOutlineIcon';
import CodeBracesIcon from 'mdi-react/CodeBracesIcon';
import FileOutlineIcon from 'mdi-react/FileOutlineIcon';
import FocusFieldHorizontalIcon from 'mdi-react/FocusFieldHorizontalIcon';
import FormSelectIcon from 'mdi-react/FormSelectIcon';
import FormatParagraphSpacingIcon from 'mdi-react/FormatParagraphSpacingIcon';
import FormatSizeIcon from 'mdi-react/FormatSizeIcon';
import GradientHorizontalIcon from 'mdi-react/GradientHorizontalIcon';
import GroupIcon from 'mdi-react/GroupIcon';
import ImageOutlineIcon from 'mdi-react/ImageOutlineIcon';
import ImageSizeSelectActualIcon from 'mdi-react/ImageSizeSelectActualIcon';
import ImageTextIcon from 'mdi-react/ImageTextIcon';
import LinkIcon from 'mdi-react/LinkIcon';
import MenuIcon from 'mdi-react/MenuIcon';
import Numeric1BoxIcon from 'mdi-react/Numeric1BoxIcon';
import PaletteIcon from 'mdi-react/PaletteIcon';
import PostOutlineIcon from 'mdi-react/PostOutlineIcon';
import TextLongIcon from 'mdi-react/TextLongIcon';
import ToggleSwitchOffOutlineIcon from 'mdi-react/ToggleSwitchOffOutlineIcon';
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

  // ...
  gradient: <GradientHorizontalIcon size={typeIconSize} />,
  group: <GroupIcon size={typeIconSize} />,
  groupstyletab: <GroupIcon size={typeIconSize} />,
  icon: <AlphaIIcon size={typeIconSize} />,
  image: <ImageOutlineIcon size={typeIconSize} />,
  link: <LinkIcon size={typeIconSize} />,
  menu: <MenuIcon size={typeIconSize} />,
  number: <Numeric1BoxIcon size={typeIconSize} />,
  payment: <CreditCardOutlineIcon size={typeIconSize} />,
  richtext: <ImageTextIcon size={typeIconSize} />,
  spacing: <FormatParagraphSpacingIcon size={typeIconSize} />,
  text: <TextLongIcon size={typeIconSize} />,
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
};
