/* eslint-disable */
import { createElement } from 'react';
import { Table } from 'semantic-ui-react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function GetEntityHeaders(entities, header) {
    var headersRelated = entities.reduce(function (pn, u) { return __spreadArrays(pn, u.RelatedIds.filter(function (a) { return a.name !== ""; }).map(function (s) { return s.EntityIndex; })); }, []);
    return headersRelated.filter(function (n, i) { return headersRelated.indexOf(n) === i; }).map(function (s) { return ({ index: s, name: header(s) }); });
}
function GetPropHeaders(entities, header) {
    var headersProperties = entities.reduce(function (pn, u) { return __spreadArrays(pn, u.RelatedProperties.map(function (s) { return s.PropertyIndex; })); }, []);
    return headersProperties.filter(function (n, i) { return headersProperties.indexOf(n) === i; }).map(function (s) { return ({ index: s, name: header(s) }); });
}
function TableFenix(props) {
    var entities = !props.elements ? [] : props.elements.entities;
    var propHeader = GetPropHeaders(entities, props.headerProperty);
    var entityHeader = GetEntityHeaders(entities, props.headerRelated);
    return (createElement(Table, { compact: true, celled: true, selectable: true, color: 'violet' },
        createElement(Table.Header, null,
            createElement(Table.Row, null,
                propHeader.map(function (h) { return (createElement(Table.HeaderCell, { key: "p" + h.index, textAlign: 'center' }, h.name)); }),
                entityHeader.map(function (h) { return (createElement(Table.HeaderCell, { textAlign: 'center', key: "e" + h.index }, h.name)); }))),
        createElement(Table.Body, null, entities.map(function (entity) {
            return createElement(Table.Row, { key: entity.Id },
                propHeader.map(function (h) { return (createElement(Table.Cell, { textAlign: 'center', key: "p" + h.index + "_" + entity.Id },
                    " ",
                    entity.RelatedProperties.filter(function (e) { return e.PropertyIndex === h.index; }).length > 0 ? entity.RelatedProperties.filter(function (e) { return e.PropertyIndex === h.index; })[0].Value : "")); }),
                entityHeader.map(function (h) { return (createElement(Table.Cell, { textAlign: 'center', key: "e" + h.index + "_" + entity.Id },
                    " ",
                    entity.RelatedIds.filter(function (e) { return e.EntityIndex === h.index; }).length > 0 ? entity.RelatedIds.filter(function (e) { return e.EntityIndex === h.index; })[0].name : "")); }));
        }))));
}

export { TableFenix };
