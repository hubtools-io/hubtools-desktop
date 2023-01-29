export type BaseField = {
  name: string;
  label: string;
  required?: boolean;
  locked?: boolean;
  type: string;
  inline_help_text?: string;
  help_text?: string;
  default?: any;
};

export type RepeaterField = {
  occurrence?: {
    min?: number | null;
    max?: number | null;
    sorting_label_field?: string | null;
    default?: number | null;
  };
};

export type InheritedField = {
  inherited_value?: {
    default_value_path?: string | null;
  };
};

export type VisibilityField = {
  visibility?: {
    controlling_field?: string | null;
    controlling_value_regex?: string | null;
    property?: string | null;
    operator?: string | null;
  };
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

export interface AlignmentField extends BaseField {
  alignment_direction: 'HORIZONTAL' | 'VERTICAL' | 'BOTH';
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
  default?: string | null;
  multiple?: string | null;
  display?: string | null;
}

export interface ColorField extends BaseField {
  default?: {
    color?: string;
    opacity?: number;
  };
  show_opacity?: boolean;
}

export interface CTAField extends BaseField {
  default?: string | null;
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
  default?: {
    property?: string | null;
  };
}

export interface DateField extends BaseField {
  default?: number | null;
}

export interface DateTimeField extends BaseField {
  default?: number | null;
}

export interface EmailAddressField extends BaseField {
  default?: string[] | null;
}

export type EmbedSource = 'oembed' | 'html' | 'media_bridge';
export type EmbedOEmbed = 'photo' | 'video' | 'link' | 'rich';

export interface EmbedField extends BaseField {
  supported_source_types?: EmbedSource[];
  supported_oembed_types?: EmbedOEmbed[];
  supported_media_bridge_providers?: any[];
  default?: {
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
  default?: {
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
  default?: {
    response_type?: string | null;
    message?: string | null;
  };
}

export interface GroupField extends BaseField {
  tab?: string | null;
  expanded?: boolean;
  children: [];
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
  FontField & {
    id: string;
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

export type Directory = {
  id?: string;
  path?: string;
  name?: string;
  contents?: any;
  tree?: any;
};

export type NewDirectory = Omit<Directory, 'id'>;
