/* eslint-disable */
import { createElement, Component, createRef, useState, useEffect } from 'react';
import { Table, Dropdown, Input, Search } from 'semantic-ui-react';
import { escapeRegExp, filter, reduce, isEmpty } from 'lodash';

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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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
//# sourceMappingURL=TableFenix.js.map

var SelectFilter = /** @class */ (function (_super) {
    __extends(SelectFilter, _super);
    function SelectFilter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SelectTypeSearch = function (event, data) {
            console.log(event);
            _this.props.SearchTypeSelect(_this.props.searchTypes.filter(function (s) { return s.name === data.value; })[0]);
        };
        return _this;
    }
    SelectFilter.prototype.render = function () {
        var typeSearch = this.props.searchTypes.map(function (st) { return ({
            key: st.name,
            text: st.name,
            value: st.name
        }); });
        return (createElement(Dropdown, { button: true, basic: true, floating: true, options: typeSearch, defaultValue: this.props.defaultValue.name, onChange: this.SelectTypeSearch }));
    };
    return SelectFilter;
}(Component));
//# sourceMappingURL=SelectFilter.js.map

var SearchFilter = /** @class */ (function (_super) {
    __extends(SearchFilter, _super);
    function SearchFilter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputRef = createRef();
        return _this;
    }
    SearchFilter.prototype.render = function () {
        console.log(this.props.searchTypes);
        var jsx = (createElement(SelectFilter, { SearchTypeSelect: this.props.SearchTypeSelect, searchTypes: this.props.searchTypes, defaultValue: this.props.defaultSearchType }));
        return (createElement("div", { ref: this.inputRef },
            createElement(Input, { action: jsx, icon: "search", iconPosition: "left", placeholder: "Presione enter para la busqueda", size: "large", fluid: true, loading: this.props.loading })));
    };
    SearchFilter.prototype.componentDidMount = function () {
        var _this = this;
        var refDiv = this.inputRef.current;
        if (refDiv) {
            var inputs = refDiv.getElementsByTagName("input");
            if (inputs) {
                var input_1 = inputs.item(0);
                if (input_1) {
                    input_1.onkeydown = function (e) {
                        if (e.key === "Enter") {
                            _this.props.onEnter(input_1.value);
                        }
                    };
                }
            }
        }
    };
    return SearchFilter;
}(Component));
//# sourceMappingURL=SearchFilter.js.map

var SearchBase = /** @class */ (function (_super) {
    __extends(SearchBase, _super);
    function SearchBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.searchRef = createRef();
        _this.handleResultSelect = function (e, data) {
            if (e == null)
                console.log(e);
            _this.setState(__assign(__assign({}, _this.state), { value: data.result.title }));
            // tslint:disable-next-line:no-unused-expression
            _this.props.elementSelected && _this.props.elementSelected(data.result);
        };
        _this.handleSearchChange = function (e, data) {
            if (e == null)
                console.log(e);
            var value = data.value;
            _this.setState({ load: true, value: value });
            var re = new RegExp(escapeRegExp(_this.state.value), "i");
            var isMatch = function (result) { return re.test(result.title); };
            var results = filter(_this.props.source, isMatch);
            _this.setState({
                load: false,
                results: results
            });
        };
        _this.handleSearchChangeCategory = function (e, data) {
            if (e == null)
                console.log(e);
            var value = data.value;
            _this.setState({ load: true, value: value });
            var re = new RegExp(escapeRegExp(value), "i");
            var isMatch = function (result) {
                result.title;
                return re.test(result.title);
            };
            var filteredResults = reduce(_this.props.sourceCategory, 
            // tslint:disable-next-line:no-shadowed-variable
            function (memo, data, index) {
                var resultCategory = re.test(data.name);
                var result = filter(data.results, isMatch);
                var ElemResult = {
                    name: data.name,
                    results: resultCategory ? data.results : result
                };
                if (index === 0 && ElemResult.results.length > 0) {
                    memo = ElemResult;
                    return memo;
                }
                if (ElemResult.results.length === 0) {
                    if (isEmpty(memo)) {
                        return [];
                    }
                    var memos = __spreadArrays(memo);
                    if (index === 0) {
                        return [];
                    }
                    return memos;
                }
                else {
                    var memos = __spreadArrays(memo, [ElemResult]);
                    return memos;
                }
            }, {});
            _this.setState({
                load: false,
                resultCategory: filteredResults.length == undefined ? [filteredResults] : filteredResults
            });
        };
        _this.resetComponent = function () {
            _this.setState({ load: false, results: [], resultCategory: [], value: "" });
        };
        return _this;
    }
    SearchBase.prototype.render = function () {
        var jsx = (createElement(SelectFilter, { SearchTypeSelect: this.props.SearchTypeSelect, searchTypes: this.props.searchTypes, defaultValue: this.props.defaultSearchType }));
        var _a = this.state, value = _a.value, results = _a.results, resultCategory = _a.resultCategory, load = _a.load;
        var placeHolder = this.props.placeholder;
        var map = {};
        if (resultCategory && resultCategory.length > 0) {
            resultCategory.map(function (r) {
                map[r.name] = r;
            });
        }
        var resultLocal = this.props.isCategory ? map : results;
        return (createElement("div", { ref: this.searchRef },
            createElement(Search, { category: this.props.isCategory, loading: load || this.props.loading, size: "large", onSearchChange: this.props.isCategory
                    ? this.handleSearchChangeCategory
                    : this.handleSearchChange, onResultSelect: this.handleResultSelect, results: resultLocal, value: value, fluid: true, onFocus: this.resetComponent, input: {
                    action: jsx,
                    className: "",
                    icon: "search",
                    iconPosition: "left",
                    placeholder: placeHolder,
                    fluid: true
                }, noResultsMessage: this.props.messageNotFound })));
    };
    SearchBase.prototype.componentDidMount = function () {
        var refDiv = this.searchRef.current;
        if (refDiv) {
            var inputs = refDiv.getElementsByTagName("input");
            if (inputs) {
                var input = inputs.item(0);
                if (input) {
                    input.classList.remove("prompt");
                }
            }
        }
    };
    SearchBase.prototype.componentWillMount = function () {
        this.resetComponent();
    };
    return SearchBase;
}(Component));
//# sourceMappingURL=SearchBase.js.map

function SearchFenix(props) {
    var searchTypes = props.searchTypes, searchTypeSelect = props.searchTypeSelect, loading = props.loading, elementSelected = props.elementSelected, source = props.source, sourceCategory = props.sourceCategory;
    var defaultSearchTypes = searchTypes.filter(function (s) { return s.default; });
    var _a = useState(defaultSearchTypes.length > 0 ? defaultSearchTypes[0] : searchTypes[0]), currentSearch = _a[0], setCurrentsearch = _a[1];
    var searchSelected = function (src) {
        setCurrentsearch(src);
        searchTypeSelect(src);
    };
    useEffect(function () {
        searchSelected(currentSearch);
    }, []);
    if (currentSearch.entityType == "search") {
        return createElement(SearchFilter, { SearchTypeSelect: searchSelected, loading: loading, onEnter: function (elem) { return elementSelected({ title: elem, description: "", id: elem }); }, defaultSearchType: currentSearch, searchTypes: searchTypes });
    }
    else if (currentSearch.entityType == "selected") {
        return createElement(SearchBase, { SearchTypeSelect: searchSelected, defaultSearchType: currentSearch, elementSelected: elementSelected, isCategory: false, loading: loading, messageNotFound: currentSearch.messageNotFound || "Elemento no encontrado", placeholder: currentSearch.placeHolder || "Seleccione un elemento", searchTypes: searchTypes, source: source });
    }
    else {
        console.log("sc", sourceCategory);
        return createElement(SearchBase, { SearchTypeSelect: searchSelected, defaultSearchType: currentSearch, elementSelected: elementSelected, isCategory: true, loading: loading, messageNotFound: currentSearch.messageNotFound || "Elemento no encontrado", placeholder: currentSearch.placeHolder || "Seleccione un elemento", searchTypes: searchTypes, sourceCategory: sourceCategory });
    }
}
//# sourceMappingURL=SearchFenix.js.map

export { SearchFenix, TableFenix };
