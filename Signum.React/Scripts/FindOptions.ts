﻿import { TypeReference, PropertyRoute } from './Reflection';
import { Dic } from './Globals';
import { Lite, IEntity, DynamicQuery } from './Signum.Entities';

import PaginationMode = DynamicQuery.PaginationMode;
import OrderType = DynamicQuery.OrderType;
import FilterOperation = DynamicQuery.FilterOperation;
import FilterType = DynamicQuery.FilterType;
import ColumnOptionsMode = DynamicQuery.ColumnOptionsMode;
import UniqueType = DynamicQuery.UniqueType;

export {PaginationMode, OrderType, FilterOperation, FilterType, ColumnOptionsMode, UniqueType};

export interface CountOptions {
    queryName: any;
    filterOptions?: FilterOption[];
}




export interface FindOptions {
    queryName: any;
    simpleColumnName?: string;
    simpleValue?: any;

    filterOptions?: FilterOption[];
    orderOptions?: OrderOption[];
    columnOptionsMode?: ColumnOptionsMode;
    columnOptions?: ColumnOption[];
    pagination?: Pagination

    searchOnLoad?: boolean;
    showHeader?: boolean;
    showFilters?: boolean;
    showFilterButton?: boolean;
    showFooter?: boolean;
    allowChangeColumns?: boolean;
    create?: boolean;
    navigate?: boolean;
    contextMenu?: boolean;
}

export function expandSimpleColumnName(findOptions: FindOptions) {

    if (!findOptions.simpleColumnName)
        return findOptions; 

    var fo = Dic.extend({}, findOptions) as FindOptions;

    fo.filterOptions = [
        { columnName: fo.simpleColumnName, operation: FilterOperation.EqualTo, value: fo.simpleValue, frozen: true },
        ...(fo.filterOptions || [])
    ];
    
    if (!fo.simpleColumnName.contains(".") && fo.columnOptionsMode == null || fo.columnOptionsMode == ColumnOptionsMode.Remove) {
        fo.columnOptions = [
            { columnName: fo.simpleColumnName },
            ...(fo.columnOptions || [])
        ];
    }

    if (fo.searchOnLoad == null)
        fo.searchOnLoad = true;

    fo.simpleColumnName = null;
    fo.simpleValue = null;

    return fo;
}

export interface FilterOption {
    columnName: string;
    token?: QueryToken;
    frozen?: boolean;
    operation: FilterOperation;
    value: any;
}




export interface OrderOption {
    columnName: string;
    token?: QueryToken;
    orderType: OrderType;
}


export interface ColumnOption {
    columnName: string;
    token?: QueryToken;
    displayName?: string;
}


export const DefaultPagination: Pagination = {
    mode: PaginationMode.Paginate,
    elementsPerPage: 20,
    currentPage: 1
};


export enum FindMode {
    Find = <any>"Find",
    Explore = <any>"Explore"
}

export enum SubTokensOptions {
    CanAggregate = 1,
    CanAnyAll = 2,
    CanElement = 4,
}

export interface QueryToken {
    toString: string;
    niceName: string;
    key: string;
    format?: string;
    unit?: string;
    type: TypeReference;
    typeColor: string;
    niceTypeName: string;
    filterType: FilterType;
    fullKey: string;
    queryTokenType?: QueryTokenType;
    parent?: QueryToken;
}

export enum QueryTokenType {
    Aggregate = "Aggregate" as any,
    Element = "Element" as any,
    AnyOrAll = "AnyOrAll" as any,
}

export function getTokenParents(token: QueryToken): QueryToken[] {
    const result = [];
    while (token != null) {
        result.insertAt(0, token);
        token = token.parent;
    }
    return result;
}

export function toQueryToken(cd: ColumnDescription): QueryToken {
    return {
        toString: cd.displayName,
        niceName: cd.displayName,
        key: cd.name,
        fullKey: cd.name,
        unit: cd.unit,
        format: cd.format,
        type: cd.type,
        typeColor: cd.typeColor,
        niceTypeName: cd.niceTypeName,
        filterType: cd.filterType,
    };
}

export interface QueryRequest {
    queryKey: string;
    filters: { token: string; operation: FilterOperation; value: any }[];
    orders: { token: string; orderType: OrderType }[];
    columns: { token: string; displayName: string }[];
    pagination: Pagination;
}

export interface ResultColumn {
    displayName: string;
    token: QueryToken;
}

export interface ResultTable {
    queryKey: string;
    entityColumn: string;
    columns: string[];
    rows: ResultRow[];
    pagination: Pagination
    totalElements: number;
}


export interface ResultRow {
    entity: Lite<IEntity>;
    columns: any[];
}

export interface Pagination {
    mode: PaginationMode;
    elementsPerPage?: number;
    currentPage?: number;
}

export module PaginateMath {
    export function startElementIndex(p: Pagination) {
        return (p.elementsPerPage * (p.currentPage - 1)) + 1;
    }

    export function endElementIndex(p: Pagination, rows: number) {
        return startElementIndex(p) + rows - 1;
    }

    export function totalPages(p: Pagination, totalElements: number) {
        return Math.ceil(totalElements / p.elementsPerPage); //Round up
    }

    export function maxElementIndex(p: Pagination) {
        return (p.elementsPerPage * (p.currentPage + 1)) - 1;
    }
}





export interface QueryDescription {
    queryKey: string;
    columns: { [name: string]: ColumnDescription };
}

export interface ColumnDescription {
    name: string;
    type: TypeReference;
    filterType: FilterType;
    typeColor: string;
    niceTypeName: string;
    unit?: string;
    format?: string;
    displayName: string;
}

export function isList(fo: FilterOperation) {
    return fo == FilterOperation.IsIn || fo == FilterOperation.IsNotIn;
}


export const filterOperations: { [a: string]: FilterOperation[] } = {};
filterOperations[FilterType.String as any] = [
    FilterOperation.Contains,
    FilterOperation.EqualTo,
    FilterOperation.StartsWith,
    FilterOperation.EndsWith,
    FilterOperation.Like,
    FilterOperation.NotContains,
    FilterOperation.DistinctTo,
    FilterOperation.NotStartsWith,
    FilterOperation.NotEndsWith,
    FilterOperation.NotLike,
    FilterOperation.IsIn,
    FilterOperation.IsNotIn
];

filterOperations[FilterType.DateTime as any] = [
    FilterOperation.EqualTo,
    FilterOperation.DistinctTo,
    FilterOperation.GreaterThan,
    FilterOperation.GreaterThanOrEqual,
    FilterOperation.LessThan,
    FilterOperation.LessThanOrEqual,
    FilterOperation.IsIn,
    FilterOperation.IsNotIn
];

filterOperations[FilterType.Integer as any] = [
    FilterOperation.EqualTo,
    FilterOperation.DistinctTo,
    FilterOperation.GreaterThan,
    FilterOperation.GreaterThanOrEqual,
    FilterOperation.LessThan,
    FilterOperation.LessThanOrEqual,
    FilterOperation.IsIn,
    FilterOperation.IsNotIn
];

filterOperations[FilterType.Decimal as any] = [
    FilterOperation.EqualTo,
    FilterOperation.DistinctTo,
    FilterOperation.GreaterThan,
    FilterOperation.GreaterThanOrEqual,
    FilterOperation.LessThan,
    FilterOperation.LessThanOrEqual,
    FilterOperation.IsIn,
    FilterOperation.IsNotIn
];

filterOperations[FilterType.Enum as any] = [
    FilterOperation.EqualTo,
    FilterOperation.DistinctTo,
    FilterOperation.IsIn,
    FilterOperation.IsNotIn
];

filterOperations[FilterType.Guid as any] = [
    FilterOperation.EqualTo,
    FilterOperation.DistinctTo,
    FilterOperation.IsIn,
    FilterOperation.IsNotIn
];

filterOperations[FilterType.Lite as any] = [
    FilterOperation.EqualTo,
    FilterOperation.DistinctTo,
    FilterOperation.IsIn,
    FilterOperation.IsNotIn
];

filterOperations[FilterType.Embedded as any] = [
    FilterOperation.EqualTo,
    FilterOperation.DistinctTo,
];

filterOperations[FilterType.Boolean as any] = [
    FilterOperation.EqualTo,
    FilterOperation.DistinctTo,
];