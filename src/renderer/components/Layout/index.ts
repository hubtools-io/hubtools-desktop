import { Layout } from './Layout';
import { LayoutControlBar } from './LayoutControlBar';
import { LayoutExplorer } from './LayoutExplorer';
import { LayoutFrame } from './LayoutFrame';
import { LayoutFrameTitle } from './LayoutFrameTitle';
import { LayoutViewBar } from './LayoutViewBar';

export default Object.assign(Layout, {
  ControlBar: LayoutControlBar,
  Explorer: LayoutExplorer,
  Frame: LayoutFrame,
  FrameTitle: LayoutFrameTitle,
  ViewBar: LayoutViewBar,
});
