﻿import { PropertyRoute, PropertyRouteType, getLambdaMembers, IBinding, createBinding, subModelState } from './Reflection'
import { ModelState } from './Signum.Entities'

export enum FormGroupStyle {
    /// Unaffected by FormGroupSize
    None,
    
    /// Requires form-vertical container
    Basic,

    /// Requires form-vertical container
    BasicDown,

    /// Requires form-vertical / form-inline container
    SrOnly,

    /// Requires form-horizontal (default),  affected by LabelColumns / ValueColumns
    LabelColumns,
}

export enum FormGroupSize {
    Normal,
    Small,
    ExtraSmall,
}

export class StyleContext {
    private styleOptions: StyleOptions;
    parent: StyleContext;

    constructor(parent: StyleContext, styleOptions: StyleOptions) {
        this.parent = parent || StyleContext.default;
        this.styleOptions = styleOptions || {};

        if (this.styleOptions.labelColumns && !this.styleOptions.valueColumns)
            this.styleOptions.valueColumns = StyleContext.bsColumnsInvert(this.styleOptions.labelColumns);
    }

    static default: StyleContext = new StyleContext(null,
    {
        formGroupStyle : FormGroupStyle.LabelColumns,
        formGroupSize : FormGroupSize.Small,
        labelColumns: { sm: 2 },
        readOnly : false,
        placeholderLabels : false,
        formControlStaticAsFormControlReadonly : false,
    });

    get formGroupStyle(): FormGroupStyle {
        return this.styleOptions.formGroupStyle != null ? this.styleOptions.formGroupStyle : this.parent.formGroupStyle;
    }

    get formGroupSize(): FormGroupSize {
        return this.styleOptions.formGroupSize != null ? this.styleOptions.formGroupSize : this.parent.formGroupSize;
    }

    get formGroupSizeCss(): string {
        return this.formGroupSize == FormGroupSize.Normal ? "form-md" :
            this.formGroupSize == FormGroupSize.Small ? "form-sm" : "form-xs";
    }

    get placeholderLabels(): boolean {
        return this.styleOptions.placeholderLabels != null ? this.styleOptions.placeholderLabels : this.parent.placeholderLabels;
    }

    get formControlStaticAsFormControlReadonly(): boolean {
        return this.styleOptions.formControlStaticAsFormControlReadonly != null ? this.styleOptions.formControlStaticAsFormControlReadonly : this.parent.formControlStaticAsFormControlReadonly;
    }
    
    get labelColumns(): BsColumns {
        return this.styleOptions.labelColumns != null ? this.styleOptions.labelColumns : this.parent.labelColumns;
    }

    get labelColumnsCss(): string {
        return StyleContext.bsColumnsCss(this.labelColumns);
    }

    get valueColumns(): BsColumns {
        return this.styleOptions.valueColumns != null ? this.styleOptions.valueColumns : this.parent.valueColumns;
    }

    get valueColumnsCss(): string {
        return StyleContext.bsColumnsCss(this.valueColumns);
    }

    get readOnly(): boolean {
        return this.styleOptions.readOnly != null ? this.styleOptions.readOnly :
            this.parent ? this.parent.readOnly : false;
    }

    set readOnly(value: boolean) {
        this.styleOptions.readOnly = value;
    }


    static bsColumnsCss(bsColumns: BsColumns) {
        return [
            (bsColumns.xs ? "col-xs-" + bsColumns.xs : ""),
            (bsColumns.sm ? "col-sm-" + bsColumns.sm : ""),
            (bsColumns.md ? "col-md-" + bsColumns.md : ""),
            (bsColumns.lg ? "col-lg-" + bsColumns.lg : ""),
        ].filter(a=> a != "").join(" ");
    }

    static bsColumnsInvert(bs: BsColumns): BsColumns {
        return {
            xs: bs.xs ? (12 - bs.xs) : undefined,
            sm: bs.sm ? (12 - bs.sm) : undefined,
            md: bs.md ? (12 - bs.md) : undefined,
            lg: bs.lg ? (12 - bs.lg) : undefined,
        };
    }
}


export interface StyleOptions {

    formGroupStyle?: FormGroupStyle;
    formGroupSize?: FormGroupSize;
    placeholderLabels?: boolean;
    formControlStaticAsFormControlReadonly?: boolean;
    labelColumns?: BsColumns;
    valueColumns?: BsColumns;
    readOnly?: boolean;
}



export interface BsColumns {
    xs?: number;
    sm: number;
    md?: number;
    lg?: number;
}



export class TypeContext<T> extends StyleContext {

    propertyRoute: PropertyRoute;
    binding: IBinding<T>;
    modelState: ModelState;

    get value() {
        return this.binding.getValue();
    }

    set value(val: T) {
        this.binding.setValue(val);
    }

    constructor(parent: StyleContext, styleOptions: StyleOptions, propertyRoute: PropertyRoute, binding: IBinding<T>, modelState: ModelState) {
        super(parent, styleOptions);
        this.propertyRoute = propertyRoute;
        this.binding = binding;
        this.modelState = modelState;
    }

    subCtx<R>(property: (val: T) => R, styleOptions?: StyleOptions): TypeContext<R>
    subCtx(styleOptions?: StyleOptions): TypeContext<T>     
    subCtx(propertyOrStyleOptions: ((val: T) => any) | StyleOptions, styleOptions?: StyleOptions): TypeContext<any>
    {
        if (typeof propertyOrStyleOptions != "function")
            return new TypeContext<T>(this, propertyOrStyleOptions, this.propertyRoute, this.binding, this.modelState);
        
        const property = propertyOrStyleOptions as ((val: T) => any);

        const lambdaMembers = getLambdaMembers(property);

        const subRoute = lambdaMembers.reduce<PropertyRoute>((pr, m) => pr.addMember(m), this.propertyRoute);

        const subMS = lambdaMembers.reduce<ModelState>((ms, m) => subModelState(ms, m), this.modelState);

        const binding = createBinding(this.value, property);

        const result = new TypeContext<any>(this, styleOptions, subRoute, binding, subMS);

        return result;
    }

    niceName(property: (val: T) => any) {
        return this.propertyRoute.add(property).member.niceName;
    }

    hasError(): boolean {
        return this.modelState && (this.modelState[""] != null); 
    }

    hasErrorClass(): string {
        return this.hasError() ? "has-error" : null;
    }
}



