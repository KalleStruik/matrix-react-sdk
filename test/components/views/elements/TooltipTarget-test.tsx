/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from "react";
import {
    renderIntoDocument,
    Simulate,
} from 'react-dom/test-utils';
import { act } from "react-dom/test-utils";

import { Alignment } from '../../../../src/components/views/elements/Tooltip';
import TooltipTarget from "../../../../src/components/views/elements/TooltipTarget";

describe('<TooltipTarget />', () => {
    const defaultProps = {
        "tooltipTargetClassName": 'test tooltipTargetClassName',
        "className": 'test className',
        "tooltipClassName": 'test tooltipClassName',
        "label": 'test label',
        "yOffset": 1,
        "alignment": Alignment.Left,
        "id": 'test id',
        'data-test-id': 'test',
    };

    const getComponent = (props = {}) => {
        const wrapper = renderIntoDocument<HTMLSpanElement>(
        // wrap in element so renderIntoDocument can render functional component
            <span>
                <TooltipTarget {...defaultProps} {...props}>
                    <span>child</span>
                </TooltipTarget>
            </span>,
        ) as HTMLSpanElement;
        return wrapper.querySelector('[data-test-id=test]');
    };

    const getVisibleTooltip = () => document.querySelector('.mx_Tooltip.mx_Tooltip_visible');

    afterEach(() => {
        // clean up visible tooltips
        const tooltipWrapper = document.querySelector('.mx_Tooltip_wrapper');
        if (tooltipWrapper) {
            document.body.removeChild(tooltipWrapper);
        }
    });

    it('renders container', () => {
        const component = getComponent();
        expect(component).toMatchSnapshot();
        expect(getVisibleTooltip()).toBeFalsy();
    });

    it('displays tooltip on mouseover', () => {
        const wrapper = getComponent();
        act(() => {
            Simulate.mouseOver(wrapper);
        });
        expect(getVisibleTooltip()).toMatchSnapshot();
    });

    it('hides tooltip on mouseleave', () => {
        const wrapper = getComponent();
        act(() => {
            Simulate.mouseOver(wrapper);
        });
        expect(getVisibleTooltip()).toBeTruthy();
        act(() => {
            Simulate.mouseLeave(wrapper);
        });
        expect(getVisibleTooltip()).toBeFalsy();
    });

    it('displays tooltip on focus', () => {
        const wrapper = getComponent();
        act(() => {
            Simulate.focus(wrapper);
        });
        expect(getVisibleTooltip()).toBeTruthy();
    });

    it('hides tooltip on blur', async () => {
        const wrapper = getComponent();
        act(() => {
            Simulate.focus(wrapper);
        });
        expect(getVisibleTooltip()).toBeTruthy();
        await act(async () => {
            await Simulate.blur(wrapper);
        });
        expect(getVisibleTooltip()).toBeFalsy();
    });
});
