/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {SecurityContext, ɵLifecycleHooks as LifecycleHooks} from '@angular/core';

import {CompileDirectiveSummary, CompileProviderMetadata, CompileTokenMetadata} from '../compile_metadata';
import {AST} from '../expression_parser/ast';
import {ParseSourceSpan} from '../parse_util';

/**
 * An Abstract Syntax Tree node representing part of a parsed Angular template.
 */
export interface TemplateAst {
  /**
   * The source span from which this node was parsed.
   */
  sourceSpan: ParseSourceSpan;

  /**
   * Visit this node and possibly transform it.
   */
  visit(visitor: TemplateAstVisitor, context: any): any;
}

/**
 * A segment of text within the template.
 */
export class TextAst implements TemplateAst {
  constructor(
      public value: string, public ngContentIndex: number, public sourceSpan: ParseSourceSpan) {}
  visit(visitor: TemplateAstVisitor, context: any): any { return visitor.visitText(this, context); }
}

/**
 * A bound expression within the text of a template.
 */
export class BoundTextAst implements TemplateAst {
  constructor(
      public value: AST, public ngContentIndex: number, public sourceSpan: ParseSourceSpan) {}
  visit(visitor: TemplateAstVisitor, context: any): any {
    return visitor.visitBoundText(this, context);
  }
}

/**
 * A plain attribute on an element.
 */
export class AttrAst implements TemplateAst {
  constructor(public name: string, public value: string, public sourceSpan: ParseSourceSpan) {}
  visit(visitor: TemplateAstVisitor, context: any): any { return visitor.visitAttr(this, context); }
}

/**
 * A binding for an element property (e.g. `[property]="expression"`) or an animation trigger (e.g.
 * `[@trigger]="stateExp"`)
 */
export class BoundElementPropertyAst implements TemplateAst {
  constructor(
      public name: string, public type: PropertyBindingType,
      public securityContext: SecurityContext, public value: AST, public unit: string|null,
      public sourceSpan: ParseSourceSpan) {}
  visit(visitor: TemplateAstVisitor, context: any): any {
    return visitor.visitElementProperty(this, context);
  }
  get isAnimation(): boolean { return this.type === PropertyBindingType.Animation; }
}

/**
 * A binding for an element event (e.g. `(event)="handler()"`) or an animation trigger event (e.g.
 * `(@trigger.phase)="callback($event)"`).
 */
export class BoundEventAst implements TemplateAst {
  static calcFullName(name: string, target: string|null, phase: string|null): string {
    if (target) {
      return `${target}:${name}`;
    } else if (phase) {
      return `@${name}.${phase}`;
    } else {
      return name;
    }
  }

  constructor(
      public name: string, public target: string|null, public phase: string|null,
      public handler: AST, public sourceSpan: ParseSourceSpan) {}
  visit(visitor: TemplateAstVisitor, context: any): any {
    return visitor.visitEvent(this, context);
  }
  get fullName() { return BoundEventAst.calcFullName(this.name, this.target, this.phase); }
  get isAnimation(): boolean { return !!this.phase; }
}

/**
 * A reference declaration on an element (e.g. `let someName="expression"`).
 */
export class ReferenceAst implements TemplateAst {
  constructor(
      public name: string, public value: CompileTokenMetadata, public sourceSpan: ParseSourceSpan) {
  }
  visit(visitor: TemplateAstVisitor, context: any): any {
    return visitor.visitReference(this, context);
  }
}

/**
 * A variable declaration on a <ng-template> (e.g. `var-someName="someLocalName"`).
 */
export class VariableAst implements TemplateAst {
  constructor(public name: string, public value: string, public sourceSpan: ParseSourceSpan) {}
  visit(visitor: TemplateAstVisitor, context: any): any {
    return visitor.visitVariable(this, context);
  }
}

/**
 * An element declaration in a template.
 */
export class ElementAst implements TemplateAst {
  constructor(
      public name: string, public attrs: AttrAst[], public inputs: BoundElementPropertyAst[],
      public outputs: BoundEventAst[], public references: ReferenceAst[],
      public directives: DirectiveAst[], public providers: ProviderAst[],
      public hasViewContainer: boolean, public queryMatches: QueryMatch[],
      public children: TemplateAst[], public ngContentIndex: number|null,
      public sourceSpan: ParseSourceSpan, public endSourceSpan: ParseSourceSpan|null) {}

  visit(visitor: TemplateAstVisitor, context: any): any {
    return visitor.visitElement(this, context);
  }
}

/**
 * A `<ng-template>` element included in an Angular template.
 */
export class EmbeddedTemplateAst implements TemplateAst {
  constructor(
      public attrs: AttrAst[], public outputs: BoundEventAst[], public references: ReferenceAst[],
      public variables: VariableAst[], public directives: DirectiveAst[],
      public providers: ProviderAst[], public hasViewContainer: boolean,
      public queryMatches: QueryMatch[], public children: TemplateAst[],
      public ngContentIndex: number, public sourceSpan: ParseSourceSpan) {}

  visit(visitor: TemplateAstVisitor, context: any): any {
    return visitor.visitEmbeddedTemplate(this, context);
  }
}

/**
 * A directive property with a bound value (e.g. `*ngIf="condition").
 */
export class BoundDirectivePropertyAst implements TemplateAst {
  constructor(
      public directiveName: string, public templateName: string, public value: AST,
      public sourceSpan: ParseSourceSpan) {}
  visit(visitor: TemplateAstVisitor, context: any): any {
    return visitor.visitDirectiveProperty(this, context);
  }
}

/**
 * A directive declared on an element.
 */
export class DirectiveAst implements TemplateAst {
  constructor(
      public directive: CompileDirectiveSummary, public inputs: BoundDirectivePropertyAst[],
      public hostProperties: BoundElementPropertyAst[], public hostEvents: BoundEventAst[],
      public contentQueryStartId: number, public sourceSpan: ParseSourceSpan) {}
  visit(visitor: TemplateAstVisitor, context: any): any {
    return visitor.visitDirective(this, context);
  }
}

/**
 * A provider declared on an element
 */
export class ProviderAst implements TemplateAst {
  constructor(
      public token: CompileTokenMetadata, public multiProvider: boolean, public eager: boolean,
      public providers: CompileProviderMetadata[], public providerType: ProviderAstType,
      public lifecycleHooks: LifecycleHooks[], public sourceSpan: ParseSourceSpan) {}

  visit(visitor: TemplateAstVisitor, context: any): any {
    // No visit method in the visitor for now...
    return null;
  }
}

export enum ProviderAstType {
  PublicService,
  PrivateService,
  Component,
  Directive,
  Builtin
}

/**
 * Position where content is to be projected (instance of `<ng-content>` in a template).
 */
export class NgContentAst implements TemplateAst {
  constructor(
      public index: number, public ngContentIndex: number, public sourceSpan: ParseSourceSpan) {}
  visit(visitor: TemplateAstVisitor, context: any): any {
    return visitor.visitNgContent(this, context);
  }
}

/**
 * Enumeration of types of property bindings.
 */
export enum PropertyBindingType {

  /**
   * A normal binding to a property (e.g. `[property]="expression"`).
   */
  Property,

  /**
   * A binding to an element attribute (e.g. `[attr.name]="expression"`).
   */
  Attribute,

  /**
   * A binding to a CSS class (e.g. `[class.name]="condition"`).
   */
  Class,

  /**
   * A binding to a style rule (e.g. `[style.rule]="expression"`).
   */
  Style,

  /**
   * A binding to an animation reference (e.g. `[animate.key]="expression"`).
   */
  Animation
}

export interface QueryMatch {
  queryId: number;
  value: CompileTokenMetadata;
}

/**
 * A visitor for {@link TemplateAst} trees that will process each node.
 */
export interface TemplateAstVisitor {
  // Returning a truthy value from `visit()` will prevent `templateVisitAll()` from the call to
  // the typed method and result returned will become the result included in `visitAll()`s
  // result array.
  visit?(ast: TemplateAst, context: any): any;

  visitNgContent(ast: NgContentAst, context: any): any;
  visitEmbeddedTemplate(ast: EmbeddedTemplateAst, context: any): any;
  visitElement(ast: ElementAst, context: any): any;
  visitReference(ast: ReferenceAst, context: any): any;
  visitVariable(ast: VariableAst, context: any): any;
  visitEvent(ast: BoundEventAst, context: any): any;
  visitElementProperty(ast: BoundElementPropertyAst, context: any): any;
  visitAttr(ast: AttrAst, context: any): any;
  visitBoundText(ast: BoundTextAst, context: any): any;
  visitText(ast: TextAst, context: any): any;
  visitDirective(ast: DirectiveAst, context: any): any;
  visitDirectiveProperty(ast: BoundDirectivePropertyAst, context: any): any;
}

/**
 * Visit every node in a list of {@link TemplateAst}s with the given {@link TemplateAstVisitor}.
 */
export function templateVisitAll(
    visitor: TemplateAstVisitor, asts: TemplateAst[], context: any = null): any[] {
  const result: any[] = [];
  const visit = visitor.visit ?
      (ast: TemplateAst) => visitor.visit !(ast, context) || ast.visit(visitor, context) :
      (ast: TemplateAst) => ast.visit(visitor, context);
  asts.forEach(ast => {
    const astResult = visit(ast);
    if (astResult) {
      result.push(astResult);
    }
  });
  return result;
}
