﻿/* eslint react/no-find-dom-node: 0 */
// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md

import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import { Manager } from 'react-popper';
import { BsSize, KeyCodes } from './Basic';
import { classes } from '../Globals';

interface DropdownProps {
    disabled?: boolean;
    dropup?: boolean,
    group?: boolean;
    isOpen: boolean;
    nav: boolean;
    addonType?: false | "prepend" | "append";
    size?: BsSize;
    tag?: string;
    toggle: () => void;
    className?: string;
    inNavbar?: boolean;
};

export class Dropdown extends React.Component<DropdownProps> {

    static defaultProps = {
        isOpen: false,
        dropup: false,
        nav: false,
        addonType: false,
        inNavbar: false,
    };
    
    constructor(props: DropdownProps) {
        super(props);

    }

    static childContextTypes = {
        toggle: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        dropup: PropTypes.bool.isRequired,
        inNavbar: PropTypes.bool.isRequired,
    };

    getChildContext() {
        return {
            toggle: this.props.toggle,
            isOpen: this.props.isOpen,
            dropup: this.props.dropup,
            inNavbar: this.props.inNavbar,
        };
    }

    componentDidMount() {
        this.handleProps();
    }

    componentDidUpdate(prevProps: DropdownProps) {
        if (this.props.isOpen !== prevProps.isOpen) {
            this.handleProps();
        }
    }

    componentWillUnmount() {
        this.removeEvents();
    }

    getContainer() {
        return ReactDOM.findDOMNode(this);
    }

    addEvents = () => {
        document.addEventListener("click", this.handleDocumentClick);
        document.addEventListener("touchstart", this.handleDocumentClick);
        document.addEventListener("keyup", this.handleDocumentKeyUp);
    }

    removeEvents() {

        document.removeEventListener("click", this.handleDocumentClick);
        document.removeEventListener("touchstart", this.handleDocumentClick);
        document.removeEventListener("keyup", this.handleDocumentKeyUp);
    }

    handleDocumentClick = (e: MouseEvent | TouchEvent) => {

        if (e.which == 3)
            return;

        const container = this.getContainer();

        if (container.contains(e.target as Node) && container !== e.target) {
            return;
        }

        this.toggle(e);
    }

    handleDocumentKeyUp = (e: KeyboardEvent) => {
        if (e.which !== KeyCodes.tab)
            return;

        const container = this.getContainer();

        if (container.contains(e.target as Node) && container !== e.target) {
            return;
        }

        this.toggle(e);
    }



    handleKeyDown = (e: React.KeyboardEvent<any>) => {
        if ([KeyCodes.esc, KeyCodes.up, KeyCodes.down, KeyCodes.space].indexOf(e.which) === -1 ||
            (/button/i.test((e.target as HTMLElement).tagName) && e.which === KeyCodes.space) ||
            /input|textarea/i.test((e.target as HTMLElement).tagName)) {
            return;
        }

        e.preventDefault();
        if (this.props.disabled) return;

        const container = this.getContainer();

        if (e.which === KeyCodes.space && this.props.isOpen && container !== e.target) {
            (e.target as HTMLElement).click();
        }

        if (e.which === KeyCodes.esc || !this.props.isOpen) {
            this.toggle(e);
            (container.querySelector('[aria-expanded]') as HTMLElement).focus();
            return;
        }


        const items = container.querySelectorAll(`.dropdown-menu .dropdown-item:not(.disabled)`);

        if (!items.length) return;

        let index = -1;
        for (let i = 0; i < items.length; i += 1) {
            if (items[i] === e.target) {
                index = i;
                break;
            }
        }

        if (e.which === KeyCodes.up && index > 0) {
            index -= 1;
        }

        if (e.which === KeyCodes.down && index < items.length - 1) {
            index += 1;
        }

        if (index < 0) {
            index = 0;
        }

        (items[index] as HTMLElement).focus();
    }

    handleProps() {
        if (this.props.isOpen) {
            this.addEvents();
        } else {
            this.removeEvents();
        }
    }

    toggle = (e: KeyboardEvent | MouseEvent | TouchEvent | React.KeyboardEvent<any>) => {
        if (this.props.disabled) {
            return e && e.preventDefault();
        }

        return this.props.toggle();
    }

    render() {
        const {
            className,
            dropup,
            isOpen,
            group,
            size,
            nav,
            addonType,
            toggle,
            disabled,
            inNavbar,
            ...attrs
        } = this.props;

        attrs.tag = attrs.tag || (nav ? 'li' : 'div');

        const clss = classes(
            className,
            addonType && `input-group-${addonType}`,
            group && 'btn-group',
            size && `btn-group-${size}`,
            !group && !addonType && 'dropdown',
            isOpen && 'show',
            dropup && 'dropup',
            nav && 'nav-item'
        );
        return <Manager {...attrs} className={clss} onKeyDown={this.handleKeyDown} />;
    }
}