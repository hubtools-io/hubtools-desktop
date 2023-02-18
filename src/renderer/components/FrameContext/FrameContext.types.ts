export type BaseField = {
    id?: string;
    name: string;
    label: string;
    required: boolean | null;
    locked: boolean | null;
    type?: string;
    inline_help_text?: string;
    help_text?: string;
    display_width?: any;
};

export type RepeaterField = {
    occurrence?: {
        min?: number | null;
        max?: number | null;
        sorting_label_field?: string | null;
        default: number | null;
    };
};

export type InheritedField = {
    inherited_value?: {
        default_value_path?: string | null;
    };
};

export type VisibilityField = {
    visibility?:
        | {
              controlling_field?: string;
              controlling_value_regex?: string;
              property?: string;
              operator?: string;
          }
        | null
        | string;
};

export type AdvancedVisibilityField = {
    advanced_visibility?: {
        boolean_operator?: string | null;
        criteria?: [
            {
                controlling_field?: string | null;
                controlling_value_regex?: string | null;
                operator?: string | null;
            },
            {
                controlling_field?: string | null;
                controlling_value_regex?: string | null;
                operator?: string | null;
            }
        ];
    };
};

export type SideBySideField = {
    display_width: string | null;
};

export interface AlignmentField extends BaseField, VisibilityField {
    alignment_direction?: string;
    default: {
        horizontal_align?: string;
        vertical_align?: string;
    };
}

export interface BackgroundImageField extends BaseField {
    default: {
        src?: string;
        background_position?: string;
        background_size?: string;
    };
}

export interface BlogField extends BaseField {
    default: number;
}

export interface BooleanField extends BaseField {
    display?: 'toggle' | 'checkbox';
    default: boolean;
}

type BorderValue = {
    width?: { value?: number; units?: string };
    opacity?: number;
    style?: string;
    color?: string;
};

export interface BorderField extends BaseField {
    display?: {
        top?: BorderValue | null;
        bottom?: BorderValue | null;
        left?: BorderValue | null;
        right?: BorderValue | null;
    };
}

export interface ChoiceField extends BaseField {
    choices?: any[] | null;
    default: string | null;
    multiple?: string | null;
    display?: string | null;
}

export interface ColorField extends BaseField {
    default: {
        color?: string;
        opacity?: number;
    };
    show_opacity?: boolean;
}

export interface CTAField extends BaseField {
    default: string | null;
}

export interface CRMObjectField extends BaseField {
    object_type: string;
    properties_to_fetch?: any[];
    default: {
        id?: number | null;
    };
}

export interface CRMObjectPropertyField extends BaseField {
    object_type: string;
    default: {
        property?: string | null;
    };
}

export interface DateField extends BaseField {
    default: number | null;
}

export interface DateTimeField extends BaseField {
    default: number | null;
}

export interface EmailAddressField extends BaseField {
    default: string[] | null;
}

export type EmbedSource = 'oembed' | 'html' | 'media_bridge';
export type EmbedOEmbed = 'photo' | 'video' | 'link' | 'rich';

export interface EmbedField extends BaseField {
    supported_source_types?: EmbedSource[];
    supported_oembed_types?: EmbedOEmbed[];
    supported_media_bridge_providers?: any[];
    default: {
        source_type?: 'oembed';
    };
}

export interface FileField extends BaseField {
    default: string | null;
    picker?: string | null;
}

export interface FollowupEmailField extends BaseField {
    default: string | null;
}

export interface FontField extends BaseField {
    default: {
        size?: number | null;
        size_unit?: string | null;
        color?: string | null;
        styles?: any;
    };
    load_external_fonts?: boolean;
    visibility?: {
        hidden_subfields?: {
            font?: boolean | null;
            size?: boolean | null;
        };
    };
    variant?: string | number | null;
}

export interface FormField extends BaseField {
    default: {
        response_type?: string | null;
        message?: string | null;
    };
}

export type Color = {
    color: {
        r?: number;
        g?: number;
        b: number;
        a: number;
    };
};

export interface GradientField extends BaseField {
    default: {
        colors?: Color[];
    };
    side_or_corner?: {
        verticalSize?: string | null;
        horizontalSide?: string | null;
    };
}

export interface GroupField extends BaseField {
    tab?: string | null;
    expanded?: boolean;
    children: [];
}

export interface HubDBRowField extends BaseField {
    table_name_or_id?: string | null;
    columns_to_fetch?: string[] | null;
    display_columns?: string[] | null;
    display_format?: string | null;
    default: {
        id?: string | number | null;
    };
}

export interface HubDBTableField extends BaseField {
    default: string | number | null;
}

export interface IconField extends BaseField {
    default: {
        name?: string;
        unicode?: string;
        type?: string;
    };
    icon_set?: string;
}

export interface ImageField extends BaseField {
    default: {
        size_type?: string | null;
        src?: string | null;
        alt?: string | null;
        loading?: string | null;
    };
    responsive?: boolean;
    show_loading?: boolean;
}

export interface LinkField extends BaseField {
    default: any;
    supported_types?: string[] | null;
    show_advanced_rel_options?: boolean | null;
}

export interface LogoField extends BaseField {
    show_loading?: any;
    default: any;
}

export interface MenuField extends BaseField {
    default: any;
}

export interface NumberField extends BaseField {
    default: any;
    prefix?: any;
    suffix?: any;
    placeholder?: any;
}

export interface PageField extends BaseField {
    default: any;
}

export interface RichTextField extends BaseField {
    default: any;
    enable_features?: any;
}

export interface SimpleMenuField extends BaseField {
    default: any;
}

export interface SpacingField extends BaseField {
    default: any;
    limits?: any;
}

export interface TagField extends BaseField {
    default: any;
}

export interface TextField extends BaseField {
    default: any;
}

export interface TextAlignmentField extends BaseField {
    default: any;
    alignment_direction?: any;
}

export interface UrlField extends BaseField {
    default: any;
    supported_types?: any;
}

export interface VideoField extends BaseField {
    default: any;
    show_advanced_options?: any;
}

export type Field = RepeaterField &
    InheritedField &
    VisibilityField &
    AdvancedVisibilityField &
    SideBySideField &
    GroupField &
    AlignmentField &
    BackgroundImageField &
    BaseField &
    BooleanField &
    BorderField &
    ChoiceField &
    ColorField &
    CTAField &
    CRMObjectField &
    CRMObjectPropertyField &
    DateField &
    DateTimeField &
    EmailAddressField &
    EmbedField &
    FileField &
    FollowupEmailField &
    FontField &
    GradientField &
    HubDBRowField &
    HubDBTableField &
    IconField &
    ImageField &
    LinkField &
    LogoField &
    MenuField &
    NumberField &
    PageField &
    RichTextField &
    SimpleMenuField &
    SpacingField &
    TagField &
    TextField &
    TextAlignmentField &
    UrlField &
    VideoField & {
        internalId?: any;
    };

export type NewField = Omit<Field, 'id'>;

export type FrameFile = {
    id?: string;
    contents?: any;
    edited?: boolean;
    path?: string;
    name?: string;
    type?: 'fields' | 'meta' | 'html' | 'css' | 'js' | 'unknown';
    extension?: string;
};

export type NewFrameFile = Omit<FrameFile, 'id'>;

// -----------------------------------------------------

export type Message = {
    text: string;
    autoDismiss: boolean;
};

export type ErrorMessage = {
    code: number;
    message: string;
};

export type Path = string;

export type DirectoryContentItem = {
    path: string;
    isDirectory: boolean;
};

export type Directory = {
    name?: string;
    path?: Path;
    contents?: DirectoryContentItem[];
};

export type DirectoryResponse = {
    data: {
        requestType?: string;
        error?: ErrorMessage;
        directory?: Directory;
    };
};

export type DirectoryExpandResponse = {
    data: {
        expandArray?: string[];
    };
};

export type DirectoryTreeItem = {
    path: Path;
    name: string;
    extension: string | null;
    children: any[];
    isDirectory: boolean;
};

export type DirectoryTree = DirectoryTreeItem[];

export type HFile = {
    name?: string;
    path?: Path;
    extension?: string;
    contents?: any;
};

export type HFileResponse = {
    data: {
        error?: ErrorMessage;
        file?: HFile;
    };
};
