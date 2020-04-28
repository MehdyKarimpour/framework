import * as React from 'react'
import { EntityPack, ModifiableEntity, NormalWindowMessage } from '../Signum.Entities'
import { TypeContext, EntityFrame } from '../TypeContext'
import "./Widgets.css"
import { ErrorBoundary } from '../Components';
import { WidgetContext, EmbeddedWidget, onEmbeddedWidgets } from './Widgets'
import { Tabs, Tab } from 'react-bootstrap';
import * as Navigator from "../Navigator"


export interface WidgetEmbeddedProps {
  widgetContext: WidgetContext<ModifiableEntity>;
  children?: React.ReactNode;
}

function toTab(e: EmbeddedWidget, key: number) {
  return (
    <Tab eventKey={e.eventKey} key={key} mountOnEnter="true" title={e.title}>
      {e}
    </Tab>
  );
}

export function addAdditionalTabs(frame: EntityFrame | undefined) {
  if (frame === undefined || frame!.tabs === undefined)
    return undefined;

  return frame!.tabs!.map((e, i) => toTab(e, i)); 
}


export default function WidgetEmbedded(p: WidgetEmbeddedProps) {

  const widgets = onEmbeddedWidgets.map(a => a(p.widgetContext)).filter(a => a !== undefined).map(a => a!).flatMap(a => a);

  const top = widgets.filter(ew => ew.position === "Top").map((ew, i) => React.cloneElement(ew.embeddedWidget, { key: i }));
  const bottom = widgets.filter(ew => ew.position === "Bottom").map((ew, i) => React.cloneElement(ew.embeddedWidget, { key: i }));

  const tab = widgets.filter(ew => ew.position === "Tab");
  const es = Navigator.getSettings(p.widgetContext.frame.pack.entity.Type);

  if (tab.length > 0 && (!es?.supportsAdditionalTabs)) {
    return (
      <>
        {top}
        <Tabs id="appTabs">
          <Tab eventKey="tabMain1" title={NormalWindowMessage.Main.niceToString()}>
            {p.children}
          </Tab>
          {tab.map((e, i) => toTab(e, i))}
        </Tabs>
        {bottom}
      </>);
  }
  else {
    p.widgetContext.frame.tabs = tab
    return (
      <>
        {top}
        {p.children}
        {bottom}
      </>);
  }
}
