import { VideoField } from '../FrameContext.types';

export const defaultVideo = {
  name: 'default_video',
  label: 'Default Video',
  required: false,
  locked: false,
  type: 'videoplayer',
  show_advanced_options: false,
  default: {
    player_id: 32173842991,
    height: 1224,
    width: 1872,
    conversion_asset: {
      type: 'CTA',
      id: 'c3e4fa03-2c69-461d-b9af-22b2fde86bc7',
      position: 'POST',
    },
    loop_video: false,
    mute_by_default: false,
    autoplay: false,
    hide_control: false,
  },
} as VideoField;
