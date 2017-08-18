/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as html from './ast';
import {ParseTreeResult} from './parser';
import {NGSP_UNICODE} from './tags';

export const PRESERVE_WS_ATTR_NAME = 'ngPreserveWhitespaces';

const SKIP_WS_TRIM_TAGS = new Set(['pre', 'template', 'textarea', 'script', 'style']);

function hasPreserveWhitespacesAttr(attrs: html.Attribute[]): boolean {
  return attrs.some((attr: html.Attribute) => attr.name === PRESERVE_WS_ATTR_NAME);
}

/**
 * This visitor can walk HTML parse tree and remove / trim text nodes using the following rules:
 * - consider spaces, tabs and new lines as whitespace characters;
 * - drop text nodes consisting of whitespace characters only;
 * - for all other text nodes replace consecutive whitespace characters with one space;
 * - convert &ngsp; pseudo-entity to a single space;
 *
 * The idea of using &ngsp; as a placeholder for non-removable space was originally introduced in
 * Angular Dart, see:
 * https://github.com/dart-lang/angular/blob/0bb611387d29d65b5af7f9d2515ab571fd3fbee4/_tests/test/compiler/preserve_whitespace_test.dart#L25-L32
 * In Angular Dart &ngsp; is converted to the 0xE500 PUA (Private Use Areas) unicode character
 * and later on replaced by a space. We are re-implementing the same idea here.
 *
 * Removal and trimming of whitespaces have positive performance impact (less code to generate
 * while compiling templates, faster view creation). At the same time it can be "destructive"
 * in some cases (whitespaces can influence layout). Becouse of the potential of breaking layout
 * this visitor is not activated by default in Angular 5 and people need to explicitly opt-in for
 * whitespace removal. The default option for whitespace removal will be revisited in Angular 6
 * and might be changed to "on" by default.
 */
class WhitespaceVisitor implements html.Visitor {
  visitElement(element: html.Element, context: any): any {
    if (SKIP_WS_TRIM_TAGS.has(element.name) || hasPreserveWhitespacesAttr(element.attrs)) {
      // don't descent into elements where we need to preserve whitespaces
      // but still visit all attributes to eliminate one used as a market to preserve WS
      return new html.Element(
          element.name, html.visitAll(this, element.attrs), element.children, element.sourceSpan,
          element.startSourceSpan, element.endSourceSpan);
    }

    return new html.Element(
        element.name, element.attrs, html.visitAll(this, element.children), element.sourceSpan,
        element.startSourceSpan, element.endSourceSpan);
  }

  visitAttribute(attribute: html.Attribute, context: any): any {
    return attribute.name !== PRESERVE_WS_ATTR_NAME ? attribute : null;
  }

  visitText(text: html.Text, context: any): any {
    const isBlank = text.value.trim().length === 0;

    if (!isBlank) {
      // lexer is replacing the &ngsp; pseudo-entity with NGSP_UNICODE
      return new html.Text(
          text.value.replace(NGSP_UNICODE, ' ').replace(/\s\s+/g, ' '), text.sourceSpan);
    }

    return null;
  }

  visitComment(comment: html.Comment, context: any): any { return comment; }

  visitExpansion(expansion: html.Expansion, context: any): any { return expansion; }

  visitExpansionCase(expansionCase: html.ExpansionCase, context: any): any { return expansionCase; }
}

export function removeWhitespaces(htmlAstWithErrors: ParseTreeResult): ParseTreeResult {
  return new ParseTreeResult(
      html.visitAll(new WhitespaceVisitor(), htmlAstWithErrors.rootNodes),
      htmlAstWithErrors.errors);
}
