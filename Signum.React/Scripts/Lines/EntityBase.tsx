﻿import * as React from 'react'
import { Link } from 'react-router'
import { Dic, classes } from '../Globals'
import * as Navigator from '../Navigator'
import * as Constructor from '../Constructor'
import * as Finder from '../Finder'
import { FindOptions } from '../FindOptions'
import { TypeContext, StyleContext, StyleOptions, FormGroupStyle } from '../TypeContext'
import { PropertyRoute, PropertyRouteType, MemberInfo, getTypeInfo, getTypeInfos, TypeInfo, IsByAll } from '../Reflection'
import { ModifiableEntity, Lite, Entity, EntityControlMessage, JavascriptMessage, toLiteFat, is, liteKey } from '../Signum.Entities'
import { LineBase, LineBaseProps, FormGroup, FormControlStatic, runTasks } from '../Lines/LineBase'
import { EntityComponentProps, EntityFrame } from '../Lines'
import Typeahead from '../Lines/Typeahead'
import SelectorPopup from '../SelectorPopup'


export interface EntityBaseProps extends LineBaseProps {
    view?: boolean;
    viewOnCreate?: boolean;
    navigate?: boolean;
    create?: boolean;
    find?: boolean;
    remove?: boolean;

    onView?: (entity: ModifiableEntity | Lite<Entity>, pr: PropertyRoute) => Promise<ModifiableEntity>;
    onCreate?: () => Promise<ModifiableEntity | Lite<Entity>>;
    onFind?: () => Promise<ModifiableEntity | Lite<Entity>>;
    onRemove?: (entity: ModifiableEntity | Lite<Entity>) => Promise<boolean>;

    getComponent?: (ctx: TypeContext<ModifiableEntity>, frame: EntityFrame<ModifiableEntity>) => React.ReactElement<any>;
}


export interface EntityBaseState extends LineBaseProps {
    view?: boolean;
    viewOnCreate?: boolean;
    navigate?: boolean;
    create?: boolean;
    find?: boolean;
    remove?: boolean;
}


export abstract class EntityBase<T extends EntityBaseProps, S extends EntityBaseState> extends LineBase<T, S>
{
    calculateDefaultState(state: S) {

        const type = state.type;

        state.create = type.isEmbedded ? Navigator.isCreable(type.name, !!this.props.getComponent, false) :
            type.name == IsByAll ? false :
                getTypeInfos(type).some(ti => Navigator.isCreable(ti, !!this.props.getComponent, false));

        state.view = type.isEmbedded ? Navigator.isViewable(type.name, !!this.props.getComponent) :
            type.name == IsByAll ? true :
                getTypeInfos(type).some(ti => Navigator.isViewable(ti, !!this.props.getComponent));

        state.navigate = type.isEmbedded ? Navigator.isNavigable(type.name, !!this.props.getComponent) :
            type.name == IsByAll ? true :
                getTypeInfos(type).some(ti => Navigator.isNavigable(ti, !!this.props.getComponent));

        state.find = type.isEmbedded ? false :
            type.name == IsByAll ? false :
                getTypeInfos(type).some(ti => Navigator.isFindable(ti));

        state.viewOnCreate = true;
        state.remove = true;
    }

    convert(entityOrLite: ModifiableEntity | Lite<Entity>): Promise<ModifiableEntity | Lite<Entity>> {

        const tr = this.state.type;

        const isLite = (entityOrLite as Lite<Entity>).EntityType != null;
        const entityType = (entityOrLite as Lite<Entity>).EntityType || (entityOrLite as ModifiableEntity).Type;


        if (tr.isEmbedded) {
            if (entityType != tr.name || isLite)
                throw new Error(`Impossible to convert '${entityType}' to '${tr.name}'`);

            return Promise.resolve(entityOrLite as ModifiableEntity);
        } else {
            if (tr.name != IsByAll && !tr.name.split(',').map(a => a.trim()).contains(entityType))
                throw new Error(`Impossible to convert '${entityType}' to '${tr.name}'`);

            if (!!isLite == !!tr.isLite)
                return Promise.resolve(entityOrLite);

            if (isLite) {
                const lite = entityOrLite as Lite<Entity>;
                return Navigator.API.fetchAndRemember(lite);
            }

            const entity = entityOrLite as Entity;

            return Promise.resolve(toLiteFat(entity));
        }
    }


    defaultView(value: ModifiableEntity | Lite<Entity>, propertyRoute: PropertyRoute): Promise<ModifiableEntity> {

        return Navigator.view({ propertyRoute: propertyRoute, entity: value, component: this.props.getComponent } as Navigator.ViewOptions);
    }


    handleViewClick = (event: React.MouseEvent) => {

        event.preventDefault();

        const ctx = this.state.ctx;
        const entity = ctx.value;

        var openWindow = (event.button == 2 || event.ctrlKey) && !this.state.type.isEmbedded;
        if (openWindow) {
            event.preventDefault();
            var route = Navigator.navigateRoute(entity as Lite<Entity> /*or Entity*/);
            window.open(route);
        }
        else {
            const onView = this.props.onView ?
                this.props.onView(entity, ctx.propertyRoute) :
                this.defaultView(entity, ctx.propertyRoute);

            onView.then(e => {
                if (e == null)
                    return;

                this.convert(e).then(m => this.setValue(m)).done();
            }).done();
        }
    }

    renderViewButton(btn: boolean) {
        if (!this.state.view)
            return null;

        return (
            <a className={classes("sf-line-button", "sf-view", btn ? "btn btn-default" : null) }
                onClick={this.handleViewClick}
                title={EntityControlMessage.View.niceToString() }>
                <span className="glyphicon glyphicon-arrow-right"/>
            </a>
        );
    }

    chooseType(predicate: (ti: TypeInfo) => boolean): Promise<string> {
        const t = this.state.type;

        if (t.isEmbedded)
            return Promise.resolve(t.name);

        const tis = getTypeInfos(t).filter(ti => predicate(ti));

        return SelectorPopup.chooseType(tis)
            .then(ti => ti ? ti.name : null);
    }

    defaultCreate(): Promise<ModifiableEntity | Lite<Entity>> {

        return this.chooseType(t => Navigator.isCreable(t, !!this.props.getComponent, false))
            .then(typeName => typeName ? Constructor.construct(typeName) : null)
            .then(e => e ? e.entity : null);
    }

    handleCreateClick = (event: React.SyntheticEvent) => {

        event.preventDefault();

        const onCreate = this.props.onCreate ?
            this.props.onCreate() : this.defaultCreate();

        onCreate.then(e => {

            if (e == null)
                return null;

            if (!this.state.viewOnCreate)
                return Promise.resolve(e);

            return this.props.onView ?
                this.props.onView(e, this.state.ctx.propertyRoute) :
                this.defaultView(e, this.state.ctx.propertyRoute);

        }).then(e => {

            if (!e)
                return;

            this.convert(e).then(m => this.setValue(m)).done();
        }).done();
    };

    renderCreateButton(btn: boolean) {
        if (!this.state.create || this.state.ctx.readOnly)
            return null;

        return (
            <a className={classes("sf-line-button", "sf-create", btn ? "btn btn-default" : null) }
                onClick={this.handleCreateClick}
                title={EntityControlMessage.Create.niceToString() }>
                <span className="glyphicon glyphicon-plus"/>
            </a>
        );
    }


    defaultFind(): Promise<ModifiableEntity | Lite<Entity>> {
        return this.chooseType(Finder.isFindable)
            .then(qn => qn == null ? null : Finder.find({ queryName: qn } as FindOptions));
    }
    handleFindClick = (event: React.SyntheticEvent) => {

        event.preventDefault();

        const result = this.props.onFind ? this.props.onFind() : this.defaultFind();

        result.then(entity => {
            if (!entity)
                return;

            this.convert(entity).then(e => this.setValue(e)).done();
        }).done();
    };
    renderFindButton(btn: boolean) {
        if (!this.state.find || this.state.ctx.readOnly)
            return null;

        return (
            <a className={classes("sf-line-button", "sf-find", btn ? "btn btn-default" : null) }
                onClick={this.handleFindClick}
                title={EntityControlMessage.Find.niceToString() }>
                <span className="glyphicon glyphicon-search"/>
            </a>
        );
    }

    handleRemoveClick = (event: React.SyntheticEvent) => {

        event.preventDefault();

        (this.props.onRemove ? this.props.onRemove(this.props.ctx.value) : Promise.resolve(true))
            .then(result => {
                if (result == false)
                    return;

                this.setValue(null);
            }).done();
    };
    renderRemoveButton(btn: boolean) {
        if (!this.state.remove || this.state.ctx.readOnly)
            return null;

        return (
            <a className={classes("sf-line-button", "sf-remove", btn ? "btn btn-default" : null) }
                onClick={this.handleRemoveClick}
                title={EntityControlMessage.Remove.niceToString() }>
                <span className="glyphicon glyphicon-remove"/>
            </a>
        );
    }
}



