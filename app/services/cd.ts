import { ApplicationRef, Injectable } from '@angular/core';

export function asElementData(view: any, index: number): any {
  return view.nodes[index];
}

@Injectable()
export class CdService {
    constructor(private appRef: ApplicationRef) {}

    log() {
      const appRef: any = this.appRef;
      const views: any[] = appRef._views;
      // debugger
      views.forEach(view => this.checkAndUpdateView(view._view))
    }

  checkAndUpdateView(view, embedded: boolean = false) {
    console.log(embedded, view.def.factory.name === 'proxyClass' ? view.def.factory.prototype.constructor : view.def.factory);
    //types_1.Services.updateDirectives(view, 0 /* CheckAndUpdate */);
    this.execEmbeddedViewsAction(view);
    //execQueriesAction(view, 33554432 /* TypeContentQuery */, 268435456 /* DynamicQuery */, 0 /* CheckAndUpdate */);
    //provider_1.callLifecycleHooksChildrenFirst(view, 1048576 /* AfterContentChecked */ |
    //   (view.state & 2 /* FirstCheck */ ? 524288 /* AfterContentInit */ : 0));
    //types_1.Services.updateRenderer(view, 0 /* CheckAndUpdate */);
    this.execComponentViewsAction(view);
    //execQueriesAction(view, 67108864 /* TypeViewQuery */, 268435456 /* DynamicQuery */, 0 /* CheckAndUpdate */);
    //provider_1.callLifecycleHooksChildrenFirst(view, 4194304 /* AfterViewChecked */ |
    //  (view.state & 2 /* FirstCheck */ ? 2097152 /* AfterViewInit */ : 0));
    /*if (view.def.flags & 2 /!* OnPush *!/) {
      view.state &= ~8 /!* ChecksEnabled *!/;
    }*/
  }

  execEmbeddedViewsAction(view) {
    var def = view.def;
    if (!(def.nodeFlags & 8388608 /* EmbeddedViews */)) {
      return;
    }
    for (var i = 0; i < def.nodes.length; i++) {
      var nodeDef = def.nodes[i];
      if (nodeDef.flags & 8388608 /* EmbeddedViews */) {
        // a leaf
        var embeddedViews = asElementData(view, i).viewContainer._embeddedViews;
        for (var k = 0; k < embeddedViews.length; k++) {
          this.checkAndUpdateView(embeddedViews[k], true);
        }
      }
      else if ((nodeDef.childFlags & 8388608 /* EmbeddedViews */) === 0) {
        // a parent with leafs
        // no child is a component,
        // then skip the children
        i += nodeDef.childCount;
      }
    }
  }

  execComponentViewsAction(view) {
    var def = view.def;
    if (!(def.nodeFlags & 16777216 /* ComponentView */)) {
      return;
    }
    for (var i = 0; i < def.nodes.length; i++) {
      var nodeDef = def.nodes[i];
      if (nodeDef.flags & 16777216 /* ComponentView */) {
        // a leaf
        this.checkAndUpdateView(asElementData(view, i).componentView);
      }
      else if ((nodeDef.childFlags & 16777216 /* ComponentView */) === 0) {
        // a parent with leafs
        // no child is a component,
        // then skip the children
        i += nodeDef.childCount;
      }
    }
  }
}
